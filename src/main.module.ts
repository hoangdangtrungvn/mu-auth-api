import { Module } from '@nestjs/common'
import { AppModules } from './app'

@Module({
  imports: [...AppModules],
  providers: [],
})
export class MainModule {}
