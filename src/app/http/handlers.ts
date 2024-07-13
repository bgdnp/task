export function createLambdaHandler(handler: Http.Handler): Http.LambdaHandler {
  return async () => {
    return await handler();
  };
}
