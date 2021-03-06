const reportRepository = require('../repositories/ReportRepository');
const Report = require('../models/Report');
const Validations = require('../shared/validations/Validations');

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
    var errors = [];

    if (
      !Validations.validateRequiredField(report.latitude) ||
      !Validations.validateRequiredField(report.longitude)
    )
      errors.push('É obrigatório informar um endereço!');

    if (!Validations.validateRequiredField(report.address))
      errors.push('Campo Endereço obrigatório!');

    if (!Validations.validateCep(report.cep))
      errors.push('Campo CEP fora do padrão correto!');

    if (!Validations.validateRequiredField(report.description))
      errors.push('Campo Descrição obrigatório!');

    if (!Validations.validateDate(report.date))
      errors.push('Campo Data de Nascimento inválido!');

    //TODO VALIDATETYPE

    if (errors.length > 0) {
      return new Error(errors.join(', '), 400);
    }

    const response = await reportRepository.createReport(report);

    return response;
  }
}

module.exports = new ReportService();
