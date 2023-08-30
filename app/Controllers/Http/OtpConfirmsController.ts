import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Otp from 'App/Models/Otp'
import ApiErrorResponse from 'App/Responses/ApiErrorResponse'
import ApiSuccessResponse from 'App/Responses/ApiSuccessResponse'
import OTPService from 'App/Services/OTPService'
import { DateTime } from 'luxon'
import '../Http/MailController'
import MailController from '../Http/MailController'
import OTPServiceCodeResend from 'App/Services/OTPServiceCodeResend'
export default class OtpConfirmsController {
  public async confirm({ request, response, auth }: HttpContextContract) {
    return new OTPService().confirm(request, response, auth)
  }

  public async resend({ request, response }) {
    return new OTPServiceCodeResend().resend(request, response)
  }
}
