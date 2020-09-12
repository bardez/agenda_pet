import express from 'express';
import GuestUsers from './guest-users.controller';
import { isAuthenticated, isAuthorized } from '../../utils/authManager';
import { USER_ROLES } from '../../utils/constants';

const Router = express.Router();
Router.route('/')
    .get([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], GuestUsers.getAll)
    .post([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], GuestUsers.save)
    
Router.route('/getCepInfo/:cep')
  .get(GuestUsers.getCepInfo);

Router.route('/countries')
  .get(GuestUsers.getCountries);

Router.route('/states/:countryId')
  .get(GuestUsers.getStates);
  
Router.route('/cities/:stateId')
  .get(GuestUsers.getCities);

Router.route('/:id')
    .get([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], GuestUsers.getById)
    .put([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], GuestUsers.update)
    .delete([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], GuestUsers.remove);

Router.route('/changeStatus/:id')
    .post([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], GuestUsers.changeStatus);

Router.route('/register/')
  .post(GuestUsers.registration);

module.exports = Router;