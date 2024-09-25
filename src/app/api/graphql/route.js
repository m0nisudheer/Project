const { startServerAndCreateNextHandler } = require("@as-integrations/next");
const mercury = require("@mercury-js/core");
const { ApolloServer } = require("@apollo/server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { applyMiddleware } = require("graphql-middleware");
const historyTracking = require("@mercury-js/core/packages/historyTracking");
const resolvers = require("./signup");
const typeDefs = require("./typedef");
const jwt = require("jsonwebtoken");

require("./model");
// require("./profiles");
// require('./hooks');

mercury.connect(process.env.DB_URL);

mercury.package([historyTracking()]);
mercury.addGraphqlSchema(typeDefs, resolvers);

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs: mercury.typeDefs,
    resolvers: mercury.resolvers,
  })
);

const server = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    let role = "ADMIN";
    let id = "1";
    if (token) {
      try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (!(verify.exp < Math.floor(Date.now() / 1000))) {
          role = verify.role;
          id = verify.id;
        }
      } catch (err) {
        console.error("JWT verification failed", err);
      }
    }
    return {
      ...req,
      user: {
        id,
        profile: role,
      },
    };
  },
});

exports.MercuryInstance = mercury;

exports.GET = async function (request) {
  return handler(request);
};

exports.POST = async function (request) {
  return handler(request);
};
