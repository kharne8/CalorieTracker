//storage controller

//item controller
const ItemCtrl = (function () {
  //constructor
  const Item = function (id, name, calories) {
    (this.id = id), (this.name = name), (this.calories = calories);
  };

  //state
  const data = {
    items: [
      { id: 0, name: 'steak dinner', calories: 1200 },
      { id: 1, name: 'bobba tea', calories: 500 },
      { id: 2, name: 'eggs', calories: 200 },
    ],
    currentItem: null,
    totalCalories: 0,
  };
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      //calories to number
      calories = parseInt(calories);

      //create new item
      newItem = new Item(ID, name, calories);

      data.items.push(newItem);

      return newItem;
    },
    logData: function () {
      return data;
    },
  };
})();

//ui controller
const UICtrl = (function () {
  const UISelectors = {
    itemtList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
  };

  return {
    populateItemList: function (items) {
      let html = '';
      items.forEach((item) => {
        html += `
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      </li>
                `;
      });
      document.querySelector(UISelectors.itemtList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    getSelectors: function () {
      return UISelectors;
    },
  };
})();

//app controller
const App = (function (ItemCtrl, UICtrl) {
  const loadEventListener = function () {
    const UISelectors = UICtrl.getSelectors();

    //add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);
  };

  const itemAddSubmit = function (e) {
    //get input form uictrl
    const input = UICtrl.getItemInput();
    //check for input
    if (input.name !== '' && input.calories !== '') {
      //add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    }

    e.preventDefault();
  };

  return {
    init: function () {
      //get items from data structure
      const items = ItemCtrl.getItems();
      //pass items to list
      UICtrl.populateItemList(items);
      //load event listener
      loadEventListener();
    },
  };
})(ItemCtrl, UICtrl);

App.init();
