//Call back
//1. Function used as a parameter
// Higher order function : primary function that has callback function as an argument

//2. Async task completion --> function call

//call back hell 

import fs from 'fs';

fs.readFile('users.json','utf8',(error,data)=>{
    if(error) console.log(error);
    console.log(data);

    fs.readFile("posts.json","utf8",(perrror,pdata)=>{
        if(perrror) console.log(perrror);
        console.log(pdata);

        fs.readFile("comments.json","utf8",(cerror,cdata)=>{
            if(cerror) console.log(cerror);
            console.log(cdata);        
        })
    })

})