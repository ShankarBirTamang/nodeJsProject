// technique to handle promises

import fs from "fs/promises";

async function getAllData(){
    try {
        const users = await fs.readFile("users.json", "utf8");
        const posts = await fs.readFile("posts.json","utf8");
        const comments = await fs.readFile("comments.json","utf8");

        console.log(users);
        console.log(posts);
        console.log(comments);
    } catch (error) {
        console.log("something went wrong : ",error);
    } finally {
        console.log("this will run regardless of the outcome");
    }
}

getAllData();