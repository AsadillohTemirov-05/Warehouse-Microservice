import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class SessionService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async setSession(userId: string, token: string, ttl: number = 604800): Promise<void> {
    await this.redis.setex(`session:${userId}`, ttl, token);
  }

  async getSession(userId: string): Promise<string | null> {
    return this.redis.get(`session:${userId}`);
  }

  async deleteSession(userId: string): Promise<void> {
    await this.redis.del(`session:${userId}`);
  }

  async isSessionValid(userId: string, token: string): Promise<boolean> {
    const savedToken = await this.getSession(userId);
    return savedToken === token;
  }
}