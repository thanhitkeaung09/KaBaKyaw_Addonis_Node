import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/otp/confirm', 'OtpConfirmsController.confirm')
    .as('otp.confirm')
    .prefix('v1')
    .namespace('App/Controllers/Http')
    .middleware(['check.app.key', 'auth:api'])
  /**
   * OTP Resend
   */
  Route.post('/otp/resend', 'OtpConfirmsController.resend')
    .as('otp.resend')
    .prefix('v1')
    .namespace('App/Controllers/Http')
    .middleware(['check.app.key', 'auth'])
})
