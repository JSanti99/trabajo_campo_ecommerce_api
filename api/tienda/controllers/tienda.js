const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findProducts(ctx) {
    const { id } = ctx.params;
    let productos;
    try {
      if (ctx.query._q) {
        productos = await strapi.services.productos.search(ctx.query);
      } else {
        productos = await strapi.services.productos.find(ctx.query);
      }
    } catch (err) {
      console.log(err);
    }
    productos = productos
      .filter((p) => p.brand)
      .filter((p) => p.brand.id == id);

    return {
      total: productos.length,
      products: productos.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.productos })
      ),
    };
  },
};
