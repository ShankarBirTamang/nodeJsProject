import path from 'path';

const filePath = "folder1/folder2/folder3/file.txt";

//basename()
console.log(path.basename(filePath));

//dirname()
console.log(path.dirname(filePath));

//extname()
console.log(path.extname(filePath));

//parse
console.log(path.parse(filePath));