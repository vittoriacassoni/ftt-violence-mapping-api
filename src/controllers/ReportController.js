const { Response, Request } = require('express');
const reportService = require('../services/ReportService');

const Report = require('../models/Report');

class ReportController {
  async getReport(req, res) {
    const reports = await reportService.getReport();
    res.json(reports);
  }

  async createReport(req, res) {
    try {
      const reportReq = req.body;

      const report = new Report(
        0,
        reportReq.id_user,
        reportReq.latitude,
        reportReq.longitude,
        reportReq.address,
        reportReq.cep,
        reportReq.type,
        reportReq.date,
        reportReq.description
      );
      const response = await reportService.createReport(report);

      res.json(response);
    } catch (e) {
      console.log(e);
    }
  }

  async getReportById(req, res) {
    const id = req.params.id;
    const report = await reportService.getReportById(id);

    res.json(report);
  }

  async getReportByUserId(req, res) {
    const id = req.params.id;
    const report = await reportService.getReportByUserId(id);

    res.json(report);
  }
}

module.exports = new ReportController();
