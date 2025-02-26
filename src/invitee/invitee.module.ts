import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteeController } from './invitee.controller';
import { InviteeService } from './invitee.service';

import { Invitee, InviteeSchema } from '../schemas/invitee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
         name: Invitee.name, 
         schema: InviteeSchema 
      }
    ]),
  ],
  controllers: [InviteeController],
  providers: [InviteeService]
})
export class InviteeModule {}
