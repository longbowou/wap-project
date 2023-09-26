var shoppingCartTotal = 0;
var shoppingCart = [];
var productList = [
    {
        id: 1,
        name: "Node.js",
        price: 9.99,
        stock: 8,
    },
    {
        id: 2,
        name: "React",
        price: 19.99,
        stock: 5,
    },
    {
        id: 3,
        name: "Angular",
        price: 29.99,
        stock: 13,
    }
]

function saveJWT(jwt) {
    sessionStorage.setItem("JWT", jwt)
}

function getJWT(jwt) {
    return sessionStorage.getItem("JWT")
}

function logout() {
    sessionStorage.clear()
    window.location = "/login.html"
}

async function fetchProductList() {
    let response = await fetch({
        url: "http://localhost:3000/products", headers: {
            'Content-type': 'application/json',
            "Authorization": getJWT()
        },
    })

    productList = response
}

function UpdateProductListUI() {
    var tbody = ""
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

UpdateProductListUI()

function addToShoppingCart(id) {
    let item = productList.find((item) => item.id == id)
    console.log(item)
    if (item != null) {
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

var shoppingCartDiv = document.getElementById('shopping-cart')
var emptyLabel = document.getElementById('empty-shopping-cart')

var shoppingCartTbody = document.getElementById('shopping-cart-tbody')

function updateShoppingCartUI() {
    computeShoppingCartTotal()

    if (shoppingCartTotal === 0) {
        shoppingCartDiv.style.display = "none";
        emptyLabel.style.display = "block";
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
