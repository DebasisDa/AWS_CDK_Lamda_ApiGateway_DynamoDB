import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

//Package for rest api
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { App, Stack } from 'aws-cdk-lib';
import { MockIntegration, PassthroughBehavior, RestApi, TokenAuthorizer, Cors} from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class AwsCdkLamdaApiGatewayDynamoDbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Rest API
    const APIGateway = new RestApi(this, 'APIGateway', {
    });
    APIGateway.root.addMethod('GET');


    const usersResource = APIGateway.root.addResource("users");
   
    const lamdaListUsers = new lambda.Function(this, 'lamdaListUsers', {
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: 'index.handler',
      code: lambda.AssetCode.fromAsset(path.join(__dirname, '.')),
    })

    usersResource.addMethod('GET', new apigateway.LambdaIntegration(lamdaListUsers));

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsCdkLamdaApiGatewayDynamoDbQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
