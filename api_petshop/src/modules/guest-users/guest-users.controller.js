import axios from 'axios'
import {
    UsersModel,
    Sequelize,
    sequelize
} from '../../models'
import bcrypt from 'bcryptjs'
import { sendMail } from '../../utils/sendMail'
import HTTP from '../../utils/http_headers'
import { USER_STATUS, APP } from '../../utils/constants'
// import { format } from 'date-fns'
import moment from 'moment'
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
    'country',
    'cep',
    'state',
    'city',
    'street',
    'neighborhood',
    'number',
    'cpf',
    'status_id',
    'newsletter_flag',
    'role',
]
const getAll = async (req, res) =>{

    const excludedFields = [
        'password',
        'created_at',
        'updated_at',
        'newsletter_flag'
    ];
    const searchFields = [ 'email', 'name', 'username'];

    req.query.extraFields = [
        ['role', 'G', Sequelize.Op.eq]
    ]

    const data = await paginatedResults(UsersModel, req.query, excludedFields, searchFields);

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
        const data = await UsersModel.findByPk(req.params.id, {
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

const validateData = async (userModel) =>{
    const errors = []

    const emailValidation = UsersModel.findOne({
        where:{
            email: userModel.email,
        },
        attributes: ['email']
    });

    const usernameValidation = UsersModel.findOne({
        where:{
            username: userModel.username
        },
        attributes: ['email', 'username', 'phone']
    });

    const phoneValidation = UsersModel.findOne({
        where:{
            phone: userModel.phone
        },
        attributes: ['phone']
    });

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userModel.email))){
        errors.push('E-mail inválido.')
    }

    const [userEmail, username, userPhone] = await Promise.all([emailValidation, usernameValidation, phoneValidation]);

    if(userEmail){
        errors.push('E-mail já cadastrado no sistema.')
    }

    if(username){
        errors.push('Usuário já cadastrado no sistema.')
    }

    if(userPhone){
        errors.push('Telefone já cadastrado no sistema.')
    }

    if(userModel.username == ''){
        errors.push('Usuário inválido.')
    }

    if(userModel.telefone == ''){
        errors.push('Telefone inválido.')
    }

    if(userModel.email == ''){
        errors.push('E-mail inválido.')
    }

    return errors;

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
    role: 'G'
  };

  if(userModel.id > 0){
    whereCond.id = {
      [Sequelize.Op.ne]: userModel.id
    }
  }

  const user = await UsersModel.findOne({
    where: whereCond,
    attributes: ['email', 'cpf', 'username']
  });

  return user;
}

