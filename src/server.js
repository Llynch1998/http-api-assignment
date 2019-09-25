
const http = require('http'); // http module
const url = require('url'); // url module
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;


const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex, //gets the index page
    '/style.css': htmlHandler.getCSS,//this will get the css
    '/success': jsonHandler.success,
    notFound: jsonHandler.notFound,//default 404
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    notFound: jsonHandler.getUsersMeta,
  },
};


const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url)

  const type = request.headers.accept.split(',')[0]; //this gets the type by going into the request header, looking at the accept header, then splits the long string by the comma and grabs the first index (the most preffered request);
  const params = query.parse(parsedUrl.query)
  if(urlStruct[parsedUrl.pathname]){
    urlStruct[parsedUrl.pathname](request,response,type,params);//since two of the functions dont require type, it just ignores the 3rd param. thanks javascript
  }
  else{
    urlStruct.notFound(request,response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
