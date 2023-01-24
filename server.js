var http = require('http');

let data = [
  {
    "id": 100,
    "name": "Abhishek",
    "isComplete": true
  },
  {
    "id": 101,
    "name": "XYZ",
    "isComplete": false
  }
];

http.createServer((request,response)=>{
  if(request.url==='/'){
    response.write(`${response.statusCode}`);
  }
  else if(request.url==='/tasks'){
    data.forEach((element)=>{
      response.write(JSON.stringify(element));
    });
  }
  else if(request.url==='/tasks?isComplete=true'){
    data.forEach((element)=>{
      if(element.isComplete){
        response.write(JSON.stringify(element));
      }
    });
  }
  response.end();
}).listen(3000);