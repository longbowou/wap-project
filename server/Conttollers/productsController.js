const productController = require('./userController')
let productList = [
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

let orders = [];

exports.products = productList;

exports.getProduct = (req, res, next) => {
    if (!productController.checkJwt(req.headers["Authorization"])) {
        res.status(401).json({error: "Unauthorized"})
    }
    res.status(200).json(productList);
}

exports.placeOrder = (req, res, next) => {
    if (!productController.checkJwt(req.headers["Authorization"])) {
        res.status(401).json({error: "Unauthorized"})
    }

    const shoppingCart = req.body
    const products = []
    shoppingCart.forEach((c) => {
        const product = productList.find((p) => p.id === c.id)
        if (product === undefined) {
            res.status(404).json({error: `Product with id ${c.id} not found`});
            return;
        }

        if (c.quantity > product.stock) {
            res.status(404).json({error: `Product ${product.name} not available in stock as your required.`});
            return;
        }
        products.push(product)
    })

    products.forEach((p) => {
        p.stock -= shoppingCart.find((c) => c.id === p.id).quantity
    })

    res.status(200).json(productList);
}