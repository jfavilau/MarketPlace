$(function() {

  var plus = $("div.miso-prd-holder .miso-cart-action .miso-cart-plus");

  var minus = $("div.miso-prd-holder .miso-cart-action .miso-cart-minus");

  var remove = $("div.miso-prd-holder .miso-cart-action .miso-cart-clear");

  var overlap = $("div.holder .overlap");

  var cartmap = new CartMap();

  plus.click(function() {
    var itemctrl = getControlClassFromParents($(this), '.miso-prd-id');
    alert('item ' + itemctrl.text());
    var item = parent.find(".item").text()
    // var quantity = parent.find(".quantity");
    //
    // cartmap.addItem(item);
    // setQuantityTextForItemCount(quantity, item)
  });

  minus.click(function() {
    alert('Removed from cart');
    // var parent = $(this).parent();
    // var item = parent.find(".item").text()
    // var quantity = parent.find(".quantity");
    //
    // cartmap.removeItem(item);
    // setQuantityTextForItemCount(quantity, item)
  });

  remove.click(function() {
    alert('Cleared from cart');
    // var parent = $(this).parent();
    // var item = parent.find(".item").text()
    // var quantity = parent.find(".quantity");
    //
    // cartmap.clearItem(item);
    // quantity.text("");
  });

  overlap.mouseenter(function() {
    var item = $(this).find(".item").text();
    var quantity = $(this).find(".quantity");
    setQuantityTextForItemCount(quantity, item)
  });

  function setQuantityTextForItemCount(quantityctrl, item) {
    var count = cartmap.getItemCount(item);
    quantityctrl.text(count > 0 ? count : "");
  }

  function getControlClassFromParents(current, sonToFind) {
    var parent = current.parent();

    // alert('Looking for ' + sonToFind + ' in ' + parent.attr('class'));
    if (parent.attr('class') == undefined) return;

    var son = parent.find(sonToFind);
    // alert('son is ' + son.attr('class'));
    if (son != undefined && son.attr('class') != undefined) return son;

    return getControlClassFromParents(parent, sonToFind);

  }
})
