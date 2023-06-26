

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

  function handleAddTenant(request, response) {
    request.client.saveTenant(request.body,function(error, grpcResponse) {
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

  function handleSaveUser(request, response) {
    request.client.saveUser(request.body,function(error, grpcResponse) {
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

  function handleSaveFolder(request, response) {
    const cookieUserId = request.cookies['userId'];
    const cookieUserEmail = request.cookies['userEmail'];
    request.body.userId = cookieUserId;
    request.body.userEmail = cookieUserEmail;

    request.client.saveFolder(request.body,function(error, grpcResponse) {
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



  function handleGetFolder(request, response) {
    const cookieUserId = request.cookies['userId'];
    const cookieUserEmail = request.cookies['userEmail'];
    request.body.userId = cookieUserId;
    request.body.userEmail = cookieUserEmail;

    request.client.getUserFolder(request.body,function(error, grpcResponse) {
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


  module.exports = { handleRequest, handleAllTenantRequest,handleAddTenant, handleSaveUser, handleSaveFolder, handleGetFolder};