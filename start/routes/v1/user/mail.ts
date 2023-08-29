import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/mail/login', 'MailController.register')
})
  .prefix('v1')
  .middleware('check.app.key')
  .namespace('App/Controllers/Http')
