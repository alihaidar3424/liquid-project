document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-to-cart-form');
    const variantSelect = document.getElementById('product-variant-select');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
            },
                body: JSON.stringify({'items': [data]}),
            })
            .then(response => response.json())
            .then(result => {
            const messageElement = document.getElementById('add-to-cart-message');
                messageElement.textContent = 'Product added to cart successfully!';
                messageElement.classList.add('success');
                messageElement.style.display = 'block';
            setTimeout(() => {
                messageElement.style.display = 'none';
                messageElement.classList.remove('success');
            }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                const messageElement = document.getElementById('add-to-cart-message');
                messageElement.textContent = 'Error adding product to cart. Please try again.';
                messageElement.classList.add('error');
                messageElement.style.display = 'block';
            });
        });
    }
    
    if (variantSelect) {
        variantSelect.addEventListener('change', updatePrice);
        updatePrice();
    }
});

const changeMainImage = (imageUrl, index) => {
    document.getElementById('main-product-image').src = imageUrl;
    slideIndex = index;
}

const updatePrice = () => {
    const variantSelect = document.getElementById('product-variant-select');
    const priceContainer = document.querySelector('.current-price');
    const comparePriceContainer = document.querySelector('.compare-at-price');
  
    const selectedOption = variantSelect.options[variantSelect.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    const comparePrice = selectedOption.getAttribute('data-compare-price');
  
    priceContainer.textContent = formatMoney(price);
    
    if (comparePrice && parseInt(comparePrice) > parseInt(price)) {
      comparePriceContainer.textContent = formatMoney(comparePrice);
      comparePriceContainer.style.display = 'inline';
    } else {
      comparePriceContainer.style.display = 'none';
    }
}

const formatMoney = (cents) => {
    return `$${(cents / 100).toFixed(2)}`;
}

