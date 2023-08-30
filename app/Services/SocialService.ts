import User from 'App/Models/User'
import ApiErrorResponse from 'App/Responses/ApiErrorResponse'
import ApiSuccessResponse from 'App/Responses/ApiSuccessResponse'

export default class SocialService {
  public async login(response, auth, payload) {
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
        return new ApiSuccessResponse().toResponse(response, token.token)
      }
      const token = await auth.use('api').generate(userExists)
      return new ApiSuccessResponse().toResponse(response, token.token)
    } catch (error) {
      return new ApiErrorResponse().toResponse(error)
    }
  }
}
