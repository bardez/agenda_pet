import {
    TipoUsuarioModel
} from '../../models'
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
    'tip_desc',
    'created_at'
]

const getAll = async (req, res) =>{

    const excludedFields = [
        'updated_at'
    ];

    const searchFields = [ 'tip_desc'];
    const data = await paginatedResults(TipoUsuarioModel, req.query, excludedFields, {searchFields}, [], 'tip_id');

    const returnData = {
        count: data.count,
        rows: data.rows
    }

    if(returnData.rows.length > 0){
        resultSuccess('Listagem de tipos', res)(returnData);
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

const save = async (req, res) =>{

    let { data:tipoUserData} = req.body;

    try {
        tipoUserData.created_at = new Date();
        const tipoUsuario = await TipoUsuarioModel.create(tipoUserData, { fields });
        resultSuccess('Dados salvos com sucesso.', res)(tipoUsuario);
    } catch (error) {
        console.log('TipoUserController.save - Erro ao criar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(error);
    }
}

const update = async (req, res) =>{
    try {
        const user = await UsuarioModel.findOne({
            where: {
                tip_id: req.params.id
            }
        })
            
        if(user){
            let { data:tipoUserData } = req.body;

            if(tipoUserData.usu_senha && tipoUserData.usu_senha.length > 0){
                tipoUserData.usu_senha = await encryptPassword(tipoUserData.usu_senha);
            }
            if(tipoUserData.usu_celular) tipoUserData.usu_celular = onlyNumbers(tipoUserData.usu_celular);
            const dataVerify = await userCheck(tipoUserData);
            if(dataVerify){
              if(user.usu_celular !== tipoUserData.usu_celular && dataVerify.usu_celular == tipoUserData.usu_celular){
                return resultError(HTTP.CONFLICT, 'Telefone já cadastrado', res)();
              } else if(user.usu_email !== tipoUserData.usu_email && dataVerify.usu_email != tipoUserData.usu_email){
                return resultError(HTTP.CONFLICT, 'E-mail já cadastrado.', res)();
              }
            }

            await user.update(tipoUserData);
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

export default{
    getAll,
    getById,
    save,
    update,
    remove,
}