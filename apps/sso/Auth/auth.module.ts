import { JwtAuthModel, JwtAuthService, JwtAuthStrategy } from '@app/common/jwtAuth';
import { LocalAuthStrategy } from './strategy/localAuth.strategy';
import { AuthController } from './auth.controller';
import { EmailModule } from '@app/common/email';
import { RedisModule } from '@app/common/redis';
import { MysqlModel } from '@app/common/mysql';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { Users } from '@app/mysql';

@Module({
  imports: [
    JwtAuthModel,
    // redis
    RedisModule,
    // email
    EmailModule,
    // mysql
    MysqlModel.feature(Users),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthService,
    JwtAuthStrategy,
    LocalAuthStrategy,
  ],
})
export class AuthModule {}