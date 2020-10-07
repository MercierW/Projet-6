const limitLoginAccount = require("express-rate-limit");

const LoginAccountLimiter = limitLoginAccount({
  windowMs: 30 * 60 * 1000, 
  max: 5, 
  message:
    "Vous avez tenté de vous connecter trop de fois en peu de temps, veuillez réessayer plus tard.",
});

module.exports = LoginAccountLimiter;
