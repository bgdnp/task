import { mkdir, readFile, writeFile } from 'fs/promises';
import { CacheStrategy } from './strategy.interface';
import { resolve } from 'path';
import { existsSync } from 'fs';

export class FileStrategy implements CacheStrategy {
  async save<T>(key: string, data: T) {
    const cacheDir = resolve(process.cwd(), 'cache');

    if (!existsSync(cacheDir)) {
      await mkdir(cacheDir);
    }

    await writeFile(resolve(cacheDir, key), JSON.stringify(data));
  }

  async load<T>(key: string): Promise<T | null> {
    const path = resolve(process.cwd(), 'cache', key);

    if (!existsSync(path)) {
      return null;
    }

    const file = await readFile(path);
    const json = file.toString();

    return JSON.parse(json);
  }
}
