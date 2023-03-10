let http = require('http');

const { parse } = require('querystring');

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
  else if((request.url==='/tasks')&&(request.method==='GET')){
    data.forEach((element)=>{
      response.write(JSON.stringify(element));
    });
  }
  else if((request.url==='/tasks?isComplete=true')&&(request.method==='GET')){
    data.forEach((element)=>{
      if(element.isComplete){
        response.write(JSON.stringify(element));
      }
    });
  }
  else if((request.url.includes('/tasks'))&&(request.method==='DELETE')){
    let urlTree = (request.url.split('/'));
    let id = parseInt(urlTree[urlTree.length-1]);
    let bufferData= [];
    data.forEach((element)=>{
      if(element.id!==id){
        bufferData.push(element);
      }
    });
    data=bufferData;
    data.forEach((element)=>{
      response.write(JSON.stringify(element));
    });
  }
  else if((request.url==='/tasks')&&(request.method==='POST')){
    request.on('data', chunk => {
      data.push(JSON.parse(chunk));
    });
    request.on('end',()=>{
      console.log(data);
    });
  }
  else if((request.url.includes('/tasks'))&&(request.method==='PATCH')){
    let body=[];
    let urlTree = (request.url.split('/'));
    let id = parseInt(urlTree[urlTree.length-1]);
    request.on('data',chunk=>{
      body.push(JSON.parse(chunk));
    });
    request.on('end',()=>{
      data.forEach((element)=>{
        if(element.id===id){
          Object.keys(body[0]).forEach((key)=> {
            element[key]=body[0][key];
            console.log(element);
          });
        }
      });
      console.log(body);
    });
  }
  response.end();
}).listen(3000);