const { Router } = require('express');
const reportRoute = Router();
const reportController = require('../controllers/ReportController');
const middlewares = require('../shared/middlewares/middleware');

reportRoute.get('/', middlewares.authentication,  reportController.getReport);
reportRoute.get('/:id', middlewares.authentication,  reportController.getReportById);
reportRoute.get('/user/:id', middlewares.authentication,  reportController.getReportByUserId);
reportRoute.post('/', middlewares.authentication,  reportController.createReport);


module.exports = reportRoute;

