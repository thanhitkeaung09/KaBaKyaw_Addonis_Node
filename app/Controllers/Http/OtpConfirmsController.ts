import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Otp from 'App/Models/Otp'
import { DateTime } from 'luxon'
import '../Http/MailController'
import MailController from '../Http/MailController'
export default class OtpConfirmsController {
  public async confirm({ request, response }: HttpContextContract) {
    const code = request.body().code
    const confirm = await Otp.query().where('code', code).first()
    if (new Date() > confirm?.expiredAt) {
      return 'code is expired'
    } else {
      return 'code is valid'
    }
  }

  public async resend({ request }) {
    const mail = request.body().mail
    const user = await Otp.query().where('email', mail).first()
    if (user) {
      const mail = new MailController()
      const newCode = await mail.generate_otp()
      user.code = newCode
      user.expiredAt = DateTime.now().plus({ minutes: 1 })
      await user.save()
      await Mail.send(async (message) => {
        message
          .from(Env.get('MAIL_FROM_ADDRESS'))
          .to(user.email)
          .subject('Welcome Ga Ba Kyaw Adonis JS')
          .htmlView('emails/resend', {
            user: { new_code: await newCode },
          })
      })
      return 'OTP Code is resend'
    } else {
      return 'user does not exist'
    }
  }
}
