
const http = require('http'); //http module
const url = require('url'); //url module
const htmlHandler = require('./htmlResponses.js'); 
const jsonHandler = require('./jsonResponses.js'); 

const port = process.env.PORT || process.env.NODE_PORT || 3000;


const urlStruct = {
  'GET': {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': jsonHandler.getUsers,
    '/updateUser': jsonHandler.updateUser,
    notFound: jsonHandler.notFound,
  },
  'HEAD': {
    '/getUsers': jsonHandler.getUsersMeta,
    notFound: jsonHandler.getUsersMeta,
  },
};


const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  
  if(urlStruct[request.method][parsedUrl.pathname]){
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);