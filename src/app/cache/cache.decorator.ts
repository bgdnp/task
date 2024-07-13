import { CacheService } from './cache.service';

type CacheProps = {
  strategy: 'file';
  key: string;
};

export function Cache(props: CacheProps) {
  const cache = new CacheService(props.strategy);

  return function <TMethod extends Function>(target: TMethod) {
    return async function (this: any, ...args: any[]) {
      let data = await cache.load(props.key);

      if (!data) {
        data = await target.call(this, ...args);
        await cache.save(props.key, data);
      }

      return data;
    } as unknown as TMethod;
  };
}
