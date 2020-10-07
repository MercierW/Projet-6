const limitCreateAccount = require("express-rate-limit");

const createAccountLimiter = limitCreateAccount({
  windowMs: 30 * 60 * 1000, 
  max: 5, 
  message:
    "Vous avez tenté de créer des comptes trop de fois en peu de temps, veuillez réessayer plus tard.",
});

module.exports = createAccountLimiter;