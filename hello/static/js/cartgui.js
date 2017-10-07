$(function(){

  var plus = $("div.holder .overlap .plus");
  var minus = $("div.holder .overlap .minus");
  var remove = $("div.holder .overlap .remove");
  var overlap = $("div.holder .overlap");

  var cartmap = new CartMap();

  plus.click(function(){
    var parent = $(this).parent();
    var item = parent.find(".item").text()
    var quantity = parent.find(".quantity");

    cartmap.addItem(item);
    setQuantityTextForItemCount(quantity, item)
  });

  minus.click(function(){
    var parent = $(this).parent();
    var item = parent.find(".item").text()
    var quantity = parent.find(".quantity");

    cartmap.removeItem(item);
    setQuantityTextForItemCount(quantity, item)
  });

  remove.click(function(){
    var parent = $(this).parent();
    var item = parent.find(".item").text()
    var quantity = parent.find(".quantity");

    cartmap.clearItem(item);
    quantity.text("");
  });

  overlap.mouseenter(function(){
    var item = $(this).find(".item").text();
    var quantity = $(this).find(".quantity");
    setQuantityTextForItemCount(quantity, item)
  });

  function setQuantityTextForItemCount(quantityctrl, item){
    var count = cartmap.getItemCount(item);
    quantityctrl.text(count > 0 ? count : "");
  }
})
