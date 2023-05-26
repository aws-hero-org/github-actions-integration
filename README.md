# Github Actions Integration
The scope of this repository is to investigate ways on how to deploy CDK with pipelines.

## Test integration of OIDC (v1.0.0)
The initial step is to test the authentication with AWS. Therefore, a simple example workflow is created that lists all buckets in the AWS account.

For the OIDC integration, there is a CDK stack that sets up required resources.
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

## Deploy CDK stack with Github Action (v2.0.0)
At this commit, it was possible to deploy CDK with github actions. Thefefore, the subsequent change of permissions was required

```typescript
const cdkDeploymentRole = new GithubActionsRole(
      this,
      "role",
      {
        provider: provider,
        owner: "***",
        repo: "***",
      }
    );

    new iam.ManagedPolicy(this, "deploy-cdk-policy", {
      roles: [cdkDeploymentRole],
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ["sts:AssumeRole"],
          resources: [`arn:aws:iam::${this.account}:role/cdk-*`],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ["s3:PutObject"],
          resources: ['arn:aws:s3::<>/*'],
        }),
      ],
    });
```