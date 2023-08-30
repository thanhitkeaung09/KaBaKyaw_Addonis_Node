import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ApiSuccessResponse from 'App/Responses/ApiSuccessResponse'
import MailService from 'App/Services/MailService'

export default class MailController {
  public async register({ request, response }: HttpContextContract) {
    const newPostSchema = schema.create({
      name: schema.string(),
      email: schema.string(),
      password: schema.string(),
      image: schema.file(),
    })
    const payload = await request.validate({ schema: newPostSchema })
    const code = this.generate_otp()
    return new MailService().mail(payload, code, request, response)
  }

  public async login({ request, auth, response }) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password)
      return new ApiSuccessResponse().toResponse(response, token.token)
    } catch (error) {
      return new ApiSuccessResponse().toResponse(response, error.responseText)
    }
  }

  public async generate_otp() {
    const otpLength = 6
    // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000)
    return otp.toString()
  }

  public async addMinutes(date, minutes) {
    date.setMinutes(date.getMinutes() + minutes)
    return date
  }
}
