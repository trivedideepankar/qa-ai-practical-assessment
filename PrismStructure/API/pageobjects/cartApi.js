const cartApi = {};

cartApi.createCartEndpoint = "carts";

cartApi.getCartEndpoint = (cartId) => `carts/${cartId}`;
cartApi.updateQuantityEndpoint = (cartId) =>
  `carts/${cartId}/product/quantity`;

cartApi.buildUpdateQuantityBody = (productId, quantity) => ({
  product_id: productId,
  quantity,
});

module.exports = cartApi;
