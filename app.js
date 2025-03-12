import http from 'http';

const PORT = 5000;

const app = http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type':'text/html'});

    if(request.url == '/'){
        return response.end('<h1>Welcome to my home page</h1>');
    }else if (request.url == '/about'){
        return response.end('<h1>About us</h1>');
        }else if(request.url == '/contact'){
            return response.end('<h1>Contact us</h1>');
        }else if(request.method == 'POST'){
            return response.end('<h1>You have sent a POST request</h1>');
            }else{
                return response.end('<h1>404 Not Found</h1>');
            }
    response.end("<h1>HomePage</h1>");
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})