class Report 
{
    constructor(id, id_user, latitude, longitude, address, cep, type, date, description)
    {
        this.id = id;
        this.id_user = id_user;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.cep = cep;
        this.type = type;
        this.date = date;
        this.description = description;
    }
}

module.exports = Report;