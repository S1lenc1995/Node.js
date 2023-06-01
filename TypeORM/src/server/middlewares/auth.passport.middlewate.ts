import { expressjwt, ExpressJwtRequest } from "express-jwt";

const getTokenFromHeaders = (req) => {
  
  const {
    headers: { authorization },
  } = req;


  if (authorization/*  && authorization.split(" ")[0] === "Token" */) {

    return authorization/* .split(" ")[1]; */
  }
  return null;
};

const auth = {
  required: expressjwt({
    secret: "secret",
    getToken: getTokenFromHeaders,
    algorithms: ["HS256"],
  }),
  optional: expressjwt({
    secret: "secret",
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ["HS256"],
  }),
};
console.log(auth.required, '33333333333333333')

export default auth;
