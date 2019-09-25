
const respond = (request,response,status,data,type) =>{
  response.writeHead(status, {'Content-Type':type});
  response.write(data);
  response.end();
}

const success = (request, response, type) => {
  if(type === 'text/xml'){
    let responseXML = '<response>';
    responseXML += '<message>This is a successful response.</message>';
    responseXML += '</response>';
    //send back xml
    //return
    return respond(request, response, 200, responseXML, 'text/xml')
  }
  //send back json
  const responseJSON = {
    message: 'This is a successful response',
  };
  let stringifiedJSON = JSON.stringify(responseJSON)

  return respond(request, response, 200, responseJSON, 'application/JSON');
};

const badRequest = (request, response, type, params) => {
  if(!params.valid || params.valid !== true){
    //send a 400
  }
  //send back a 200 in either xml or json
  
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

const unauthorized = (request, response, params) => {
  if(params.loggedIn === "yes"){
    responseJSON = {
      messsage: 'You have access',
      id: 'unauthorized',
    }
    respondJSON(request, response, 200, responseJSON);
  }
  else{
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'unauthorized',
    };
    respondJSON(request, response, 401, responseJSON);
  }
  
}

const forbidden = (request, response) =>{
  const responseJSON = {
    message: '403 Forbidden',
    id: 'forbidden',
  };
  respondJSON(request, response, 403, responseJSON);
}

module.exports = {
  success,
  badRequest,
  notFound,
};