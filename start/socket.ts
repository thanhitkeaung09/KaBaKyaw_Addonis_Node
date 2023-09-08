import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' })

  socket.on('myevent', (data) => {
    // socket.emit('myevent', data)
    socket.broadcast.emit('myevent', data)
    // Ws.io.emit('myevent', data)
    // const status = socket.emit('send:message', data)
    // console.log(status)
  })

  socket.on('secondEvent', (data) => {
    console.log(data)
    socket.broadcast.emit('secondEvent', data)
  })
})
