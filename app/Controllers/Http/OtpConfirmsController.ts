import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OTPService from 'App/Services/OTPService'
import OTPServiceCodeResend from 'App/Services/OTPServiceCodeResend'
import '../Http/MailController'
export default class OtpConfirmsController {
  public async confirm({ request, response, auth }: HttpContextContract) {
    return new OTPService().confirm(request, response, auth)
  }

  public async resend({ request, response }) {
    return new OTPServiceCodeResend().resend(request, response)
  }
}
