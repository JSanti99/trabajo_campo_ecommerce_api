module.exports = {
  async refreshToken(ctx) {
    const { id } = ctx.request.body;
    return {
      refreshToken: await strapi.plugins[
        "users-permissions"
      ].services.jwt.issue({
        id,
      }),
    };
  },
};
