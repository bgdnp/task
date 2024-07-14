import { lambdaToExpressAdapter } from '@app/http';
import express from 'express';
import cron from 'node-cron';
import { handler as statusHandler } from '../src/functions/status';
import { handler as getTransformedDataHandler } from '../src/functions/get-transformed-files';
import { handler as preloadCacheHandler } from '../src/functions/cron/preload-cache';

const app = express();

app.get('/api/status', lambdaToExpressAdapter(statusHandler));
app.get('/api/files', lambdaToExpressAdapter(getTransformedDataHandler));

const PORT = 3000;

preloadCacheHandler().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
  });

  cron.schedule('* * * * *', preloadCacheHandler);
});
