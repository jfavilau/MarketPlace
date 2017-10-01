function CartMap(){
  this.cartmap = {};
  this.getItemCount = getItemCount;
  this.addItem = addItem;
  this.removeItem = removeItem;
  this.clearItem = clearItem;
}

function getItemCount(item){
  var cartmap = this.cartmap;
  var myItem = cartmap[item];
  if(myItem == undefined || myItem == null)
    return 0;
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
  alert(JSON.stringify(this.cartmap));
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
  alert(JSON.stringify(this.cartmap));
  return count++;
}

function clearItem(item){
  delete this.cartmap[item];
  alert(JSON.stringify(this.cartmap));
  return 0;
}
