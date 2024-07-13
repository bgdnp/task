#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiStack } from '../infra/stacks';

const app = new cdk.App();

new ApiStack(app, 'FilesTransformerApi', { env: { region: 'eu-central-1' } });
