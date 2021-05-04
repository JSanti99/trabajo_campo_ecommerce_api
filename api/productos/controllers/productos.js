const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let { page, perPage } = ctx.query;
    page = parseInt(page);
    perPage = parseInt(perPage);
    let entities;
    let count;
    entities = await strapi.services.productos.find();
    try {
      console.log({ page, perPage });
      entities = entities.slice(
        (page - 1) * perPage,
        (page - 1) * perPage + perPage
      );
      // console.log({ entities });
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
  async create(ctx) {
    let entity;
    let user = ctx.state.user;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.productos.create(data, { files });
    } else {
      ctx.request.body.variedades = await Promise.all(
        ctx.request.body.variedades.map(async (variedad) => {
          return await strapi.services.variedad.create(variedad);
        })
      );
      //ctx.request.body.tienda = user.tienda;
      entity = await strapi.services.productos.create(ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.productos });
  },
};
