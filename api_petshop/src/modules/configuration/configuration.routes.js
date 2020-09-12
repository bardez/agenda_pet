import express from 'express';
import Config from './configuration.controller';
import { isAuthenticated, isAuthorized } from '../../utils/authManager';
import { USER_ROLES } from '../../utils/constants';

const Router = express.Router();
Router.route('/')
    .get([isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)], Config.getAll)
    .post([isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)], Config.save)

Router.route('/site').get(Config.getSiteConfigs)

Router.route('/:id')
    .get(Config.getById)
    .put(Config.update)
    .delete([isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)], Config.remove)

module.exports = Router;