import {
    ConfigModel,
    sequelize
} from '../../models'
import HTTP from '../../utils/http_headers'
import {
    resultSuccess,
    resultError,
    resultEmpty
} from '../../utils/response';
import { paginatedResults } from '../../utils/paginatedResults'
import { saveFile, deleteFile } from '../../utils/helper';
import { CONFIG_TYPE, APP } from '../../utils/constants';
const fields = [
    'key',
    'value',
    'app',
    'type'
];

const configFilePath = `${process.env.ASSETS_PATH}/configuration`;

const getAll = async (req, res) =>{

    const excludedFields = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    const searchFields = [ 'key', 'value'];
    const data = await paginatedResults(ConfigModel, req.query, excludedFields, searchFields);

    const returnData = {
        count: data.count,
        rows: data.rows
    }

    if(returnData.rows.length > 0){
        resultSuccess('Listagem de configurações', res)(returnData);
    }else{
        resultEmpty(res);
    }
}

const getSiteConfigs = async (req, res) =>{
    try {
        const configs = await ConfigModel.findAll({
            where:{
                app: APP.SITE
            }
        });

        if(configs){
            resultSuccess('Listagem de configurações', res)(configs);
        }else{
            resultEmpty(res);
        }
        
    } catch (error) {
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao carregar configurações.', res)(error);
    }
}

const getById = async (req, res) =>{
    if(req.params.id > 0){
        const data = await ConfigModel.findByPk(req.params.id);
        if(data == null){
            resultEmpty(res);
        }else{
            resultSuccess('Listagem', res)(data);
        }
    }
}

const saveConfigFile = async ({newFile, oldFile = "", configId = 0}) =>{

    if((newFile && newFile != '' ) && newFile != oldFile){
        let filePath = `${configFilePath}/${configId}`;
        if(oldFile !== ''){
            await deleteFile(oldFile, filePath);
        }

        const objFile = {
            file_path: filePath,
            file: newFile,
            thumb: false
        }
        const result = await saveFile(objFile);
        return result;
    }
}

const save = async (req, res) =>{
    let { data:config } = req.body;
    const transaction = await sequelize.transaction();
    try {
        let configValue = '';
        if(config.type == CONFIG_TYPE.FILE){
            configValue = config.value;
            config.value = '';
        }
        const data = await ConfigModel.create(config, { fields, transaction });

        if(config.type == CONFIG_TYPE.FILE){
            const file = await saveConfigFile({newFile: configValue, configId: data.id})
            await data.update({value: file}, { transaction })
        }
        await transaction.commit();
        resultSuccess('Dados salvos com sucesso.', res)(data);
    } catch (error) {
        await transaction.rollback();
        console.log('ConfigController.save - Erro ao criar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(error);
    }
}
const update = async (req, res) =>{
    const transaction = await sequelize.transaction();
    try {
        const data = req.body.data;
        const config = await ConfigModel.findOne({
            where: {
                id: req.params.id
            }
        })
            
        if(config){
            if(config.type == CONFIG_TYPE.FILE){
                const file = await saveConfigFile({newFile: data.value, oldFile: config.value, configId: data.id});
                data.value = file;
            }

            await config.update(data, { fields, transaction });
            await transaction.commit();
            resultSuccess('Dados atualizados com sucesso.', res)(config);
        }else{
            await transaction.rollback();
            resultError(HTTP.NOT_FOUND, 'Configuração não foi encontrada.', res)();    
        }
        
    } catch (error) {
        console.log('ConfigController.update - Erro ao criar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(error);
    }
}

const remove = async (req, res) =>{
    try {
        await ConfigModel.destroy({
            where:{
                id: req.params.id
            }
        });
        resultSuccess('Registro deletado com sucesso.', res)();
    } catch (error) {
        console.log('ConfigController.remove - Erro ao deletar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao deletar registro.', res)(error);
    }
}

export default{
    getAll,
    getSiteConfigs,
    getById,
    save,
    update,
    remove
}