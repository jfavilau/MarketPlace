$(function(){

  var plus = $("div.holder .overlap .plus");
  var minus = $("div.holder .overlap .minus");
  var remove = $("div.holder .overlap .remove");

  var cartmap = new CartMap();

  plus.click(function(){
    var parent = $(this).parent();
    var item = parent.find(".item").text()
    var quantity = parent.find(".quantity");

    cartmap.addItem(item);
    quantity.text(cartmap.getItemCount(item));
  });

  minus.click(function(){
    var parent = $(this).parent();
    var item = parent.find(".item").text()
    var quantity = parent.find(".quantity");

    cartmap.removeItem(item);

    var count = cartmap.getItemCount(item);
    if(count > 0) {
      quantity.text(count);
      return;
    }
    quantity.text("");
  });

  remove.click(function(){
    var parent = $(this).parent();
    var item = parent.find(".item").text()
    var quantity = parent.find(".quantity");

    cartmap.clearItem(item);

    quantity.text("");
  });
})
