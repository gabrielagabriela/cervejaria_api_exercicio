import { Module } from '@nestjs/common';
import { CervejaController } from './cerveja.controller';
import { CervejaService } from './cerveja.service';

@Module({
  controllers: [CervejaController],
  providers: [CervejaService],
})
export class CervejaModule {}
