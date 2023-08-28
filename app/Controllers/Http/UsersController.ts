import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async login({ request, response, auth }: HttpContextContract) {
    const newPostSchema = schema.create({
      name: schema.string(),
      email: schema.string(),
      phone: schema.string(),
      social_id: schema.string(),
      type: schema.string(),
      image: schema.string(),
      device_token: schema.string(),
    })

    const payload = await request.validate({ schema: newPostSchema })
    try {
      const user = new User()
      user.name = payload.name
      user.email = payload.email
      user.phone = payload.phone
      user.socialId = payload.social_id
      user.type = payload.type
      user.image = payload.image
      user.deviceToken = payload.device_token
      await user.save()
      const token = await auth.use('api').generate(user)
      return response.json({
        data: token.tokenHash,
        message: true,
        status: 200,
      })
    } catch (error) {
      return response.unauthorized({
        data: error,
        message: false,
        status: 404,
      })
    }
  }
}
