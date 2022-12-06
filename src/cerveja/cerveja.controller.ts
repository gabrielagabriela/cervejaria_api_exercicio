import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Cerveja } from './cerveja.entity';
import { CervejaService } from './cerveja.service';
@Controller('cervejas')
export class CervejaController {
  constructor(private service: CervejaService) {}

  @Get()
  public async buscarCervejas(
    @Query('page') page = 0,
    @Query('size') size = 10,
  ) {
    return await this.service.buscarCervejas(page, size);
  }

  @Post()
  public async criarCerveja(@Body() cerveja: Cerveja): Promise<NestResponse> {
    const cervejaCriada = await this.service.criarCerveja(cerveja);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/cervejas/${cervejaCriada.nome}` })
      .withBody(cervejaCriada)
      .build();
  }
}
