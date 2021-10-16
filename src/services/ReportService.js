const reportRepository = require('../repositories/ReportRepository');
const Report = require('../models/Report');

class ReportService {
    async getReport() {
      const reports = await reportRepository.getReport();
  
      return reports;
    }
  
    async getReportById(id) {
      const report = await reportRepository.getReportById(id);
  
      return report;
    }

    async getReportByUserId(id) {
        const report = await reportRepository.getReportByUserId(id);
    
        return report;
      }
  
    async createReport(report) {
      //TODO VALIDACOES
      console.log(JSON.stringify(report))

      const response = await reportRepository.createReport(report);
  
      return response;
    }

}

module.exports = new ReportService();