[![Build Status](https://travis-ci.org/innowatio/iwwa-lambda-answers-aggregator.svg?branch=master)](https://travis-ci.org/innowatio/iwwa-lambda-answers-aggregator)
[![Dependency Status](https://david-dm.org/innowatio/iwwa-lambda-answers-aggregator.svg)](https://david-dm.org/innowatio/iwwa-lambda-answers-aggregator)
[![devDependency Status](https://david-dm.org/innowatio/iwwa-lambda-answers-aggregator/dev-status.svg)](https://david-dm.org/innowatio/iwwa-lambda-answers-aggregator#info=devDependencies)
[![codecov.io](https://codecov.io/github/innowatio/iwwa-lambda-answers-aggregator/coverage.svg?branch=master)](https://codecov.io/github/innowatio/iwwa-lambda-answers-aggregator?branch=master)

# Lambda Answers Aggregator

Save app answers on MongoDB.

## Deployment

This project deployment is automated with Lambdafile. For more info [`lambda-boilerplate`](https://github.com/lk-architecture/lambda-boilerplate/).

### Configuration

The following environment variables are needed to configure the function:

- `MONGODB_URL` __string__ *required*: URL of the MongoDB endpoint
- `DEBUG` __boolean__ *optional*: set to `true` if you want more log from [`kinesis-router`](https://github.com/lk-architecture/kinesis-router/).

### Run test

In order to run tests locally a MongoDB instance and a `MONGODB_URL` environment
param are needed.
Then, just run `npm run test` command.
