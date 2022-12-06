import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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

  @Delete(':nomeCerveja')
  @HttpCode(204)
  public async apagar(@Param('nomeCerveja') nome: string) {
    const cerveja = await this.service.getCerveja(nome);

    if (!cerveja) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Cerveja não encontrada',
      });
    }

    await this.service.apagarCerveja(nome);
  }

  @Put(':nomeCerveja')
  public async updateCerveja(
    @Param('nomeCerveja') nome: string,
    @Body() body: Cerveja,
  ): Promise<NestResponse> {
    const cervejaUp = this.service.updateCerveja(nome, body);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({})
      .withBody(cervejaUp)
      .build();
  }
}
