import { Module } from '@nestjs/common'
import { ConfigModules } from './configs'
import { AppModules } from './app'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './app/auth/jwt.guard'

@Module({
  imports: [...ConfigModules, ...AppModules],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class MainModule {}
