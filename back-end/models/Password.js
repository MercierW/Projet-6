const passwordValidator = require("password-validator");

let schemaPassword = new passwordValidator();

schemaPassword
.is().min(10)                                                            
.has().uppercase(3)              
.has().lowercase(1)                              
.has().digits(2)                                
.has().not().spaces()                           
.has().not().symbols()                           
.is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = schemaPassword;