const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    console.log(ctx.query);
    let { page, perPage } = ctx.query;
    page = page - 1;
    delete ctx.query.page;
    let entities;
    let count;
    if (ctx.query._q) {
      entities = await strapi.services.productos.search(ctx.query);
      count = await strapi.services.productos.count();
    } else {
      //   entities = await strapi.services.productos.find(ctx.query);
      try {
        entities = await strapi.services.productos.find();
        entities = entities.filter(
          (x, i) => i >= page * perPage && i < page * perPage + perPage
        );
      } catch (err) {
        console.log(err);
      }
      count = await strapi.services.productos.count();
    }
    console.log(count);
    return {
      total: count,
      products: entities.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.productos })
      ),
    };
  },
};
