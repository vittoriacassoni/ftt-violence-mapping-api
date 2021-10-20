const regex = require('../regex/Regex');

class Validations {


    static validateStringAlphaRequired(name) {
        
        if(!this.validateRequiredField(name))
        {
            return false;
        }
        
        return regex.RX_ALPHA.test(name); 
    }

    static validateRequiredField(value){

        if(value !== null || value !== undefined)
        {
            if(typeof value === 'string' && (value === '' || value === ' '))
            {
              return false;
            }

            return true;
        }
    }

    static validateEmail(email){
        return regex.RX_EMAIL.test(email);
    }

    //TODO VALIDATEDATE

    static validatePhoneNumber(value){
        return regex.RX_PHONE_NUMBER.test(value);
    }

    static validateCep(cep){
        return regex.RX_CEP.test(cep);
    }

    static validateLatitude(value){
        return regex.RX_LATITUDE.test(value);
    }

    static validateLongitude(value){
        return regex.RX_LONGITUDE.test(value);
    }
}

module.exports = Validations;