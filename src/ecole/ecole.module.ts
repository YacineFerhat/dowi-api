import { Module } from '@nestjs/common';
import { EcoleService } from './ecole.service';
import { EcoleController } from './ecole.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ecole, EcoleSchema } from './entities/ecole.entity';
import { MailModule } from 'src/mail/mail.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [EcoleController],
  providers: [EcoleService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Ecole.name,
        schema: EcoleSchema,
      },
    ]),
    AuthModule,
    MailModule,
  ],
})
export class EcoleModule {}
