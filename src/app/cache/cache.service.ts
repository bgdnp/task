import { FileStrategy } from './strategies/file.strategy';
import { CacheStrategy } from './strategies/strategy.interface';

export class CacheService {
  private strategy: CacheStrategy;

  constructor(strategy: 'file') {
    switch (strategy) {
      case 'file':
      default:
        this.strategy = new FileStrategy();
    }
  }

  async save<T>(key: string, data: T): Promise<void> {
    return await this.strategy.save(key, data);
  }

  async load<T>(key: string): Promise<T | null> {
    return await this.strategy.load(key);
  }
}
