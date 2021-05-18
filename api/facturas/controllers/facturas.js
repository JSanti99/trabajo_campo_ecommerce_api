const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let facturas;
    let params = ctx.query;
    console.log(ctx.query);
    facturas = await strapi.services.facturas.find();
    facturas = facturas.map((factura) =>
      sanitizeEntity(factura, { model: strapi.models.facturas })
    );
    console.log({
      data: facturas.slice(
        (+params.page - 1) * +params.perPage,
        (+params.page - 1) * +params.perPage + +params.perPage
      ),
    });
    return {
      invoices: facturas.slice(
        (+params.page - 1) * +params.perPage,
        (+params.page - 1) * +params.perPage + +params.perPage
      ),
      allData: facturas,
      total: Math.ceil(facturas.length / params.perPage),
      params,
    };
  },
};
