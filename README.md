# Github Actions Integration
The scope of this repository is to investigate ways on how to deploy CDK with pipelines.

## Test integration of OIDC
The initial step is to test the authentication with AWS. Therefore, a simple example workflow is created that lists all buckets in the AWS account.

For the OIDC integration, there is a CDK stack that sets up required resources. (Tag v1.0.0)
```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GithubActionsIdentityProvider, GithubActionsRole } from 'aws-cdk-github-oidc';
import * as iam from 'aws-cdk-lib/aws-iam';
import { DefaultStackSynthesizer } from 'aws-cdk-lib';



export class OidcIntegrationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, );


    const provider = GithubActionsIdentityProvider.fromAccount(this, 'github-provider');

    const exampleRole = new GithubActionsRole(this, 'role', {
        provider: provider,
        owner: '***',
        repo: '***',
    });

    new cdk.CfnOutput(this, 'role-arn', {value: exampleRole.roleArn})
  }
}

```