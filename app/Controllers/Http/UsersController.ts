import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  /**
   * User Login
   * @param param request , response , auth
   * @returns token
   */
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
      const userExists = await User.query().where('email', payload.email).first()
      if (!userExists) {
        const user = await new User()
        user.name = payload.name
        user.email = payload.email
        user.phone = payload.phone
        user.socialId = payload.social_id
        user.type = payload.type
        user.image = payload.image
        user.deviceToken = payload.device_token
        const data = await user.save()
        const token = await auth.use('api').generate(data)
        return response.json({
          data: token.token,
          message: true,
          status: 200,
        })
      }
      const token = await auth.use('api').generate(userExists)
      return response.json({
        data: token.token,
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

  /**
   * User Logout
   */
  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return response.json({
      data: 'Logout Successfully',
      message: true,
      status: 200,
    })
  }
}
