// resolve - success
// reject - failure
/*
A Promise in Node.js is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. 
It is used to handle asynchronous operations more efficiently than callbacks.

Key Features of Promises
Pending – The initial state, before the operation completes or fails.
Fulfilled – The operation completed successfully, and the promise has a resolved value.
Rejected – The operation failed, and the promise has a reason for the failure.
*/

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