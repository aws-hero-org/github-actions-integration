import * as cdk from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class GithubActionsIntegrationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const templateBucket = new Bucket(this, 'template-bucket', {})

    new cdk.CfnOutput(this, 'template-bucket-arn', {
      value: templateBucket.bucketArn
    })

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'GithubActionsIntegrationQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
