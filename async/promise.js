// resolve - success
// reject - failure

import { error } from "console"
import fs from "fs/promises"

fs.readFile("users.json","utf8")
.then((data)=>{
    console.log(data);

    return fs.readFile("posts.json","utf8");
}).then((data)=>{
    console.log(data);

    return fs.readFile("comments.json","utf8");
}).then((data)=>{
    console.log(data);
})
. catch((error)=>console.log(error));