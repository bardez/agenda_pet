import { sendMail } from '../../utils/sendMail'
import HTTP from "../../utils/http_headers";
import {
    resultSuccess,
    resultError
} from '../../utils/response'

const sendContactMail = async (req, res) =>{
  try {
      if(req.body){
          const {
              name,
              email,
              subject,
              message,
              validator
          } = req.body;

          if(validator) {
            res.status(500).send('Envio de email não autorizado!')
            return resultError(HTTP.INTERNAL_SERVER_ERROR, 'Envio de email não autorizado!', res)();
          }

          try{
              const mailOptions = {
                  template: 'contact/mail',
                  message: {
                      from: "'Contato' " + process.env.DEFAULT_MAIL_SENDER,
                      sender: process.env.DEFAULT_MAIL_SENDER,
                      to: process.env.DEFAULT_MAIL_CONTACT,
                      replyTo: email,
                      subject: 'Formulário de contato',
                  },
                  locals: {
                    message: message,
                    name: name,
                    email: email,
                    subject: subject,
                  }
              }
              await sendMail(mailOptions)
              console.log(`Formulário de contato enviado com sucesso - ${email}`);
              return resultSuccess('Email enviado com sucesso', res)(email);
          } catch (error) {
              res.status(500).send('Error to send e-mail')
              return resultError(HTTP.NOT_FOUND, 'Erro ao enviar email', res)(error);
          }

      } else{
          resultError(HTTP.INTERNAL_SERVER_ERROR, 'Dados inválidos.', res)();
      }
         
  } catch (error) {
      resultError(HTTP.INTERNAL_SERVER_ERROR, 'Erro interno', res)(error);
  }
}

export default{
  sendContactMail
}