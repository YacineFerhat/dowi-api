import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Ecole } from 'src/ecole/entities/ecole.entity';
import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  spam = async () => {
    await this.mailerService.sendMail({
      to: 'yacine.frhat@gmail.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: "let's have fun",
      template: './spam', // `.hbs` extension is appended automatically
      context: {},
    });
  };
  async sendUserConfirmation(user: Ecole | Student | User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        name: user.name,
        url,
      },
    });
  }

  async ecoleCreation(
    name: string,
    email: string,
    password: string,
    alias: string,
  ) {
    const url =
      process.env.NODE_ENV !== 'production'
        ? `http://localhost:3000/Validation/${alias}`
        : 'http://productionLink.com/';
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Création de votre compte sur dowi',
      template: './ecoleCreation', // `.hbs` extension is appended automatically
      context: {
        url,
        name,
        alias,
        password,
        number: process.env.Number,
      },
    });
  }

  async studentCreation(email: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Création de votre compte sur dowi',
      template: './studentCreation', // `.hbs` extension is appended automatically
      context: {},
    });
  }

  async adminCreation(email: string, password: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Création de votre compte sur dowi',
      template: './adminCreation', // `.hbs` extension is appended automatically
      context: {
        password,
      },
    });
  }

  async contactUs(email: string, cours: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Information sur le cours',
      template: './contactUs', // `.hbs` extension is appended automatically
      context: {
        cours,
      },
    });
  }

  async ecoleContact(email: string, student: string, cours: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: "Demande de contact au sujet d'un cours",
      template: './ecoleContact', // `.hbs` extension is appended automatically
      context: {
        cours,
        student,
      },
    });
  }

  async ecoleCommander(email: string, student: string, cours: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: "Commande d'un cours",
      template: './ecoleCommander', // `.hbs` extension is appended automatically
      context: {
        cours,
        student,
      },
    });
  }

  async contactSchool(email: string, student: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Prise de contact au sujet de votre école',
      template: './ecoleContactFull', // `.hbs` extension is appended automatically
      context: {
        student,
      },
    });
  }
}
