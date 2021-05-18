const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;
    let count;
    try {
      if (ctx.query._q) {
        entities = await strapi.services.productos.search(ctx.query);
      } else {
        entities = await strapi.services.productos.find(ctx.query);
      }
    } catch (err) {
      console.log(err);
    }
    count = await strapi.services.productos.count();
    return {
      total: count,
      products: entities.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.productos })
      ),
    };
  },
};
