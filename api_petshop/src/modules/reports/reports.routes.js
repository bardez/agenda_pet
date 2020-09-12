import express from 'express';
import ReportsController from './reports.controller';
import { isAuthenticated, isAuthorized } from '../../utils/authManager';
import { USER_ROLES } from '../../utils/constants';

const Router = express.Router();
Router.route('/:auctionId')
    .get([isAuthenticated, isAuthorized(USER_ROLES.ADMIN)], ReportsController.auctionReports)

module.exports = Router;