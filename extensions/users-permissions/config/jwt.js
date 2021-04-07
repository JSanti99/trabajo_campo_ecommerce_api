module.exports = {
  jwtSecret: process.env.JWT_SECRET || "e19ce10b-292d-449e-ab73-ca6cbeca474e",
  jwt: {
    expiresIn: "1m",
  },
};
