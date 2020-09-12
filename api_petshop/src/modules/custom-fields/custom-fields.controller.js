import {
    CustomFieldsModel,
    TypesModel,
    StatusModel
} from '../../models'
import jwt from 'jsonwebtoken'
import HTTP from '../../utils/http_headers'
import {
    resultSuccess,
    resultError,
    resultEmpty
} from '../../utils/response';
const fields = [
    'type_id',
    'field_type',
    'name',
    'status_id'
]

const getAll = async (req, res) =>{
    CustomFieldsModel.hasOne(TypesModel, {foreignKey: 'id', sourceKey: 'type_id'})
    TypesModel.belongsTo(CustomFieldsModel, {foreignKey: 'id'})
    CustomFieldsModel.hasOne(StatusModel, {foreignKey: 'id', sourceKey: 'status_id'})
    StatusModel.belongsTo(CustomFieldsModel, {foreignKey:'id'}) 

    const result = await CustomFieldsModel.findAndCountAll({
        include:[
            { 
                model: TypesModel, 
                required: true
            },
            { 
                model: StatusModel, 
                required: true
            },
        ]
    });
    if(result.rows.length > 0){
        resultSuccess('Listagem de Campos Customizados', res)(result);
    }else{
        resultEmpty(res);
    }
}

const getById = async (req, res) =>{
    if(req.params.id > 0){
        const data = await CustomFieldsModel.findByPk(req.params.id);
        if(data == null){
            resultEmpty(res);
        }else{
            resultSuccess('Listagem', res)(data);
        }
    }
}

const getByTypeId = async (req, res) =>{
    if(req.params.id > 0){
        const data = await CustomFieldsModel.findAll({
            where: {
                type_id: req.params.id
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

    try {
        let { data:customFieldsData } = req.body;

        const customFields = await CustomFieldsModel.create(customFieldsData, { fields });
        resultSuccess('Dados salvos com sucesso.', res)(customFields);
    } catch (error) {
        console.log('CustomFieldController.save - Erro ao criar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(error);
    }
}

const update = async (req, res) =>{
    try {
        const customFields = await CustomFieldsModel.findOne({
            where: {
                id: req.params.id
            }
        });
            
        if(customFields){
            let { data:customFieldsData } = req.body;

            await customFields.update(customFieldsData, { fields });
            resultSuccess('Dados atualizados com sucesso.', res)(customFields);
        }
        
    } catch (error) {
        console.log('CustomFieldController.update - Erro ao criar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(error);
    }
}

const remove = async (req, res) =>{
    try {
        await CustomFieldsModel.destroy({
            where:{
                id: req.params.id
            }
        });
        resultSuccess('Registro deletado com sucesso.', res)();
    } catch (error) {
        console.log('CustomFieldController.remove - Erro ao deletar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao deletar registro.', res)(error);
    }
}

export default{
    getAll,
    getById,
    getByTypeId,
    save,
    update,
    remove,
}