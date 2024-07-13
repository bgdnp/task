export function createLambdaHandler(handler: Http.Handler): Http.LambdaHandler {
  return async () => {
    return await handler();
  };
}

export function createExpressHandler(handler: Http.Handler): Http.ExpressHandler {
  return (req, res) => {
    handler().then((result) => {
      res.status(result.statusCode).json(result.body);
    });
  };
}

export function lambdaToExpressAdapter(handler: Http.LambdaHandler): Http.ExpressHandler {
  return (req, res) => {
    handler({} as Http.LambdaEvent).then((result) => {
      res.status(result.statusCode).contentType('application/json').send(result.body);
    });
  };
}
