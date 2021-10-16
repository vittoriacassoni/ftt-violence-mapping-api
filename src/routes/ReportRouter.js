const { Router } = require('express');
const reportRoute = Router();
const reportController = require('../controllers/ReportController');

reportRoute.get('/', (req, res) => reportController.getReport(req, res));
reportRoute.get('/:id', (req, res) => reportController.getReportById(req, res));
reportRoute.get('/user/:id', (req, res) => reportController.getReportByUserId(req, res));
reportRoute.post('/', (req, res) => reportController.createReport(req, res));


module.exports = reportRoute;

