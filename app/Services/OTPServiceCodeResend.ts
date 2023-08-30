import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import MailController from 'App/Controllers/Http/MailController'
import Otp from 'App/Models/Otp'
import ApiErrorResponse from 'App/Responses/ApiErrorResponse'
import ApiSuccessResponse from 'App/Responses/ApiSuccessResponse'
import { DateTime } from 'luxon'

export default class OTPServiceCodeResend {
  public async resend(request, response) {
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
      return new ApiSuccessResponse().toResponse(response, 'Code is resend successfully')
    } else {
      return new ApiErrorResponse().toResponse(response, 'User does not exists')
    }
  }
}
