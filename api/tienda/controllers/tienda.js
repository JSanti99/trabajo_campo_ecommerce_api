const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findProducts(ctx) {
    let { id } = ctx.params;
    console.log({ id });
    let { page, perPage } = ctx.query;
    page = parseInt(page);
    perPage = parseInt(perPage);
    let tienda;
    let count;
    let productos;
    try {
      tienda = await strapi.services.tienda.findOne({ id });
      productos = tienda.productos;
      count = productos.length;
      productos = productos.slice(
        (page - 1) * perPage,
        (page - 1) * perPage + perPage
      );
      // console.log({ entities });
    } catch (err) {
      console.log(err);
    }
    console.log({ count, productos });
    return {
      total: count,
      products: productos.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.productos })
      ),
    };
  },
};
