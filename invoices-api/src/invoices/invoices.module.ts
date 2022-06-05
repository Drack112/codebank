import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Invoice } from './entities/invoice.entity';

import { CreditCardsController } from './credit-cards.controller';
import { CreditCardsService } from './credit-cards.service';
import { CreditCard } from './entities/credit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard, Invoice])],
  controllers: [InvoicesController, CreditCardsController],
  providers: [InvoicesService, CreditCardsService],
})
export class InvoicesModule {}
