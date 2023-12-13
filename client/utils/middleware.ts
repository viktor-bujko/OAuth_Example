const unknownEndpoint = (request, response) => {
    return response
        .status(404)
        .send({ 
            error: "unknown endpoint"
        });
}

const errorHandler = (error, request, response, next) => {

  switch (error.name) {
    case "CastError": return response
        .status(400)
        .json({ 
            error: "malformatted id" 
        });
    case "ValidationError": return response
        .status(400)
        .json({ 
            error: error.message 
        });
    default: break
  }

  next(error)
}

const middleware = {
  unknownEndpoint,
  errorHandler
}

export default middleware;