import express from 'express';
import LotsController from './lots.controller';
import { isAuthenticated, isAuthorized } from '../../utils/authManager';
import { USER_ROLES } from '../../utils/constants';

const Router = express.Router();

// site
Router.route('/:id/product')
    .get(LotsController.getProductDetailFromLot);

// admin
Router.route('/')
    .get([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], LotsController.getAll)
    .post([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], LotsController.save);

Router.route('/auction/:id')
    .get([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], LotsController.getLotsFromAuction);
    
    Router.route('/:id')
    .get(LotsController.getById)
    .put([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], LotsController.update)
    .delete([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], LotsController.remove);
    
// socket updates
Router.route('/fast-buy')
    .post([isAuthenticated], LotsController.setFastBuy);

Router.route('/:id/sold')
    .post([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], LotsController.setAsSold);


Router.route('/:id/reopen')
    .post([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], LotsController.reopen);

Router.route('/:id/revert-bid')
    .post([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], LotsController.revertBid);

module.exports = Router;