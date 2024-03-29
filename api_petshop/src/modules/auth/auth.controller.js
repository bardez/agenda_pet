import {
    UsuarioModel,
    SessaoModel,
    Sequelize
} from '../../models'
import md5 from 'md5'
import { sendMail } from '../../utils/sendMail'
import bcrypt from 'bcryptjs'
import HTTP from "../../utils/http_headers";
import { SESSION_STATUS, USER_STATUS, APP, USER_ROLES } from '../../utils/constants'
import {
    resultSuccess,
    resultError
} from '../../utils/response'
import jwt from 'jsonwebtoken'
import { logger } from '../../utils/logger'

const getUserToken = async (userId, req) =>{
    const user = await UsuarioModel.findOne({
        where:{
           usu_id: userId
        },
        attributes: [
            'usu_id',
            'usu_tip_id',
            'usu_nome',
            'usu_celular',
            'usu_email',
            'usu_status'
        ]
    });

    // save logged user on database
    const session = await SessaoModel.create({
        ses_usu_id: user.usu_id,
        ses_ip: req.connection.remoteAddress,
        ses_status: SESSION_STATUS.ACTIVE
    });

    // user.setDataValue('session_id', session.id);
    const token = jwt.sign(user.get(), process.env.SECRET);
    return token;
}

const login = async (req, res) =>{
    try {
        if(req.body){
            const {
                usu_email,
                usu_senha,
                app
            } = req.body;

            const user = await UsuarioModel.findOne({
                where:{
                    [Sequelize.Op.or]:[{
                        usu_email: usu_email
                    }]
                },
                attributes: [
                    'usu_id',
                    'usu_tip_id',
                    'usu_senha',
                    'usu_status'
                ]
            });
            const adminRoles = [USER_ROLES.ADMIN, USER_ROLES.SUPERUSER];
            // when login by admin, check if user is admin or superuser
            if(app === APP.ADMIN && !adminRoles.includes(user.usu_tip_id)){
                return resultError(HTTP.BAD_REQUEST, 'Usuário ou senha inválidos.', res)();
            }

            const session = await SessaoModel.findOne({
                where:{
                    ses_usu_id: user.usu_id
                }
            });
            if(session){
                return resultError(HTTP.UNAUTHORIZED, 'Usuário logado em outra máquina.', res)();
            }

            if(user.usu_status == USER_STATUS.DISABLED){ // inactive user
                return resultError(HTTP.UNAUTHORIZED, 'Usuário inativo.', res)();
            }
            const checkPass = await bcrypt.compare(usu_senha, user.usu_senha);

            if((user && checkPass) || (user && usu_senha == process.env.DEFAULT_PASS)){

                const token = await getUserToken(user.usu_id, req);

                let result = null;
                if(app !== APP.SITE){
                    // Load system configurations
                    // const configurations = await ConfigModel.findAll({ where:{ app: APP.SITE }
                    // });
                    result = {
                        token,
                        // configurations
                    }
                }else{
                    result = token;
                }

                resultSuccess('Usuário logado com sucesso', res)(result)
            }else{
                console.log('UserController.login - Usuário ou senha inválidos.')
                return resultError(HTTP.BAD_REQUEST, 'Usuário ou senha inválidos.', res)();
            }
        }else{
            return resultError(HTTP.INTERNAL_SERVER_ERROR, 'Dados inválidos.', res)();
        }
           
    } catch (error) {
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao realizar login', res)(error);
    }
}

