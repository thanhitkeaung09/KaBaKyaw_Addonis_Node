import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Otp from 'App/Models/Otp'
import User from 'App/Models/User'
import ApiErrorResponse from 'App/Responses/ApiErrorResponse'
import ApiSuccessResponse from 'App/Responses/ApiSuccessResponse'
import { DateTime } from 'luxon'

export default class MailService {
  public async mail(payload, code, request, response) {
    const email = payload.email
    const check = await User.query().where('email', email).first()
    if (!check) {
       const otp = new Otp()
      otp.email = email
      otp.code = await code
      otp.expiredAt = DateTime.now().plus({ minutes: 1 })
      const otpObj = await otp.save()

      const mail = request.input('email')
        await Mail.send(async (message) => {
          message
            .from(Env.get('MAIL_FROM_ADDRESS'))
            .to(mail)
            .subject('Welcome Ga Ba Kyaw Adonis JS')
            .htmlView('emails/welcome', {
              user: { code: await code },
            })
        })
        return new ApiSuccessResponse().toResponse(response, 'Mail is successfully sent')
    }
    return new ApiErrorResponse().toResponse(response,"User already exists")

}
