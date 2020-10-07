const validator = require("validator");



module.exports = (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: "Adresse email non-conforme." });
  } else if (!validator.isLength(req.body.email, { max: 30 })) {
    return res.status(400).json({ error: "Adresse email trop longue." });
  }

  if (/[$:={},;?]/.test(req.body.email)) {
    return res.status(400).json({ error: "Caracètres invalide." });
  }
  next();
  };

