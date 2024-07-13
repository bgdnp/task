// src/app/http/handlers.ts
function createLambdaHandler(handler2) {
  return async () => {
    return await handler2();
  };
}

// src/app/http/response.ts
var Response = class {
  static success(status, body) {
    return {
      statusCode: status,
      body: JSON.stringify(body)
    };
  }
  static ok(body) {
    return this.success(200 /* OK */, body);
  }
};

// src/functions/status.ts
var handler = createLambdaHandler(async () => {
  return Response.ok({ status: "ok" });
});
export {
  handler
};
