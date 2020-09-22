import express from 'express';
import Tipo from './tipo_usuario.controller';
import { isAuthenticated, isAuthorized } from '../../utils/authManager';
import { USER_ROLES } from '../../utils/constants';

const Router = express.Router();
Router.route('/')
    .get(/*[isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)], */ Tipo.getAll)
    .post(/*[isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)],*/ Tipo.save)

Router.route('/:id')
    .get(Tipo.getById)
    // .put(User.update)
    .patch(Tipo.update)
    .delete([isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)], Tipo.remove)

module.exports = Router;