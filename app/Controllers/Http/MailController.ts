import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Otp from 'App/Models/Otp'
import { DateTime } from 'luxon'

export default class MailController {
  public async register({ request }: HttpContextContract) {
    const newPostSchema = schema.create({
      name: schema.string(),
      email: schema.string(),
      password: schema.string(),
      image: schema.file(),
    })

    const payload = await request.validate({ schema: newPostSchema })
    const email = payload.email
    const code = this.generate_otp()
    // return code
    const otp = new Otp()
    otp.email = email
    otp.code = await code
    otp.expiredAt = DateTime.now().plus({ minutes: 1 })
    const otpObj = await otp.save()
    // to start here

    const mail = request.input('email')
    await Mail.send(async (message) => {
      message
        .from(Env.get('MAIL_FROM_ADDRESS'))
        .to(mail)
        .subject('Welcome Ga Ba Kyaw Adonis JS')
        .htmlView('emails/welcome', {
          user: { code: await code },
          // url: 'https://your-app.com/verification-url',
        })
    })
    return 'Mail is successfully sent'
    // const image = request.file('image')
    // const path = 'GaBaKyaw/userprofile'
    // const name = `${uuidv4()}.${image?.extname}`
    // await image?.moveToDisk(path, { name: name }, 's3')
    // return 'Profile Image is successfully uploaded'
    // const newPostSchema = schema.create({
    //   name: schema.string(),
    //   email: schema.string(),
    //   password: schema.string(),
    //   image: schema.file(),
    // })
    // const payload = await request.validate({ schema: newPostSchema })
    // return payload
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
