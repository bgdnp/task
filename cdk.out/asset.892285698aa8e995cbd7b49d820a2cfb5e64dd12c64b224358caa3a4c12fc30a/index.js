"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/functions/status.ts
var status_exports = {};
__export(status_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(status_exports);

// src/app/http/handlers.ts
function createLambdaHandler(handler2) {
  return () => __async(this, null, function* () {
    return yield handler2();
  });
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
var handler = createLambdaHandler(() => __async(void 0, null, function* () {
  return Response.ok({ status: "ok" });
}));
