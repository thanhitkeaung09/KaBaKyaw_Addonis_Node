import Drive from '@ioc:Adonis/Core/Drive'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/image/*', async function ({ params, response }) {
  return response.stream(await Drive.getStream(params['*'].join('/')))
})
  .prefix('v1')
  .as('imageShow')
