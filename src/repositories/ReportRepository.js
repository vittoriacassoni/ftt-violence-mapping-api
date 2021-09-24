var config = require("../dbconfig");

const sql = require("mssql");

const Report = require("../models/Report")

class ReportRepository {
    async getReport(req, res) {
        let conn = await sql.connect(config);
        var reports = await conn.request().query("SELECT * FROM REPORT");

        return reports.recordsets;
    }

    async createReport(req, res) {
        try {
            let conn = await sql.connect(config);
            var model = new Report(req.body)

            sql.input('ID', sql.Int, model.id);
            sql.input('ID_USER', sql.Int, model.id_user);
            sql.input('LATITUDE', sql.VarChar, model.latitude);
            sql.input('LONGITUDE', sql.VarChar, model.longitude);
            sql.input('TYPE', sql.VarChar, model.type);
            sql.input('DATE', sql.Date, model.date);
            sql.input('DESCRIPTION', sql.VarChar, model.description);

            var reports = await conn.request().query("INSERT INTO REPORT VALUES (@ID, @ID_USER, @LATITUDE, @LONGITUDE, @TYPE, @DATE, @DESCRIPTION)");

            return reports.recordsets;
        }
        catch (error) {
            console.log()
        }
    }

    async updateReport(req, res) {
        try {
            let conn = await sql.connect(config);
            var model = new Report(req.body)

            sql.input('ID', sql.Int, model.id);
            sql.input('ID_USER', sql.Int, model.id_user);
            sql.input('LATITUDE', sql.VarChar, model.latitude);
            sql.input('LONGITUDE', sql.VarChar, model.longitude);
            sql.input('TYPE', sql.VarChar, model.type);
            sql.input('DATE', sql.Date, model.date);
            sql.input('DESCRIPTION', sql.VarChar, model.description);

            var reports = await conn.request().query("UPDATE REPORT SET ID = @ID, ID_USER = @ID_USER, LATITUDE = @LATITUDE, LONGITUDE = @LONGITUDE, TYPE = @TYPE, DATE = @DATE, DESCRIPTION = @DESCRIPTION WHERE ID = @ID");

            return reports.recordsets;
        }
        catch (error) {
            console.log()
        }
    }

    async deleteReport(req, res) {
        try {
            let conn = await sql.connect(config);
            var model = new Report(req.body)

            sql.input('ID', sql.Int, model.id);
            
            var reports = await conn.request().query("DELETE FROM REPORT WHERE ID = @ID");

            return reports.recordsets;
        }
        catch (error) {
            console.log()
        }
    }
}

module.exports = new ReportRepository();
