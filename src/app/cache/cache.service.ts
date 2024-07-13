import { FileStrategy } from './strategies/file.strategy';
import { S3Strategy } from './strategies/s3.strategy';
import { CacheStrategy } from './strategies/strategy.interface';

export class CacheService {
  private strategy: CacheStrategy;
  private ttl?: number;

  constructor(strategy: 's3' | 'file', ttl?: number) {
    switch (strategy) {
      case 's3':
        this.strategy = new S3Strategy();
        break;
      case 'file':
        this.strategy = new FileStrategy();
        break;
      default:
        this.strategy = new FileStrategy();
    }

    this.ttl = ttl;
  }

  async save<T>(key: string, data: T): Promise<void> {
    return await this.strategy.save(key, data);
  }

  async load<T>(key: string): Promise<T | null> {
    return await this.strategy.load(key, this.ttl);
  }
}
