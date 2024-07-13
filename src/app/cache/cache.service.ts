import { FileStrategy } from './strategies/file.strategy';
import { CacheStrategy } from './strategies/strategy.interface';

export class CacheService {
  private strategy: CacheStrategy;
  private ttl?: number;

  constructor(strategy: 'file', ttl?: number) {
    switch (strategy) {
      case 'file':
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
