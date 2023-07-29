if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)

    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    for (but of addToCartButtons) {
        but.addEventListener('click', updateData)
    }
}

function updateData(_event) {
    var noti = document.querySelector('h6')
    console.log(noti)
    var add = Number(noti.getAttribute('data-count') || 0);
    noti.setAttribute('data-count', add + 1);
    noti.classList.add('zero')
}

function updateDataDec(_event) {
    var noti = document.querySelector('h6')
    console.log(noti)
    var add = Number(noti.getAttribute('data-count') || 0);
    noti.setAttribute('data-count', add - 1);
    noti.classList.add('zero')
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
    updateDataDec()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imagesrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title, price, imagesrc)
    addItemToCart(title, price, imagesrc)
    updateCartTotal()
}

function addItemToCart(title, price, imagesrc) {
    var cartRow = document.createElement('div')
        //cartRow.innerText = title
    cartRow.classList.add('cart-row')
    var cartItem = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = document.getElementsByClassName('cart-item-title');
    var cartImageSrc = document.getElementsByClassName('cart-item-image')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartImageSrc[i].src == imagesrc) {
            alert("This item is already added to the cart!")
            updateDataDec()
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imagesrc}" alt="" width="100px" height="100px">
            <span class="cart-item-title"></span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
             <input class="cart-quantity-input" type="number" value="1">
            <button class="btn-3 btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItem.append(cartRow) //33:50
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            // console.log(priceElement, quantityElement)
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)

    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}