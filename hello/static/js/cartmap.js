/*
  Requires
    js-cookie.js
*/

var cartmapcookie = 'cartmap';

function CartMap() {
  this.cartmap = {};

  this.getItemCount = getItemCount;
  this.addItem = addItem;
  this.removeItem = removeItem;
  this.clearItem = clearItem;
  this.getCartCount = getCartCount;
  this.getCartTotal = getCartTotal;
  this.cartItemsToJSON = cartItemsToJSON;
  this.clearCart = clearCart;
  this.items = items;

  this.persistCart = persistCart;
  this.restoreCart = restoreCart;

  this.restoreCart();
}

function CartItem(id, name, price, quantity) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
}

function items() {
  return this.cartmap;
}

function cartItemsToJSON() {
  var json = '{\"items":[';
  // var json = '{[';
  var cartmap = this.cartmap;
  for (item in cartmap) {
    json += JSON.stringify(cartmap[item]);
    json += ',';
  }
  json = json.substring(0, json.length - 1);
  json += ']}'
  return json;
}

function getCartTotal() {
  var total = 0;
  var str = '';
  var cartmap = this.cartmap;
  for (item in cartmap) {
    str = cartmap[item].price;
    total += parseInt(str.match(/[0-9]+[.|,]?[0-9]*/));
  }
  return total;

}

function getCartCount() {
  var count = 0;
  var cartmap = this.cartmap;
  for (item in cartmap) {
    count += cartmap[item].quantity;
  }
  // return Object.keys(this.cartmap).length;
  return count;
}

function getItemCount(item) {
  var cartmap = this.cartmap;
  var myItem = cartmap[item];

  if (myItem == undefined || myItem == null) {
    return 0;
  }
  return cartmap[item].quantity;
}

function addItem(item, cartItem) {
  var count = this.getItemCount(item);
  var cartmap = this.cartmap;
  if (count <= 0 || cartmap[item] == undefined ||
    cartmap[item] == null) {
    cartmap[item] = cartItem;
  }

  count++;
  cartmap[item].quantity = count;
  this.persistCart();

  return count;
}

function removeItem(item) {
  var count = this.getItemCount(item);
  count--;
  if (count < 1) {
    delete this.cartmap[item];
    this.persistCart();
    return 0;
  }
  this.cartmap[item].quantity = count;
  this.persistCart();

  return count;
}

function clearItem(item) {
  delete this.cartmap[item];

  this.persistCart();

  return 0;
}

function persistCart() {
  var cartmap = this.cartmap;
  if (cartmap != undefined && cartmap != null) {
    Cookies.set(cartmapcookie, cartmap);
  }
}

function restoreCart() {
  var cartmap = Cookies.get(cartmapcookie);
  if (cartmap != undefined && cartmap != null) {
    cartmap = JSON.parse(cartmap);
    this.cartmap = cartmap;
  }
}

function clearCart() {
  Cookies.remove(cartmapcookie);
}
