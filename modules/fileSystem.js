import fs from 'fs';

//Synchronous methods
//1.Read
// const result = fs.readFileSync('data.txt','utf8');
// console.log(result);

// const image = fs.readFileSync("image.png","base64");
// console.log(image);

//2.Write
// fs.writeFileSync('data.txt','This file is newly returned','utf8');

//3.Update
// fs.appendFileSync('data.txt','\nThis text is updated without removing existing value','utf8');

//4.Delete
// fs.rmSync('data.txt');



// // ASYNCHRONOUS METHOD
// //1.Read
//  fs.readFile('data.txt','utf8',(error,data)=>{
//    if(error) console.log(error);
//    else console.log(data);

// });
//  console.log("Hello World");

//  //2.Write
//  fs.writeFile('data.txt','this data is newly written asynchronously',()=>{
//     console.log("File written successfully");
//  })

// //3.Updata
// fs.appendFile('data.txt','\nThis text is updated without removing existing value',()=>{
//     console.log("appended successfully")});

// //4.Delete
// fs.rm();