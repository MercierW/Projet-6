//IMPORT
const Sauce = require("../models/Sauce");
const fse = require("fs-extra");

// REGEXP
const validInput = /[${}<>]/;

//CREATION DE LA SAUCE
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  if (validInput.test(sauce.name) || 
  validInput.test(sauce.manufacturer) || 
  validInput.test(sauce.description) || 
  validInput.test(sauce.mainPepper)){
    return res.status(400).json({ error: "Caracètres invalide." });
  } else {
    sauce
      .save()
      .then(() => res.status(201).json({ message: "Sauce créée !" }))
      .catch((error) => res.status(400).json({ error }));  
  }
};

//LIKE OU DISLIKE UNE SAUCE
exports.likeOrDislikeSauce = (req, res, next) => {
    switch (req.body.like) {
      case (req.body.like = 1):
        Sauce.updateOne(
          { _id: req.params.id },
          {
            _id: req.params.id,
            $inc: { likes: +1 },
            $push: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(200).json({ message: "Sauce liké !" }))
          .catch((error) => res.status(400).json({ error }));
        break;
      case (req.body.like = -1):
        Sauce.updateOne(
          { _id: req.params.id },
          {
            _id: req.params.id,
            $inc: { dislikes: +1 },
            $push: { usersDisliked: req.body.userId },
          }
        )
          .then(() => res.status(200).json({ message: "Sauce disliké !" }))
          .catch((error) => res.status(400).json({ error }));
        break;
      case (req.body.like = 0):
        Sauce.findOne({ _id: req.params.id })
          .then((sauce) => {
            if (sauce.usersLiked.includes(req.body.userId)) {
              Sauce.updateOne(
                { _id: req.params.id },
                {
                  _id: req.params.id,
                  $inc: { likes: -1 },
                  $pullAll: { usersLiked: [req.body.userId] },
                }
              )
                .then(() =>
                  res.status(200).json({ message: "Like supprimé !" })
                )
                .catch((error) => res.status(400).json({ error }));
            } else if (sauce.usersDisliked.includes(req.body.userId)) {
              Sauce.updateOne(
                { _id: req.params.id },
                {
                  _id: req.params.id,
                  $inc: { dislikes: -1 },
                  $pullAll: { usersDisliked: [req.body.userId] },
                }
              )
                .then(() =>
                  res.status(200).json({ message: "Dislike supprimé !" })
                )
                .catch((error) => res.status(400).json({ error }));
            }
          })
          .catch((error) => res.status(404).json({ error }));
        break;
      default:
        res.status(500).json({ error: "Problème serveur" });
    } 
};


//MODIFICATION DE LA SAUCE
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
  ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
        }`,
      }
      : { ...req.body };
      if (
        validInput.test(sauceObject.name) ||
        validInput.test(sauceObject.manufacturer) ||
        validInput.test(sauceObject.description) ||
        validInput.test(sauceObject.mainPepper)
        ) {
          return res.status(400).json({ error: "Caracètres invalide." });
        } else {
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
            )
        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch((error) => res.status(400).json({ error }));
      }
    };
    
    //SUPPRIME LA SAUCE
    exports.deleteSauce = (req, res, next) => {
      Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split("/images/")[1];
        fse.remove(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
    };
    
    //SELECTIONNE UNE SAUCE PRECISE DANS LA BASE DE DONNEES
    exports.getOneSauce = (req, res, next) => {
      Sauce.findOne({ _id: req.params.id })
      .then((sauce) => res.status(200).json(sauce))
      .catch((error) => res.status(404).json({ error }));
    };
    
    //SELECTIONNE TOUTES LES SAUCES PRESENTES DANS LA BASE DE DONNEES
    exports.getAllSauces = (req, res, next) => {
      Sauce.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ error }));
    };