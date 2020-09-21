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
import { USER_ROLES } from '../../utils/constants';
const fields = [
    'usu_nome',
    'usu_email',
    'usu_cpf_cnpj',
    'usu_status',
    'usu_senha',
    'usu_celular',
    'usu_tip_id',
]

const getAll = async (req, res) =>{

    const excludedFields = [
        'usu_senha',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    req.query.extraFields = [
        // ['usu_id', req.user.usu_id, Sequelize.Op.ne],
        // ['usu_tip_id', req.user.usu_tip, Sequelize.Op.eq]
    ]

    const searchFields = [ 'usu_email', 'usu_nome','usu_celular'];
    const data = await paginatedResults(UsuarioModel, req.query, excludedFields, {searchFields});

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
                exclude: ['usu_senha']
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
    userData.usu_senha = await encryptPassword(userData.usu_senha);

    console.log(userData)

    try {
        // userData.status_id = USER_STATUS.ENABLED;
        // userData.phone = onlyNumbers(userData.phone);

        const dataVerify = await userCheck(userData);
        if(dataVerify){
          if(dataVerify.usu_celular == userData.usu_celular){
            return resultError(HTTP.CONFLICT, 'Telefone já cadastrado', res)();
          } else if(dataVerify.usu_email == userData.usu_email){
            return resultError(HTTP.CONFLICT, 'E-mail já cadastrado.', res)();
          } else if(dataVerify.usu_cpf_cnpj == userData.usu_cpf_cnpj){
            return resultError(HTTP.CONFLICT, 'CPF/CNPJ já cadastrado.', res)();
          }
        }

        const user = await UsuarioModel.create(userData, { fields });
        delete user.usu_senha;
        resultSuccess('Dados salvos com sucesso.', res)(user);
    } catch (error) {
        console.log('UserController.save - Erro ao criar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(error);
    }
}

const userCheck = async (userModel) =>{
 
  let whereCond = {
    [Sequelize.Op.or]: [{
      usu_email: userModel.usu_email
    }],
    usu_tip_id: 2
  };

  if(userModel.id > 0){
    whereCond.id = {
      [Sequelize.Op.ne]: userModel.usu_id
    }
  }

  const user = await UsuarioModel.findOne({
    where: whereCond,
    attributes: ['usu_email', 'usu_celular']
  });

  return user;
}

const update = async (req, res) =>{
    try {
        const user = await UsuarioModel.findOne({
            where: {
                usu_id: req.params.id
            }
        })
            
        if(user){
            let { data:userData } = req.body;

            if(userData.usu_senha && userData.usu_senha.length > 0){
                userData.usu_senha = await encryptPassword(userData.usu_senha);
            }
            if(userData.usu_celular) userData.usu_celular = onlyNumbers(userData.usu_celular);
            const dataVerify = await userCheck(userData);
            if(dataVerify){
              if(user.usu_celular !== userData.usu_celular && dataVerify.usu_celular == userData.usu_celular){
                return resultError(HTTP.CONFLICT, 'Telefone já cadastrado', res)();
              } else if(user.usu_email !== userData.usu_email && dataVerify.usu_email != userData.usu_email){
                return resultError(HTTP.CONFLICT, 'E-mail já cadastrado.', res)();
              }
            }

            await user.update(userData);
            resultSuccess('Dados atualizados com sucesso.', res)(user);
        }
        
    } catch (error) {
        console.log('UserController.update - Erro ao criar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(error);
    }
}

const remove = async (req, res) =>{
    try {
        if(req.user.usu_tip_id != USER_ROLES.ADMIN && req.user.usu_tip_id != USER_ROLES.SUPERUSER){
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

    if(req.user.usu_tip_id != USER_ROLES.ADMIN && req.user.usu_tip_id != USER_ROLES.SUPERUSER){
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
                usu_status: user.usu_status == USER_STATUS.ENABLED ? USER_STATUS.DISABLED : USER_STATUS.ENABLED
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