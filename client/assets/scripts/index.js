let shoppingCartTotal = 0;
let shoppingCart = [];
let productList = [];

function getUser() {
    const user = sessionStorage.getItem("user")
    if (user) {
        return JSON.parse(user)
    }

    return null;
}

function logout() {
    sessionStorage.clear()
    window.location.href = "./login.html"
}

window.onload = function () {
    if (getUser() === null) {
        window.location.href = "./login.html"
    }
    fetchProductList()
    document.getElementById("username-span").textContent = getUser().username
};

async function fetchProductList() {
    const response = await fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': getUser().jwt,
        }
    });

    switch (response.status) {
        case 200:
            productList = await response.json();
            updateProductListUI()
            break

        case 401:
            window.location.href = './index.html'
            break
    }
}

const errorElement = document.getElementById('error');
const successElement = document.getElementById('success-place-order');

async function placeOrder() {
    errorElement.style.display = "none";
    successElement.style.display = "none";

    const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        body: JSON.stringify(shoppingCart),
        headers: {
            'Content-type': 'application/json',
            'Authorization': getUser().jwt,
        }
    });

    switch (response.status) {
        case 200:
            successElement.style.display = "block";
            productList = await response.json();
            updateProductListUI()

            shoppingCart = [];
            updateShoppingCartUI();
            break

        case 404:
            errorElement.textContent = (await response.json()).error
            errorElement.style.display = "block";
            break

        case 401:
            window.location.href = './index.html'
            break
    }
}

function updateProductListUI() {
    let tbody = "";
    productList.forEach((item) => {
        tbody += `
    <tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.stock}</td>
        <td>
            <button onclick="addToShoppingCart(${item.id})">Add</button>
        </td>
    </tr>`
    })

    document.getElementById('product-list-tbody').innerHTML = tbody
}

function addToShoppingCart(id) {
    let item = productList.find((item) => item.id == id)
    if (item != null && item.stock > 0) {
        let shoppingCartItem = shoppingCart.find((item) => item.id == id)
        if (shoppingCartItem == null) {
            shoppingCart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                stock: item.stock,
                quantity: 1,
            })
        } else {
            if (shoppingCartItem.quantity < item.stock) {
                shoppingCartItem.quantity += 1;
            }
        }

        updateShoppingCartUI();
    }
}

function computeShoppingCartTotal() {
    shoppingCartTotal = 0;
    shoppingCart.forEach((item) => shoppingCartTotal += item.price * item.quantity)
}

const shoppingCartDiv = document.getElementById('shopping-cart');
const emptyLabel = document.getElementById('empty-shopping-cart');

const shoppingCartTbody = document.getElementById('shopping-cart-tbody');

function updateShoppingCartUI() {
    computeShoppingCartTotal()

    if (shoppingCartTotal === 0) {
        shoppingCartDiv.style.display = "none";
        emptyLabel.style.display = "block";
        errorElement.style.display = "none";
    } else {
        shoppingCartDiv.style.display = "block";
        emptyLabel.style.display = "none";

        var tbody = ""
        shoppingCart.forEach((item) => {
            tbody += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.stock}</td>
                <td>
                    <button onclick="reduceItem(${item.id})">-</button>
                    <input readonly type="number" min="1" max="${item.stock}" value="${item.quantity}" onchange="updateShoppingCart(${item.id})">
                    <button onclick="increaseItem(${item.id})">+</button>
                </td>
            </tr>`
        })

        tbody += `
             <tr>
                 <td colspan="4" id="total">
                     Total: ${shoppingCartTotal}
                 </td>
             </tr>`

        shoppingCartTbody.innerHTML = tbody
    }
}

function reduceItem(id) {
    let item = shoppingCart.find((item) => item.id === id)
    if (item != null) {
        if (item.quantity === 1) {
            let index = shoppingCart.findIndex((item) => item.id === id)
            shoppingCart.splice(index, 1)
        } else {
            item.quantity -= 1
        }

        updateShoppingCartUI()
    }
}

function increaseItem(id) {
    let item = shoppingCart.find((item) => item.id === id)
    if (item != null) {
        if (item.quantity < item.stock) {
            item.quantity += 1
            updateShoppingCartUI()
        }
    }
}
