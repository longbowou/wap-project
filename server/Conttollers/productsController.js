
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
exports.products = productList;
exports.getProduct = (req, res, next) => {
    res.status(200).json(productList);
}