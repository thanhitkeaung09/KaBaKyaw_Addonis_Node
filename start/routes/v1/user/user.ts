import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  /**
   * User Google Login
   */
  Route.post('/auth/:auth_type/login', 'UsersController.login').as('user.login')

  /**
   * User Logout
   */
  Route.get('/auth/logout', 'UsersController.logout').as('user.logout').middleware('auth:api')
})
  .namespace('App/Controllers/Http')
  .prefix('v1')
  .middleware('check.app.key')