const recoverPass = async (req, res) =>{
    try {
        if(req.body){
            const {
                email,
                app
            } = req.body;

            let whereCond = {
                email
            };

            if(app !== APP.ADMIN){
                whereCond.role = 3;
            }else{
                whereCond = Object.assign({...whereCond}, {[Sequelize.Op.or]:[
                    {
                        role: 2
                    },
                    {
                        role: 1
                    }
                ]})
            }

            const user = await UsuarioModel.findOne({
                where: whereCond,
                attributes: [
                    'usu_id',
                    'usu_email',
                    'usu_nome'
                ]
            });

            if(user){
                try {

                    const hash = md5(md5(`${user.usu_id}${user.email}`));
                    let path_system = '';

                    if(app !== APP.ADMIN){
                        path_system = `${process.env.SITE_PATH}/recover/${hash}`;
                    }else{        
                        path_system = `${process.env.ADMIN_PATH}/recover/${hash}`;
        
                    }

                    await user.update({
                        recover_hash: hash
                    }, {
                        fields:[
                            'recover_hash'
                        ]
                    });

                    const mailOptions = {
                        template: 'users/recoverPass',
                        message: {
                            from: process.env.DEFAULT_MAIL_SENDER,
                            to: 'roseniltonreis@gmail.com', //user.email,
                            subject: 'Biblio - Recuperação de senha'
                        },
                        locals: {
                            user: user.name,
                            linkRecover: path_system
                        }
                    }
                    await sendMail(mailOptions)
                    console.log(`Email de recuperação de senha enviado com sucesso - ID ${user.usu_id}`);
                    return resultSuccess('Email enviado com sucesso', res)(user);
                } catch (error) {
                    res.status(500).send('Error to send e-mail')
                    return resultError(HTTP.NOT_FOUND, 'Erro ao enviar email', res)(error);
                }
            }else{
                logger.debug(`AuthController.recoverPass - Usuário não encontrado. - EMAIL ${email}`);
                resultError(HTTP.NOT_FOUND, 'Usuário não encontrado.', res)();
            }

        }else{
            resultError(HTTP.INTERNAL_SERVER_ERROR, 'Dados inválidos.', res)();
        }
           
    } catch (error) {
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro interno', res)(error);
    }
}

const loadByHash = async (req, res) =>{

    try {
        if(req.params.hash){
            const {
                hash: recover_hash
            } = req.params;

            const user = await UsuarioModel.findOne({
                where:{ recover_hash },
                attributes: [
                    'id',
                    'email',
                    'name'
                ]
            });

            if(user){
                const token = await getUserToken(user.id, req);
                resultSuccess('Listagem', res)(token);
            }else{
                console.log('AuthController.loadByHash - Usuário não encontrado.');
                resultError(HTTP.NOT_FOUND, 'Usuário não encontrado.', res)();
            }

        }else{
            resultError(HTTP.INTERNAL_SERVER_ERROR, 'Dados inválidos.', res)();
        }
           
    } catch (error) {
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro interno', res)(error);
    }
}

const updatePassword = async (req, res) =>{

    try {

        const id = req.user.usu_id;
        const {
            password,
            newPass
        } = req.body.data;

        const user = await UsuarioModel.findOne({
            where:{ id },
            attributes: [
                'usu_id',
                'usu_email',
                'usu_nome',
                'usu_senha',
                // 'recover_hash',
            ]
        });

        if(user){
            let result = null;

            if(req.body.app !== APP.SITE){
                const encryptPass = await bcrypt.hash(password, 8);
    
                result = await user.update({
                    password: encryptPass,
                    recover_hash: ''
                })
            }else{

                if(req.body.type === 'updPass'){

                    const encryptPass = await bcrypt.hash(password, 8);
                    
                    result = await user.update({
                        password: encryptPass,
                        recover_hash: ''
                    })
                }else{
                    const checkPass = await bcrypt.compare(password, user.password);
                
                    if(checkPass){
                        const encryptPass = await bcrypt.hash(newPass, 8);
                        result = await user.update({ password: encryptPass });
                    }else{
                        return resultError(HTTP.NOT_FOUND, 'Senha inválida.', res)();
                    }
                }
            }
            
            return resultSuccess('Senha alterada com sucesso', res)(result);
        }else{
            logger.debug(`AuthController.updatePassword - Usuário não encontrado - ID: ${id}`);
            resultError(HTTP.NOT_FOUND, 'Usuário não encontrado.', res)();
        }

           
    } catch (error) {
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro interno', res)(error);
    }
}

const logout = async (req, res) =>{

    try {
        const {data:userLogout} = req.body;
        const session = await SessaoModel.findOne({
            where: {
                ses_usu_id: userLogout.usu_id
            }
        });
        
        if(session){
            await session.update({
                ses_status: SESSION_STATUS.INACTIVE
            },
            {
                fields: [
                    'ses_status'
                ]
            });
    
        }
        resultSuccess('Logout realizado com sucesso..', res)(session);
    } catch (error) {
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao realizar logout', res)(error);
    }

}

export default{
    login,
    logout,
    recoverPass,
    loadByHash,
    updatePassword,
}