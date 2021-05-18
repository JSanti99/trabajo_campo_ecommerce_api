const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async cartDeleteProduct(ctx) {
    let entity;
    const id = ctx.request.body.id;
    const user = ctx.state.user;

    // Obtener Carrito
    user.cart = await strapi.services.cart.findOne({ id: user.cart });

    // Filtrar Producto del carrito
    user.cart.products = user.cart.products.filter((product) => {
      return product.id !== id;
    });

    // Actualizar productos carrito
    entity = await strapi.services.cart.update(
      { id: user.cart.id },
      { products: user.cart.products }
    );

    console.log({ products: entity.products });

    return sanitizeEntity(entity, { model: strapi.models.cart });
  },
};
