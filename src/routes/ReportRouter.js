const { Router } = require('express');
const app = Router();
const reportController = require('../controllers/ReportController');

const ReportController = reportController;

class ReportRouter {
    getRoutes() {
        app.get('/', (req, res) => ReportController.getReport(req, res));
        app.post('/', (req, res) => ReportController.createReport(req, res));
        app.put('/', (req, res) => ReportController.updateReport(req, res));
        app.delete('/:id', (req, res) => ReportController.deleteReport(req, res));

        return app
    }
}

module.exports = new ReportRouter();
