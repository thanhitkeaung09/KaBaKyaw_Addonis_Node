import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  /**
   * G Mail Register
   */
  Route.post('/mail/register', 'MailController.register')

  /**
   * G Mail Login
   */
  Route.post('/mail/login', 'MailController.login')
})
  .prefix('v1')
  .middleware('check.app.key')
  .namespace('App/Controllers/Http')
