var cartmapcookie = 'cartmap';

function CartMap(){
  this.cartmap = {};
  this.getItemCount = getItemCount;
  this.addItem = addItem;
  this.removeItem = removeItem;
  this.clearItem = clearItem;

  this.persistCart = persistCart;
  this.restoreCart = restoreCart;

  this.restoreCart();
}

function getItemCount(item){
  var cartmap = this.cartmap;
  var myItem = cartmap[item];
  if(myItem == undefined || myItem == null){
    return 0;
  }
  return cartmap[item];
}

function addItem(item){
  var count = this.getItemCount(item);
  var cartmap = this.cartmap;
  if(count <= 0 || cartmap[item] == undefined ||
    cartmap[item] == null){
      cartmap[item] = 0;
    }
  count++;
  cartmap[item] = count;
  this.persistCart();

  return count;
}

function removeItem(item){
  var count = this.getItemCount(item);
  count--;
  if (count < 1){
    delete this.cartmap[item];
    return 0;
  }
  this.cartmap[item] = count;

  this.persistCart();

  return count;
}

function clearItem(item){
  delete this.cartmap[item];

  this.persistCart();

  return 0;
}

function persistCart(){
  var cartmap = this.cartmap;
  if(cartmap != undefined && cartmap != null){
    Cookies.set(cartmapcookie, cartmap);
  }
}

function restoreCart(){
  var cartmap = Cookies.get(cartmapcookie);
  if(cartmap != undefined && cartmap != null){
    cartmap = JSON.parse(cartmap);
    this.cartmap = cartmap;
  }
}
