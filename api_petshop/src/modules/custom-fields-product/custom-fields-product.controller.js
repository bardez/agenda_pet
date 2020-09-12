import { CustomFieldsProductModel } from '../../models'
import jwt from 'jsonwebtoken'
import HTTP from '../../utils/http_headers'
import { 
    resultSuccess,
    resultError,
    resultEmpty
} from '../../utils/response';
const fields = [
    'product_id',
    'custom_fields_id',
    'value'
]
const getAll = async (req, res) =>{
    const result = await CustomFieldsProductModel.findAndCountAll();
    if(result.rows.length > 0){
        resultSuccess('Listagem de Campos Customizados por Produto', res)(result);
    }else{
        resultEmpty(res);
    }
}

const getById = async (req, res) =>{
    if(req.params.id > 0){
        const data = await CustomFieldsProductModel.findByPk(req.params.id);
        if(data == null){
            resultEmpty(res);
        }else{
            resultSuccess('Listagem', res)(data);
        }
    }
}

const getByProductId = async (req, res) =>{
    if(req.params.id > 0){
        const data = await CustomFieldsProductModel.findAll({
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
        let { data:customFieldsProductData } = req.body;

        const type = await CustomFieldsProductModel.create(customFieldsProductData, { fields });
        resultSuccess('Dados salvos com sucesso.', res)(type);
    } catch (error) {
        console.log('CustomFieldController.save - Erro ao criar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(error);
    }
}

const upsert = async (req, res) => {
    try {
        let { data:customFieldsProductData } = req.body;
        const fieldValueProduct = await CustomFieldsProductModel.findOne({
            where: {
                product_id: req.params.id,
                custom_fields_id: customFieldsProductData.custom_fields_id
            }
        });

        if(fieldValueProduct){

            customFieldsProductData.product_id = req.params.id;
            customFieldsProductData.custom_field_id = req.params.custom_fields_id;

            await fieldValueProduct.update(customFieldsProductData, { fields });
            resultSuccess('Dados atualizados com sucesso.', res)(fieldValueProduct);
        } else {
            customFieldsProductData.product_id = req.params.id;

            await CustomFieldsProductModel.create(customFieldsProductData, { fields });
            resultSuccess('Dados criados com sucesso.', res)(fieldValueProduct);
        }
    } catch (error) {
        console.log('CustomFieldController.upsert - Erro ao criar/atualizar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar/atualizar registro.', res)(error);
    }
}

const update = async (req, res) =>{
    try {
        let { data:customFieldsProductData } = req.body;
        const fieldValueProduct = await CustomFieldsProductModel.findOne({
            where: {
                product_id: req.params.id,
                custom_field_id: customFieldsProductData.custom_field_id
            }
        });
            
        if(fieldValueProduct){
            await fieldValueProduct.update(customFieldsProductData, { fields });
            resultSuccess('Dados atualizados com sucesso.', res)(fieldValueProduct);
        }
        
    } catch (error) {
        console.log('CustomFieldController.update - Erro ao criar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(error);
    }
}

const remove = async (req, res) =>{
    try {
        await CustomFieldsProductModel.destroy({
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
    getByProductId,
    save,
    update,
    upsert,
    remove,
}