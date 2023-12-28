import { CommentsModule } from './comments/comments.module';
import { SettingsModule } from './settings/settings.module';
import { ArticleModule } from './article/article.module';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';

//
import { JwtAuthGuard, JwtAuthStrategy } from '@libs/jwtAuth';
import { TokenService } from './auth/token/token.service';
import { AppName, AppSystem, ConfigGlobal } from '@config';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '@libs/redis';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MysqlModel } from '@mysql';
import { UploadModule } from './upload/upload.module';
import { FolderModule } from './folder/folder.module';

@Module({
  imports: [
    // mysql
    MysqlModel.use(),
    // config
    ConfigGlobal.use(),
    // redis
    RedisModule.forRoot(undefined, true),
    // module
    CommentsModule,
    SettingsModule,
    ArticleModule,
    LoggerModule,
    UsersModule,
    FilesModule,
    AuthModule,
    UploadModule,
    FolderModule,
  ],
  providers: [
    JwtService,
    ConfigService,
    TokenService,
    JwtAuthStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {
  // pipes 管道验证
  public static pipesVerify: any;

  // api 版本
  public static version: string;

  // api 前缀
  public static prefix: string;

  // 服务端口
  public static port: number;

  constructor(private readonly configService: ConfigService) {
    const config = configService.get<AppSystem>(AppName);

    AppModule.port = config.port;

    AppModule.prefix = config.prefix;

    AppModule.version = config.version;

    AppModule.pipesVerify = config.pipes;
  }
}
