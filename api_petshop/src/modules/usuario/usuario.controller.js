import {
    UsuarioModel,
    Sequelize
} from '../../models'
import bcrypt from 'bcryptjs'
import HTTP from '../../utils/http_headers'
import {
    resultSuccess,
    resultError,
    resultEmpty
} from '../../utils/response';
import { paginatedResults } from '../../utils/paginatedResults'
import { onlyNumbers } from '../../utils/helper'
const fields = [
    'name',
    'email',
    'username',
    'password',
    'gender',
    'phone',
    'status_id',
    'role'
]

const getAll = async (req, res) =>{

    const excludedFields = [
        'password',
        'created_at',
        'updated_at',
        'newsletter_flag'
    ];

    req.query.extraFields = [
        ['id', req.user.id, Sequelize.Op.ne],
        ['role', 'A', Sequelize.Op.eq]
    ]

    const searchFields = [ 'email', 'name', 'username'];
    const data = await paginatedResults(UsuarioModel, req.query, excludedFields, searchFields);

    const returnData = {
        count: data.count,
        rows: data.rows
    }

    if(returnData.rows.length > 0){
        resultSuccess('Listagem de usuários', res)(returnData);
    }else{
        resultEmpty(res);
    }
}

const getById = async (req, res) =>{
    if(req.params.id > 0){
        const data = await UsuarioModel.findByPk(req.params.id, {
            attributes:{
                exclude: ['password']
            }
        });
        if(data == null){
            resultEmpty(res);
        }else{
            resultSuccess('Listagem', res)(data);
        }
    }
}

const encryptPassword = (password) =>{
    const result = bcrypt.hash(password, 8)
    return result;
}

const save = async (req, res) =>{

    let { data:userData } = req.body;
    userData.password = await encryptPassword(userData.password);
    userData.role = 'A';
    try {
        // userData.status_id = USER_STATUS.ENABLED;
        // userData.phone = onlyNumbers(userData.phone);

        const dataVerify = await userCheck(userData);
        if(dataVerify){
          if(dataVerify.phone == userData.phone){
            return resultError(HTTP.CONFLICT, 'Telefone já cadastrado', res)();
          }else if(dataVerify.username == userData.username){
            return resultError(HTTP.CONFLICT, 'Nome de usuário já cadastrado.', res)();
          } else if(dataVerify.email == userData.email){
            return resultError(HTTP.CONFLICT, 'E-mail já cadastrado.', res)();
          }
        }

        const user = await UsuarioModel.create(userData, { fields });
        resultSuccess('Dados salvos com sucesso.', res)(user);
    } catch (error) {
        console.log('UserController.save - Erro ao criar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(error);
    }
}

const userCheck = async (userModel) =>{

  let whereCond = {
    [Sequelize.Op.or]: [{
      phone: userModel.phone
    },{
      username: userModel.username
    },{
      email: userModel.email
    }],
    role: 'A'
  };

  if(userModel.id > 0){
    whereCond.id = {
      [Sequelize.Op.ne]: userModel.id
    }
  }

  const user = await UsuarioModel.findOne({
    where: whereCond,
    attributes: ['email', 'phone', 'username']
  });

  return user;
}

const update = async (req, res) =>{
    try {
        const user = await UsuarioModel.findOne({
            where: {
                id: req.params.id
            }
        })
            
        if(user){
            let { data:userData } = req.body;

            if(userData.password && userData.password.length > 0){
                userData.password = await encryptPassword(userData.password);
            }
            userData.phone = onlyNumbers(userData.phone);
            const dataVerify = await userCheck(userData);
            if(dataVerify){
              if(user.phone !== userData.phone && dataVerify.phone == userData.phone){
                return resultError(HTTP.CONFLICT, 'Telefone já cadastrado', res)();
              }else if(user.username !== userData.username && dataVerify.username == userData.username){
                return resultError(HTTP.CONFLICT, 'Nome de usuário já cadastrado.', res)();
              } else if(user.email !== userData.email && dataVerify.email != userData.email){
                return resultError(HTTP.CONFLICT, 'E-mail já cadastrado.', res)();
              }
            }

            await user.update(userData, { fields });
            resultSuccess('Dados atualizados com sucesso.', res)(user);
        }
        
    } catch (error) {
        console.log('UserController.update - Erro ao criar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(error);
    }
}

const remove = async (req, res) =>{
    try {
        if(req.user.role != 'A' && req.user.role != 'S'){
            resultError(HTTP.INTERNAL_SERVER_ERROR, 'Usuário não tem permissão para esta ação!', res)();
        }else{
            await UsuarioModel.destroy({
                where:{
                    id: req.params.id
                }
            });
            resultSuccess('Registro deletado com sucesso.', res)();

        }
    } catch (error) {
        console.log('UserController.remove - Erro ao deletar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao deletar registro.', res)(error);
    }
}

const changeStatus = async (req, res) =>{

    if(req.user.role != 'A' && req.user.role != 'S'){
        return resultError(HTTP.INTERNAL_SERVER_ERROR, 'Usuário não tem permissão para esta ação!', res)();
    }

    try {
        const user = await UsuarioModel.findOne({
            where: {
                id: req.params.id
            }
        })

        if(user){
            await user.update({
                status_id: user.status_id == USER_STATUS.ENABLED ? USER_STATUS.DISABLED : USER_STATUS.ENABLED
            });
            resultSuccess('Dados atualizados com sucesso.', res)(user);
        }

    } catch (error) {
        console.log('UserController.remove - Erro ao alterar status.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao alterar status.', res)(error);
    }
}

export default{
    getAll,
    getById,
    save,
    update,
    remove,
    changeStatus,
}