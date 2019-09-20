    
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
  if(params.valid === true){
    const responseJSON = {
      message: 'This request has the required parameters',
    };
    respondJSON(request, response, 200, responseJSON);
  }
  else{
    const responseJSON = {
      message: 'This request does not have the required parameters',
    };
    respondJSON(request, response, 400, responseJSON);
  }
  
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

};

module.exports = {
  success,
  badRequest,
  notFound,
};