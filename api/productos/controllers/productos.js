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
  async findOneBySlug(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.productos.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.productos });
  },
};
