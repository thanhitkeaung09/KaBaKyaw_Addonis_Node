import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ApiSuccessResponse from 'App/Responses/ApiSuccessResponse'
import SocialService from 'App/Services/SocialService'

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
    return new SocialService().login(response, auth, payload)
  }

  /**
   * User Logout
   */
  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return new ApiSuccessResponse().toResponse(response, 'Logout Successfully')
  }
}
