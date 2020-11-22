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
      { id: 1, name: 'eggs', calories: 200 },
    ],
    currentItem: null,
    totalCalories: 0,
  };
  return {
    getItems: function () {
      return data.items;
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
  };
})();

//app controller
const App = (function (ItemCtrl, UICtrl) {
  return {
    init: function () {
      //get items from data structure
      const items = ItemCtrl.getItems();
      //pass items to list
      UICtrl.populateItemList(items);
    },
  };
})(ItemCtrl, UICtrl);

App.init();
