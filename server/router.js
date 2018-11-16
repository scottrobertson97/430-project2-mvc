
const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getDomos', mid.requiresSecure, mid.requiresLogin, controllers.Domo.getDomos);
  
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresSecure, mid.requiresLogin, controllers.Account.logout);

  app.get('/getDrinks', mid.requiresSecure, mid.requiresLogin, controllers.Drink.getDrinks);
  app.get('/maker', mid.requiresSecure, mid.requiresLogin, controllers.Drink.makerPage);
  app.post('/maker', mid.requiresSecure, mid.requiresLogin, controllers.Drink.make);

  app.get('/getAllDrinks', mid.requiresSecure, mid.requiresLogin, controllers.Drink.getAllDrinks);
  app.get('/allDrinks', mid.requiresSecure, mid.requiresLogin, controllers.Drink.allDrinksPage);
  
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
