import { lambdaToExpressAdapter } from '@app/http';
import express from 'express';
import cron from 'node-cron';
import { handler as statusHandler } from '../src/functions/status';
import { handler as getTransformedDataHandler } from '../src/functions/get-transformed-files';
import { FilesService } from '@services/files';
import { CacheService } from '@app/cache/cache.service';

const app = express();

app.get('/api/status', lambdaToExpressAdapter(statusHandler));
app.get('/api/files', lambdaToExpressAdapter(getTransformedDataHandler));

const PORT = 3000;

const updateCache = async () => {
  console.log('Preloading cache...');

  const filesService = new FilesService();
  const cacheService = new CacheService('file');

  const data = await filesService.getData();
  const transformedData = filesService.transformData(data);

  cacheService.save('transformed-data', transformedData);

  console.log('Cache loaded.');
};

updateCache().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
  });

  cron.schedule('* * * * *', updateCache);
});
