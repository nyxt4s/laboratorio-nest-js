import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.services';
import { Cat } from './Cat';

@Controller()
export class CatsController {
  constructor(private readonly CatsService: CatsService) {}

  @Get()
  findALL(): Cat[] {
    return this.CatsService.findAll();
  }
}