const save = async (req, res) =>{

    let { data:userData } = req.body;

    if(req.body.app && req.body.app === APP.ADMIN){
        userData.status_id = USER_STATUS.ENABLED;
    }else{
        userData.status_id = USER_STATUS.DISABLED;
    }
    userData.role = 'G';

    userData.cpf = onlyNumbers(userData.cpf);
    userData.cep = onlyNumbers(userData.cep);
    userData.phone = onlyNumbers(userData.phone);
    
    userData.password = await encryptPassword(userData.password);

    const checkErrors = await validateData(userData);
    if(checkErrors.length > 0){
        return resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(checkErrors);
    }

    try {
        const user = await UsersModel.create(userData, { fields });
        const mailOptions = {
            template: 'users/register',
            message: {
                from: process.env.DEFAULT_MAIL_SENDER,
                to: 'roseniltonreis@gmail.com;marcelo.miura@dev3s.com.br;thiago.bardez@dev3s.com.br', //userData.email,
                subject: 'Biblio - Cadastro'
            },
            locals: {
                name: userData.name,
                username: userData.username,
                email: userData.email
            }
        }
        await sendMail(mailOptions);
        resultSuccess('Dados salvos com sucesso.', res)(user);
    } catch (error) {
        console.log('UserController.save - Erro ao criar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(error);
    }
}

const registration = async (req, res) =>{

  let { data:userData } = req.body;
  if(userData.validator) {
    console.log('UserController.registration - Erro ao criar registro. Registro não pode ser criado por robôs.', error);
    return resultError(HTTP.INTERNAL_SERVER_ERROR, 'Registro não pode ser criado por robôs', res)();
  }

  delete userData.validator;

  userData.password = await encryptPassword(userData.password);
  userData.role = 'G';
  try {
      userData.status_id = USER_STATUS.DISABLED;
      userData.cpf = onlyNumbers(userData.cpf);
      userData.cep = onlyNumbers(userData.cep);
      userData.phone = onlyNumbers(userData.phone);

      const dataVerify = await userCheck(userData);
      if(dataVerify){
        if(dataVerify.cpf == userData.cpf){
          return resultError(HTTP.CONFLICT, 'CPF já cadastrado', res)();
        }else if(dataVerify.username  == userData.username){
          return resultError(HTTP.CONFLICT, 'Nome de usuário já cadastrado.', res)();
        } else if(dataVerify.email == userData.email){
          return resultError(HTTP.CONFLICT, 'E-mail já cadastrado.', res)();
        }else if(dataVerify.phone == userData.phone){
          return resultError(HTTP.CONFLICT, 'Telefone já cadastrado.', res)();
        }
      }

      const user = await UsersModel.create(userData, { fields });

      try {
          const mailOptions = {
              template: 'users/register',
              message: {
                  from: process.env.MAIL_TEST_FROM,
                  to: `${user.email}`,
                  subject: 'Biblio - Cadastro'
              },
              locals: {
                  name: user.name,
                  username: user.username,
                  email: user.email,
              }
          }
          await sendMail(mailOptions)
          resultSuccess('Dados salvos com sucesso, verifique seu e-mail.', res)(user);
      } catch (error) {
          res.status(500).send('Error to send e-mail')
      }
      
  } catch (error) {
      console.log('UserController.registration - Erro ao criar registro.', error);
      resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao criar registro.', res)(error);
  }
}

const update = async (req, res) =>{
    try {
        const user = await UsersModel.findOne({
            where: {
                id: req.params.id
            }
        })
            
        if(user){
          let { data:userData } = req.body;

            if(userData.password && userData.password.length > 0){
              userData.password = await encryptPassword(userData.password);
            }

            userData.cpf = onlyNumbers(userData.cpf);
            userData.cep = onlyNumbers(userData.cep);
            userData.phone = onlyNumbers(userData.phone);

            const dataVerify = await userCheck(userData);
            if(dataVerify){
              if(user.cpf !== userData.cpf && dataVerify.cpf == userData.cpf){
                return resultError(HTTP.CONFLICT, 'CPF já cadastrado', res)();
              }else if(user.username !== userData.username && dataVerify.username == userData.username){
                return resultError(HTTP.CONFLICT, 'Nome de usuário já cadastrado.', res)();
              } else if(user.email !== userData.email && dataVerify.email != userData.email){
                return resultError(HTTP.CONFLICT, 'E-mail já cadastrado.', res)();
              }else if(user.phone !== userData.phone && dataVerify.phone != userData.phone){
                return resultError(HTTP.CONFLICT, 'Telefone já cadastrado.', res)();
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
        await UsersModel.destroy({
            where:{
                id: req.params.id
            }
        });
        resultSuccess('Registro deletado com sucesso.', res)();
    } catch (error) {
        console.log('UserController.remove - Erro ao deletar registro.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao deletar registro.', res)(error);
    }
}

const changeStatus = async (req, res) =>{
    console.log('atualizando...')
    try {
        const user = await UsersModel.findOne({
            where: {
                id: req.params.id
            }
        })

        if(user){
            const activatedDate = user.activated_at;
            await user.update({
                status_id: user.status_id == USER_STATUS.ENABLED ? USER_STATUS.DISABLED : USER_STATUS.ENABLED,
                activated_at: moment().format('YYYY-MM-DD HH:mm:ss')// format(new Date(), 'yyyy-MM-dd HH:mm:ss')
            });

            if(!activatedDate && user.status_id == USER_STATUS.ENABLED && user.role == 'G'){
                const mailOptions = {
                    template: 'users/activated',
                    message: {
                        from: process.env.DEFAULT_MAIL_SENDER,
                        to: 'roseniltonreis@gmail.com;marcelo.miura@dev3s.com.br;thiago.bardez@dev3s.com.br', //user.email,
                        subject: 'Biblio - Ativação de cadastro'
                    },
                    locals: {
                        name: user.name,
                        email: user.email
                    }
                }
                await sendMail(mailOptions);
            }

            resultSuccess('Dados atualizados com sucesso.', res)(user);
        }

    } catch (error) {
        console.log('UserController.remove - Erro ao alterar status.', error);
        resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro ao alterar status.', res)(error);
    }
}

const getCountries = async (req, res) =>{

  try {
    const result = await sequelize.query(`
      SELECT
        id,
        name
      FROM
        countries
    `,{type: sequelize.QueryTypes.SELECT});
  
    if(result.length > 0){
      resultSuccess('Países', res)(result);
    }else{
      resultEmpty(res);
    }
  } catch (error) {
    return resultError('Erro ao listar países.', res)();
  }
}

const getStates = async (req, res) =>{
  try {
    const result = await sequelize.query(`
      SELECT
        id,
        name,
        country_id,
        iso2
      FROM
        states
      WHERE
        country_id = :countryId
    `,{
      replacements:{
        countryId: req.params.countryId
      },
      type: sequelize.QueryTypes.SELECT
    });
    if(result.length > 0){
      resultSuccess('Estados', res)(result);
    }else{
      resultEmpty(res);
    }
  } catch (error) {
    console.log(error)
    return resultError('Erro ao listar estados.', res)(error);
  }
}

const getCities = async (req, res) =>{
  try {
    const result = await sequelize.query(`
      SELECT
        id,
        name,
        state_id,
        country_id
      FROM
        cities
      WHERE
        state_id = :stateId
    `,{
      replacements:{
        stateId: req.params.stateId
      },
      type: sequelize.QueryTypes.SELECT
    });
    if(result.length > 0){
      resultSuccess('Cidades', res)(result);
    }else{
      resultEmpty(res);
    }
  } catch (error) {
    console.log(error)
    return resultError('Erro ao listar cidades.', res)(error);
  }
}

const getCepInfo = async (req, res) =>{
  try {
    const result = await axios.get(`https://viacep.com.br/ws/${req.params.cep}/json/`);
    if(200 == result.status){
      resultSuccess('Dados cep', res)(result.data);
    }else{
      resultEmpty(res);
    }
  } catch (error) {
    console.log(error)
    return resultError('Erro ao listar cidades.', res)(error);
  }
}

export default{
    getAll,
    getById,
    save,
    update,
    remove,
    changeStatus,
    getCountries,
    getStates,
    getCities,
    getCepInfo,
    registration,
}