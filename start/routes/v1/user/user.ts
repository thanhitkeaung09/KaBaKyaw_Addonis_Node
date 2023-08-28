import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/auth/:auth_type/login', 'UsersController.login').as('user.login')
})
  .middleware('check.app.key')
  .namespace('App/Controllers/Http')
  .prefix('v1')
