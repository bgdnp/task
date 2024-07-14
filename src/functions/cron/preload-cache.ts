import { CacheService } from '@app/cache';
import { FilesService } from '@services/files';

export const handler = async () => {
  console.log('Preloading cache...');

  const filesService = new FilesService();
  const cacheService = new CacheService(process.env.NODE_ENV === 'local' ? 'file' : 's3');

  const data = await filesService.getData();
  const transformedData = filesService.transformData(data);

  await cacheService.save('transformed-data', transformedData);

  console.log('Cache loaded.');
};
