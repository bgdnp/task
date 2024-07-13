import { lambdaToExpressAdapter } from '@app/http';
import express from 'express';
import { handler as statusHandler } from '../src/functions/status';
import { handler as getTransformedDatahandler } from '../src/functions/get-transformed-files';

const app = express();

app.get('/api/status', lambdaToExpressAdapter(statusHandler));
app.get('/api/files', lambdaToExpressAdapter(getTransformedDatahandler));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`);
});
