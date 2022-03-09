import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EcoleModule } from './ecole/ecole.module';
import { FormationModule } from './formation/formation.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { MailModule } from './mail/mail.module';
import { StudentModule } from './student/student.module';
import { AffichesModule } from './affiches/affiches.module';
import { PartenairesModule } from './partenaires/partenaires.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { ChangelogModule } from './changelog/changelog.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://yacine:Dowi1234@staging.jchqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    EcoleModule,
    FormationModule,
    UserModule,
    AdminModule,
    MailModule,
    StudentModule,
    AffichesModule,
    PartenairesModule,
    BlogModule,
    AuthModule,
    ChangelogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
