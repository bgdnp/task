import { createLambdaHandler, Response } from '@app/http';
import { FilesService } from '@services/files';

export const handler = createLambdaHandler(async () => {
  const service = new FilesService();

  const data = await service.getTransformedData();

  return Response.ok(data);
});
