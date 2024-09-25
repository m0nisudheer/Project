//@ts-ignore
const  { startServerAndCreateNextHandler } =require( "@as-integrations/next");
const mercury =require ( "@mercury-js/core");
const { ApolloServer } =require ( "@apollo/server");
const { makeExecutableSchema } =require ( "@graphql-tools/schema");
const { applyMiddleware } =require ( "graphql-middleware");
const resolvers =require("./signup");
const typeDefs =require( "./schema");
const dotenv=require("dotenv");
dotenv.config();
const {User}=require ("./model");


mercury.connect(process.env.DB_URL||"");
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
    const token = req.headers.get("authorization")
      ? req.headers.get("authorization").split(" ")[1]
      : null;
    let role = "ADMIN";
    let id = "1";
    if (token) {
      //@ts-ignore
      const verify: JwtPayload = jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

      if (!(verify.exp! < Math.floor(Date.now() / 1000))) {
        role = verify.role;
        id = verify.id;
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

//@ts-ignore
export const MercuryInstance = mercury;

export async function GET(request: any) {
  return handler(request);
}

export async function POST(request: any) {
  return handler(request);
}