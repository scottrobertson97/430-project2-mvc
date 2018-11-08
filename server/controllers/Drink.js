const models = require('../models');

const Drink = models.Drink;

const makerPage = (req, res) => {
  Drink.DrinkModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), drinks: docs });
  });
};

const makeDrink = (req, res) => {
  if (!req.body.name || !req.body.baseIngredient) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  /*
    make new ingredients and pop them in an array then make the drink
    parent.children.push({ name: 'Liesl' });
    or not

    ingredientOz_0
    ingredientName_0
  */

  const drinkData = {
    name: req.body.name,
    baseIngredient: req.body.baseIngredient,
    ingredients: [{ name: req.body.ingredientName_0, oz: req.body.ingredientOz_0 }],
    owner: req.session.account._id,
  };

  const newDrink = new Drink.DrinkModel(drinkData);

  const drinkPromise = newDrink.save();

  drinkPromise.then(() => res.json({ redirect: '/maker' }));

  drinkPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Drink already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred.' });
  });

  return drinkPromise;
};

const getDrinks = (request, response) => {
  const req = request;
  const res = response;

  return Drink.DrinkModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ drinks: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeDrink;
module.exports.getDrinks = getDrinks;
