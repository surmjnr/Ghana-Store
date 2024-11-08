var MenuItems = document.getElementById("MenuItems");
      MenuItems.style.maxHeight = "0px";

      function menutoogle() {
        if (MenuItems.style.maxHeight == "0px") {
          MenuItems.style.maxHeight = "200px";
        } else {
          MenuItems.style.maxHeight = "0px";
        }
      }

      function addToCart(id, name, price, image) {
        // Get selected size
        const selectedSize = document.querySelector('input[name="size"]:checked');
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        // Get selected quantity
        const quantity = parseInt(document.getElementById('quantity').value) || 1;

        // Create cart item
        const cartItem = {
            id: `${id}-${selectedSize.value}`,
            name: name,
            price: price,
            image: image,
            size: selectedSize.value,
            quantity: quantity
        };

        // Get existing cart
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if item exists
        const existingItemIndex = cartItems.findIndex(item => 
            item.id === cartItem.id
        );

        if (existingItemIndex > -1) {
            // Update quantity if item exists
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            // Add new item if it doesn't exist
            cartItems.push(cartItem);
        }

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Redirect to cart page
        window.location.href = 'cart.html';
      }

      function getCartItems() {
        return JSON.parse(localStorage.getItem('cart')) || [];
      }

      function saveCartItems(cartItems) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }

      var ProductImg = document.getElementById("ProductImg");
      var SmallImg = document.getElementsByClassName("small-img");

      function updateImage(element) {
        ProductImg.src = element.src;
      }

      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        });
      });