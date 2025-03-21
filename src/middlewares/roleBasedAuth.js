//use auth middleware before roleBasedAuth middleware

function roleBasedAuth(authRole) {
  return (req,res,next)=>{
    const user = req.user;
    if(user.role.includes(authRole))  next();
    else  return res.status(403).send(`Access Denied for : ${user.role}`);
  }
}

export default roleBasedAuth
