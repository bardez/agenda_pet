import appRoot from 'app-root-path'
import express from 'express';
import bodyParser from 'body-parser'
import dotEnvFlow from 'dotenv-flow'
dotEnvFlow.config({debug: true});

import { sendMail } from './src/utils/sendMail';
import cors from 'cors'
const app = express();
const corsOptions = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Access-Control-Request-Method', 'Access-Control-Allow-Origin'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: "50mb"}));

// mail teste sender
app.get('/mailTest', async (req, res) =>{

    try {
        const mailOptions = {
            template: 'test',
            message: {
                from: process.env.MAIL_TEST_FROM,
                to: process.env.MAIL_TEST_TO,
                subject: 'Biblio - E-mail de teste'
            },
            locals: {
                user: 'Usuário testes',
            }
        }
        await sendMail(mailOptions)
        res.status(200).send('E-mail enviado com sucesso');
    } catch (error) {
        res.status(500).send('Error to send e-mail')
    }
});

import UserRoutes from './src/modules/usuario/usuario.routes'
import TipoRoutes from './src/modules/tipo_usuario/tipo_usuario.routes'
import AgendamentoRoutes from './src/modules/agendamento/agendamento.routes'
import ServicoRoutes from './src/modules/servico/servico.routes'
import AuthRoutes from './src/modules/auth/auth.routes'
// import PageRoutes from './src/modules/pages/pages.routes'
// import ConfigRoutes from './src/modules/configuration/configuration.routes'
// import ContactRoutes from './src/modules/contact/contact.routes'
app.use('/usuario', UserRoutes);
app.use('/tipo', TipoRoutes);
app.use('/agendamento', AgendamentoRoutes);
app.use('/servico', ServicoRoutes);
app.use('/auth', AuthRoutes);
// app.use('/contact', ContactRoutes);
// app.use('/pages', PageRoutes);
// app.use('/config', ConfigRoutes);
app.use('/assets/', express.static(`${appRoot}/assets`));
app.use('/mail_files', express.static(`${appRoot}/emails`));

app.get('/', (req, res) => res.send(`Biblio - ${process.env.VERSION}`));
const server = app.listen(process.env.PORT, () => console.log(`Server runnning -> port: ${process.env.PORT}!`));

