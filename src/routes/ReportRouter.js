const { Router } = require('express');
const reportRoute = Router();
const reportController = require('../controllers/ReportController');
const middlewares = require('../shared/middlewares/middleware');

reportRoute.get('/', middlewares.authentication, reportController.getReport);

reportRoute.get(
  '/user',
  middlewares.authentication,
  reportController.getReportByUserId
);

reportRoute.get(
  '/:id',
  middlewares.authentication,
  reportController.getReportById
);

reportRoute.post(
  '/',
  middlewares.authentication,
  reportController.createReport
);

module.exports = reportRoute;
