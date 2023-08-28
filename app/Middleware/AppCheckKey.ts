import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApplicationCheckKey from 'App/Models/ApplicationCheckKey'

export default class AppCheckKey {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const appId = request.header('app-id')
    const appSecret = request.header('app-secret')

    if (!(appId && appSecret)) {
      return response.unauthorized({
        data: 'Unauthorized',
        message: false,
        status: 404,
      })
    }

    const key = await ApplicationCheckKey.query()
      .where('app_id', appId)
      .where('app_secret', appSecret)
      .where('obsolete', true)
      .first()

    if (!key) {
      return response.notAcceptable({
        data: 'Outdated',
        message: false,
        statu: 406,
      })
    }

    await next()
  }
}
