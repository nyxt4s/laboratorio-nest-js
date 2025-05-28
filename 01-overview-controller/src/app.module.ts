import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController], // Registering the CatsController in the module
  // The AppService is a provider that can be injected into controllers or other providers.
  providers: [AppService],
})
export class AppModule {}
