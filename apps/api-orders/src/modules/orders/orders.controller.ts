import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { TokenPayload } from '../auth/auth.service';
import { OrderIdParamsDto } from './dto/order-params.dto';

@UseGuards(AuthGuard)
@Controller('order')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() request: Request<TokenPayload>,
  ) {
    const client_id = request.params.user.sub;
    return this.service.create(createOrderDto, client_id);
  }

  @Get()
  findAll(@Req() request: Request<TokenPayload>) {
    return this.service.findAll(request.params.user.sub);
  }

  @Get(':id')
  findOne(
    @Param()
    params: OrderIdParamsDto,
  ) {
    return this.service.findOne(params.id);
  }
}
