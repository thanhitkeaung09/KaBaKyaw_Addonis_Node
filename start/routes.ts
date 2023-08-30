/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

import Ws from 'App/Services/Ws'
import './routes/v1/user/mail'
import './routes/v1/user/otp'
import './routes/v1/user/user'

Route.get('/socket', async function ({ view }) {
  return view.render('emails/welcome')
})

Route.get('/myevent', async function ({ view }) {
  return view.render('secondeventlisten/listen')
})

Route.post('/socket', async function () {
  Ws.io.emit('new:user', { username: 'virk' })
  return 'Emitted an event'
})
