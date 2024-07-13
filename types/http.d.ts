declare namespace Http {
  type LambdaEvent = import('aws-lambda').APIGatewayProxyEventV2;
  type Result = Pick<import('aws-lambda').APIGatewayProxyStructuredResultV2, 'body' | 'statusCode'>;

  type Handler = () => Promise<Result>;
  type LambdaHandler = (event: LambdaEvent) => Promise<Result>;
}
