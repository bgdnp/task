import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { IResource, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { resolve } from 'path';

export class ApiStack extends Stack {
  private gateway: RestApi;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.gateway = new RestApi(this, 'Gateway');

    this.createStatusEndpoint();
    this.createFilesEndpoint();
  }

  private createStatusEndpoint() {
    const lambda = new Function(this, 'StatusFunction', {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset(resolve(process.cwd(), 'dist/status')),
      handler: 'index.handler',
      functionName: 'status-handler',
      environment: {
        NODE_ENV: 'cloud',
      },
    });

    const api = this.getResource('api', this.gateway.root);
    const status = this.getResource('status', api);

    status.addMethod('get', new LambdaIntegration(lambda));
  }

  private createFilesEndpoint() {
    const lambda = new Function(this, 'FilesFunction', {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset(resolve(process.cwd(), 'dist/get-transformed-files')),
      handler: 'index.handler',
      functionName: 'files-handler',
      timeout: Duration.seconds(30),
      memorySize: 1024,
      environment: {
        NODE_ENV: 'cloud',
      },
    });

    const api = this.getResource('api', this.gateway.root);
    const files = this.getResource('files', api);

    files.addMethod('get', new LambdaIntegration(lambda));
  }

  private getResource(name: string, parent: IResource) {
    let resource = parent.getResource(name);

    if (!resource) {
      resource = parent.addResource(name);
    }

    return resource;
  }
}
