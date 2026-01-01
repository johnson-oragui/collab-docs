import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  NODE_ENV: string | undefined;
  constructor(private readonly configService: ConfigService) {
    this.NODE_ENV = this.configService.get<string>('NODE_ENV');
  }
  async hash(plain: string): Promise<string> {
    return argon2.hash(plain, {
      type: argon2.argon2id,
      memoryCost: this.NODE_ENV === 'development' ? 2 ** 12 : 2 ** 16, //64 mb
      timeCost: this.NODE_ENV === 'development' ? 1 : 3,
      parallelism: 1,
    });
  }

  async verify(hash: string, plain: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }
}
