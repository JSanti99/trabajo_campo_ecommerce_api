"use strict";
const epayco = require("epayco-sdk-node")({
  apiKey: "323b2dcf18b7ba6732292fe5b617f3ec",
  privateKey: "9227585f9787dbf6ef9c7f3480429a81",
  lang: "ES",
  test: true,
});
const fetch = require("node-fetch");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async customer(ctx) {
    const { id } = ctx.params;
    let res = await epayco.customers.get(id);
    console.log(res);
    return res;
  },
  async subscribe(ctx) {
    let response = await fetch("https://apify.epayco.co/login", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            "323b2dcf18b7ba6732292fe5b617f3ec" +
              ":" +
              "9227585f9787dbf6ef9c7f3480429a81"
          ).toString("base64"),
      },
    });
    let data = await response.json();
    if (data.token) {
      // console.log(ctx.request.body);
      let { franchise, mask, customerId } = ctx.request.body;
      const resTarjeta = await fetch(
        "https://apify.epayco.co/subscription/token/card/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
          body: JSON.stringify({ franchise, mask, customerId }),
        }
      );
      return await resTarjeta.json();
    }

    return;
  },
  async subscriptions() {
    const res = await epayco.subscriptions.list();
    return res;
  },
  async updateCustomer(ctx) {
    const { id } = ctx.params;
    return await epayco.customers.update(id, ctx.request.body);
  },
};
