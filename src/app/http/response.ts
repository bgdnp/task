import { HttpCode } from '@common/enums';

export class Response {
  static success(status: HttpCode, body: Record<string, any>): Http.Result {
    return {
      statusCode: status,
      body: JSON.stringify(body),
    };
  }

  static ok(body: Record<string, any>): Http.Result {
    return this.success(HttpCode.OK, body);
  }
}
