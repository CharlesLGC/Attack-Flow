const { auth } = require('express-oauth2-jwt-bearer');
const dotenv = require('dotenv');

dotenv.config();

const jwtCheck = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH_TOKEN_SIGNING_ALG,
});

const verify = (req, res, next) => {
  jwtCheck(req, res, (err) => {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
};

module.exports = { verify };
