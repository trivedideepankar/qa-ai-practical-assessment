const productApi = {};

productApi.listProductsEndpoint = "products";
productApi.getProductEndpoint = (productId) => `products/${productId}`;

module.exports = productApi;
