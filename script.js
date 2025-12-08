document.addEventListener("DOMContentLoaded", function() {
  var cart = [];
  var cartList = document.getElementById("cart-items");
  var totalBox = document.getElementById("total");

  if (!cartList || !totalBox) return;

  var productButtons = document.querySelectorAll("#products button");

  productButtons.forEach(function(btn){
    btn.addEventListener("click", function(){
      var box = btn.parentElement;
      if (!box) return;
      var titleEl = box.querySelector("h3");
      var priceEl = box.querySelector("p");
      var title = titleEl ? titleEl.innerText : "منتج";
      var priceText = priceEl ? priceEl.innerText : "0";
      var price = parseFloat(priceText.replace(/[^0-9\.]/g,"")) || 0;

      var item = cart.find(function(p){ return p.title === title; });
      if (item) item.quantity += 1;
      else cart.push({title: title, price: price, quantity: 1});

      renderCart();
    });
  });

  function renderCart(){
    cartList.innerHTML = "";
    var total = 0;

    cart.forEach(function(item, i){
      total += item.price * item.quantity;

      var li = document.createElement("li");
      li.innerHTML = "<strong>" + item.title + "</strong> - " + item.price + " LYD<br>" +
                     "الكمية: <button class='minus' data-i='" + i + "'>-</button>" +
                     "<span>" + item.quantity + "</span>" +
                     "<button class='plus' data-i='" + i + "'>+</button>" +
                     "<button class='delete' data-i='" + i + "' style='color:red;'>حذف</button><br><br>";
      cartList.appendChild(li);
    });

    totalBox.innerText = total;

    cartList.querySelectorAll(".plus").forEach(function(btn){
      btn.onclick = function(){
        var i = parseInt(btn.getAttribute("data-i"));
        if (cart[i]) { cart[i].quantity++; renderCart(); }
      };
    });

    cartList.querySelectorAll(".minus").forEach(function(btn){
      btn.onclick = function(){
        var i = parseInt(btn.getAttribute("data-i"));
        if (cart[i]){
          if(cart[i].quantity > 1) cart[i].quantity--;
          else cart.splice(i,1);
          renderCart();
        }
      };
    });

    cartList.querySelectorAll(".delete").forEach(function(btn){
      btn.onclick = function(){
        var i = parseInt(btn.getAttribute("data-i"));
        if (cart[i]){
          cart.splice(i,1);
          renderCart();
        }
      };
    });
  }

  renderCart();
});