import express from 'express';
import User from './usuario.controller';
import { isAuthenticated, isAuthorized } from '../../utils/authManager';
import { USER_ROLES } from '../../utils/constants';

const Router = express.Router();
Router.route('/')
    .get([isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)], User.getAll)
    .post(/*[isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)],*/ User.save)

Router.route('/:id')
    .get(User.getById)
    // .put(User.update)
    .patch(User.update)
    .delete([isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)], User.remove)

Router.route('/changeStatus/:id')
    .post([isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)], User.changeStatus);

module.exports = Router;