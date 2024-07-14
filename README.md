# Task

Task was to create api enpoint which should fetch data from external api which look like this:

```json
{
  "items": [
    { "fileUrl": "http://34.8.32.234:48183/SvnRep/ADV-H5-New/README.txt" },
    { "fileUrl": "http://34.8.32.234:48183/SvnRep/ADV-H5-New/VisualSVN.lck" },
    { "fileUrl": "http://34.8.32.234:48183/SvnRep/ADV-H5-New/hooks-env.tmpl" },
    { "fileUrl": "http://34.8.32.234:48183/SvnRep/AT-APP/README.txt" },
    { "fileUrl": "http://34.8.32.234:48183/SvnRep/AT-APP/VisualSVN.lck" },
    { "fileUrl": "http://34.8.32.234:48183/SvnRep/AT-APP/hooks-env.tmpl" },
    { "fileUrl": "http://34.8.32.234:48183/SvnRep/README.txt" },
    { "fileUrl": "http://34.8.32.234:48183/SvnRep/VisualSVN.lck" },
    { "fileUrl": "http://34.8.32.234:48183/SvnRep/hooks-env.tmpl" },
    { "fileUrl": "http://34.8.32.234:48183/www/README.txt" },
    { "fileUrl": "http://34.8.32.234:48183/www/VisualSVN.lck" },
    { "fileUrl": "http://34.8.32.234:48183/www/hooks-env.tmpl" }
  ]
}
```

And return transformed data that looks like this:

```json
{
  "34.8.32.234": [
    {
      "SvnRep": [
        {
          "ADV-H5-New": ["README.txt", "VisualSVN.lck", "hooks-env.tmpl"]
        },
        {
          "AT-APP": ["README.txt", "VisualSVN.lck", "hooks-env.tmpl"]
        },
        "README.txt",
        "VisualSVN.lck",
        "hooks-env.tmpl"
      ]
    },
    {
      "www": ["README.txt", "VisualSVN.lck", "hooks-env.tmpl"]
    }
  ]
}
```

Problem is that external api takes about 10 seconds to respond, and it returns a large dataset which also take some time to transform

## Solution

Solution is designed as serverless api running on AWS. To tackle the problem of slow data loading and transformation, API relies on caching. Mechanism to periodically update cache is implemented, so endpoint will (apart from initial request after deployment) always load the transformed data from cache.
API uses S3 bucket for caching purposes when running in the cloud and file system when running locally, but it is easily extendable to accept different strategies (in memory, redis etc).

### Codebase structure

- `/infra` contains CDK infrastructure code for api deployment
- `/scripts` contains helper scripts for building, deploying and running local dev server
- `/src` contains api source code
  - `/src/app` application layer, holds non business related logic like http and cache handling...
  - `/src/common` code shared between app layers like config, constants, exceptions...
  - `/src/services` business logic services
  - `/src/functions` api entry points, lambda functions

### Local development

Inside `/scripts/dev.ts` is a small express setup which mimics how api should work in a cloud. To run it first install dependencies with `npm install` and start it with `npm run dev`.

### Cloud environment

Or you can also check it on [https://bluegrid.bgdn.dev/api/files](https://bluegrid.bgdn.dev/api/files).
