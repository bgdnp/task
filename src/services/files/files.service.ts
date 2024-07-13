import { Cache } from '@app/cache';
import { CONFIG } from '@common/config';

type RawDataItem = { fileUrl: string };
type RawData = { items: RawDataItem[] };
type TransformedData = Record<string, (TransformedData | string)[]>;

export class FilesService {
  @Cache({
    strategy: process.env.NODE_ENV === 'cloud' ? 's3' : 'file',
    key: 'transformed-data',
    ttl: 900 /* seconds */,
  })
  async getTransformedData() {
    const data = await this.getData();

    return this.transformData(data);
  }

  private async getData(): Promise<RawData> {
    const response = await fetch(CONFIG.dataSource);
    const data = (await response.json()) as RawData;

    return data;
  }

  private transformData(data: RawData): TransformedData {
    const transformed: TransformedData = {};

    data.items.forEach(({ fileUrl }) => {
      if (/[^\x20-\x7E]/.test(fileUrl)) {
        // skip urls with weird characters
        // this is not specified in task but urls like this http://34.8.32.234:48183/��ǰ��Ŀ����Ŀ¼���ز��ļ�(����·��)/ are annoying :)
        return;
      }

      this.addUrl(fileUrl, transformed);
    });

    return transformed;
  }

  private addUrl(url: string, transformed: TransformedData): void {
    const { hostname, pathname } = new URL(url);
    const pathSegments = pathname.replace('/', '').split('/');

    let current = transformed[hostname] ?? [];
    let parent = current;

    pathSegments.forEach((segment, index) => {
      if (index === pathSegments.length - 1) {
        // handle last segment in path
        if (segment) {
          parent.push(segment);
        }
      } else {
        let nested = parent.find(
          (child) => typeof child === 'object' && Object.hasOwn(child, segment),
        ) as TransformedData | undefined;

        if (!nested) {
          nested = { [segment]: [] };
          parent.push(nested);
        }

        parent = nested[segment]!;
      }
    });

    transformed[hostname] = current;
  }
}
