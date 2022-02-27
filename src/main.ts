import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { MainModule } from './main.module'

async function bootstrap() {
  const app = await NestFactory.create(MainModule)

  // Prefix
  app.setGlobalPrefix('v1')

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  // Enable CORS by whitelist origin
  app.enableCors({
    origin: (origin, callback) => {
      if (process.env.CORS_WHITELIST_ORIGINS.includes(origin)) {
        callback(null, true)
      } else {
        callback(null, false)
      }
    },
  })

  // Use helmet
  app.use(helmet())

  await app.listen(process.env.PORT || 5001)
}

bootstrap()
