import { verifyJWT } from "../utils/jwt.js";

function auth(req,res,next) {
  console.log("Auth middleware called...");
  const cookie = req.headers.cookie;

  if(!cookie) return res.status(401).json("User not authenticated.");
  const authToken = cookie.split('=')[1];
  console.log(`authToken in middleware: ${authToken}`);

  verifyJWT(authToken)
    .then((data)=>{
      req.user = data;
      console.log("Verified JWT Token data: ", data);
      next();
    })
    .catch(()=>{
      res.status(401).send("Invalid token");
    })


}

export default auth
