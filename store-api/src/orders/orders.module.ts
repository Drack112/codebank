import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';

import { join } from 'path';

import { PaymentService } from './payment/payment.service';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product]),
    ClientsModule.registerAsync([
      {
        name: 'PAYMENT_PACKAGE',
        useFactory: () => ({
          transport: Transport.GRPC,
          options: {
            url: process.env.GRPC_HOST,
            package: 'payment',
            protoPath: join(__dirname, 'proto/payment.proto'),
          },
        }),
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, PaymentService],
})
export class OrdersModule {}
