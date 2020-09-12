import express from 'express';
import CustomFieldsController from './custom-fields.controller';
import { isAuthenticated, isAuthorized } from '../../utils/authManager';
import { USER_ROLES } from '../../utils/constants';

const Router = express.Router();
Router.route('/')
    .get([isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)], CustomFieldsController.getAll)
    .post([isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)], CustomFieldsController.save)

Router.route('/type/:id')
    .get([isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)], CustomFieldsController.getByTypeId)

Router.route('/:id')
    .get([isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)], CustomFieldsController.getById)
    // .put(CustomFieldsController.update)
    .delete([isAuthenticated, isAuthorized(USER_ROLES.SUPERUSER)], CustomFieldsController.remove)

module.exports = Router;