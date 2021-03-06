"use strict";

var handleDrink = function handleDrink(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#drinkName").val() == '' || $("#baseIngredient").val() == '') {
    handleError("All fields are required.");
    return false;
  }

  /*
  need to get data from the from correctly
  */
  sendAjax('POST', $("#drinkForm").attr("action"), $("#drinkForm").serialize(), function () {
    loadDrinksFromServer();
  });

  return false;
};

var DrinkForm = function DrinkForm(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "form",
      { id: "drinkForm",
        onSubmit: handleDrink,
        name: "drinkForm",
        action: "/maker",
        method: "POST",
        className: "drinkForm"
      },
      React.createElement(
        "label",
        { htmlFor: "name" },
        "Name: "
      ),
      React.createElement("input", { id: "drinkName", type: "text", name: "name", placeholder: "Drink Name" }),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "baseIngredient" },
        "Base: "
      ),
      React.createElement(
        "select",
        { id: "baseIngredient", name: "baseIngredient" },
        React.createElement(
          "option",
          { value: "other" },
          "Other"
        ),
        React.createElement(
          "option",
          { value: "vodka" },
          "Vodka"
        ),
        React.createElement(
          "option",
          { value: "gin" },
          "Gin"
        ),
        React.createElement(
          "option",
          { value: "rum" },
          "Rum"
        ),
        React.createElement(
          "option",
          { value: "whiskey" },
          "Whiskey"
        ),
        React.createElement(
          "option",
          { value: "tequila" },
          "Tequila"
        )
      ),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "ingredientOz" },
        "Oz: "
      ),
      React.createElement("input", { id: "ingredientOz", type: "number", name: "ingredientOz", min: "0", max: "5", step: "0.25" }),
      React.createElement(
        "label",
        { htmlFor: "ingredientName" },
        "Ingredient: "
      ),
      React.createElement("input", { id: "ingredientName", type: "text", name: "ingredientName" }),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "ingredientOz" },
        "Oz: "
      ),
      React.createElement("input", { id: "ingredientOz", type: "number", name: "ingredientOz", min: "0", max: "5", step: "0.25" }),
      React.createElement(
        "label",
        { htmlFor: "ingredientName" },
        "Ingredient: "
      ),
      React.createElement("input", { id: "ingredientName", type: "text", name: "ingredientName" }),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "ingredientOz" },
        "Oz: "
      ),
      React.createElement("input", { id: "ingredientOz", type: "number", name: "ingredientOz", min: "0", max: "5", step: "0.25" }),
      React.createElement(
        "label",
        { htmlFor: "ingredientName" },
        "Ingredient: "
      ),
      React.createElement("input", { id: "ingredientName", type: "text", name: "ingredientName" }),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "ingredientOz" },
        "Oz: "
      ),
      React.createElement("input", { id: "ingredientOz", type: "number", name: "ingredientOz", min: "0", max: "5", step: "0.25" }),
      React.createElement(
        "label",
        { htmlFor: "ingredientName" },
        "Ingredient: "
      ),
      React.createElement("input", { id: "ingredientName", type: "text", name: "ingredientName" }),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "ingredientOz" },
        "Oz: "
      ),
      React.createElement("input", { id: "ingredientOz", type: "number", name: "ingredientOz", min: "0", max: "5", step: "0.25" }),
      React.createElement(
        "label",
        { htmlFor: "ingredientName" },
        "Ingredient: "
      ),
      React.createElement("input", { id: "ingredientName", type: "text", name: "ingredientName" }),
      React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
      React.createElement("input", { className: "makeDrinkSubmit", type: "submit", value: "Add Drink" })
    )
  );
};

var DrinkList = function DrinkList(props) {
  console.dir(props);
  if (props.drinks.length === 0) {
    return React.createElement(
      "div",
      { className: "drinkList" },
      React.createElement(
        "h3",
        { className: "emptyDrink" },
        "No Drinks yet"
      )
    );
  }

  var ingredientNode = function ingredientNode(drink) {
    var ingredients = [];
    for (var i = 0; i < drink.ingredients.length; i++) {
      ingredients.push(React.createElement(
        "div",
        { className: "drinkIngredient" },
        React.createElement(
          "p",
          null,
          drink.ingredients[i].oz,
          " Oz of ",
          drink.ingredients[i].name
        )
      ));
    }
    return ingredients;
  };

  var drinkNodes = props.drinks.map(function (drink) {
    return React.createElement(
      "div",
      { key: drink._id, className: "drink" },
      React.createElement(
        "h3",
        { className: "drinkName" },
        "Name: ",
        drink.name
      ),
      React.createElement(
        "h4",
        { className: "drinkBase" },
        "Base Ingredient: ",
        drink.baseIngredient
      ),
      ingredientNode(drink)
    );
  });

  return React.createElement(
    "div",
    { className: "drinkList" },
    drinkNodes
  );
};

var loadDrinksFromServer = function loadDrinksFromServer() {
  sendAjax('GET', '/getDrinks', null, function (data) {
    ReactDOM.render(React.createElement(DrinkList, { drinks: data.drinks }), document.querySelector("#drinks"));
  });
};

var setup = function setup(csrf) {

  ReactDOM.render(React.createElement(DrinkForm, { csrf: csrf }), document.querySelector("#makeDrinks"));

  ReactDOM.render(React.createElement(DrinkList, { drinks: [] }), document.querySelector("#drinks"));
  loadDrinksFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
