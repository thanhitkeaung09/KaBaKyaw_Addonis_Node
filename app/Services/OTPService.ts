import Otp from 'App/Models/Otp'
import User from 'App/Models/User'
import ApiErrorResponse from 'App/Responses/ApiErrorResponse'
import ApiSuccessResponse from 'App/Responses/ApiSuccessResponse'
import { v4 as uuidv4 } from 'uuid'

export default class OTPService {
  public async confirm(request, response, auth) {
    const image = request.file('image')
    const name = `${uuidv4()}.${image?.extname}`
    const path = 'kabakyawAdonis/user'
    image?.moveToDisk(path, { name: name }, 's3')
    const code = request.body().code
    var confirm = await Otp.query().where('code', code).first()
    var oldUser = await User.query().where('email', request.body().email).first()
    const email = request.body().email
    if (new Date() > confirm?.expiredAt) {
      // return 'code is expired'
      return new ApiSuccessResponse().toResponse(response, 'Code is Expired')
    } else {
      if (confirm?.code) {
        if (oldUser) {
          return new ApiSuccessResponse().toResponse(response, 'User already Exists')
        } else {
          // const user = new User()
          const user = await User.create({
            name: request.body().name,
            email: request.body().email,
            password: request.body().password,
            image: path,
            type: 'gmail',
          })
          // .save()
          const token = await auth.use('api').generate(user)
          return new ApiSuccessResponse().toResponse(response, token.token)
        }
      } else {
        return new ApiErrorResponse().toResponse(response, 'Code does not match')
      }
    }
  }
}
