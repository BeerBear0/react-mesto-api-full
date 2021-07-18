const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (cards === null) {
        next(null);
      } else {
        res.send(cards);
      }
    })
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => new Error('Card not found'))
    .then((card) => {
      if (String(card.owner) === req.user._id) {
        Card.deleteOne({ _id: cardId }).then(() => res.send({ message: 'Успешно удалено' }));
      } else {
        return Promise.reject(new Error('Forbidden'));
      }
    })
    .catch((err) => next(err));
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { runValidators: true, new: true },
  )
    .orFail(() => new Error('Card not found'))
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { runValidators: true, new: true },
  )
    .orFail(() => new Error('Card not found'))
    .then((card) => res.send(card))
    .catch((err) => next(err));
};
