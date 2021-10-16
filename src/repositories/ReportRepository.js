var config = require("../dbconfig");

const sql = require("mssql");

const Report = require("../models/Report")

class ReportRepository {
    async getReport(req, res) {
        let conn = await sql.connect(config);
        var reports = await conn.request().query("SELECT * FROM REPORTS");

        return reports.recordsets;
    }

    async createReport(report) {
        try {
            let conn = await sql.connect(config);
            console.log(JSON.stringify(report));

            var reports = await conn.request()
            .input('ID', sql.Int, report.id)
            .input('ID_USER', sql.Int, report.id_user)
            .input('LATITUDE', sql.Decimal, report.latitude)
            .input('LONGITUDE', sql.Decimal, report.longitude)
            .input('ADDRESS', sql.VarChar, report.address)
            .input('CEP', sql.VarChar, report.cep)
            .input('TYPE', sql.Int, report.type)
            .input('DATE', sql.Date, report.date)
            .input('DESCRIPTION', sql.VarChar, report.description)
            .query("INSERT INTO REPORTS VALUES (@LATITUDE, @LONGITUDE, @ADDRESS, @CEP, @DATE, @DESCRIPTION, @TYPE, @ID_USER)");

            return reports.recordsets;
        }
        catch (error) {
            console.log(error)
        }
    }

    async getReportById(Id) {
        try {
          let conn = await sql.connect(config);
    
          var report = await conn.request().input('ID', Id)
            .query(`SELECT * FROM Reports 
                WHERE ID = @ID`);
    
          return report.recordsets[0];
        } catch (error) {
          console.log();
        }
      }

    async getReportByUserId(userId) {
        try {
          let conn = await sql.connect(config);
    
          var report = await conn.request().input('ID_User', userId)
            .query(`SELECT * FROM Reports 
                WHERE ID_User = @ID_User`);
    
          return report.recordsets[0];
        } catch (error) {
          console.log();
        }
      }


}

module.exports = new ReportRepository();
