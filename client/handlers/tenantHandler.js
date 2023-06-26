

function handleRequest(req, response) {
    req.client.sayHello({name: "Jaga"}, function(error, grpcResponse) {
            if (error) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Internal Server Error');
                return;
            }        
            const responseData = { message: grpcResponse.message };
            const responseBody = JSON.stringify(responseData);
        
            response.setHeader('Content-Type', 'application/json');
            response.end(responseBody);
        });
  }

  function handleAllTenantRequest(req, response) {
    req.client.getAllTenants({},function(error, grpcResponse) {
            if (error) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Internal Server Error');
                return;
            }        
            const responseBody = JSON.stringify(grpcResponse);
        
            response.setHeader('Content-Type', 'application/json');
            response.end(responseBody);
        });
  }
  
  



  module.exports = { handleRequest, handleAllTenantRequest };