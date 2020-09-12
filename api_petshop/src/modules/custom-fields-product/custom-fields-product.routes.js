import express from 'express';
import CustomFieldsProductController from './custom-fields-product.controller';
import { isAuthenticated, isAuthorized } from '../../utils/authManager';
import { USER_ROLES } from '../../utils/constants';

const Router = express.Router();
Router.route('/')
    .get([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], CustomFieldsProductController.getAll)
    .post([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], CustomFieldsProductController.save)

Router.route('/product/:id')
    .get(CustomFieldsProductController.getByProductId)
    .put(CustomFieldsProductController.upsert)

Router.route('/:id')
    .get(CustomFieldsProductController.getById)
    .put([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], CustomFieldsProductController.update)
    .delete([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], CustomFieldsProductController.remove)

module.exports = Router;