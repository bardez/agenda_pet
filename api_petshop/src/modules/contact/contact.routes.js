import express from 'express';
import Contact from './contact.controller';

const Router = express.Router();
Router.route('/mail')
    .post(Contact.sendContactMail);

module.exports = Router;