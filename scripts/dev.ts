import { lambdaToExpressAdapter } from '@app/http';
import express from 'express';
import { handler as statusHandler } from '../src/functions/status';

const app = express();

app.get('/api/status', lambdaToExpressAdapter(statusHandler));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`);
});
