import express, { request, response } from "express";
import {Server} from "socket.io";


const PORT = 8080
const expressApp = express()
const httpServer = expressApp.listen(PORT, () => {
    console.table({
        'Game': `http://localhost:${PORT}/game`,
        'Controller': `http://localhost:${PORT}/controller`
    })

})
const io = new Server(httpServer, {path: '/real-time'})

expressApp.use('/game', express.static('public-game'))
expressApp.use('/controller', express.static('public-controller'))
expressApp.use(express.json())

/*___________________________________________

1) Create the socket methods to listen the events and emit a response
It should listen for directions and emit the incoming data.
_____________________________________________ */

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('instruction-move', movement =>{
        console.log(movement);
        socket.broadcast.emit('execute-move', movement);
    });
    socket.on('stop-move',stop=>{
        console.log(stop);
        socket.broadcast.emit('execute-stop',stop)
    });
});
let currentScore = 0;

/*___________________________________________

2) Create an endpoint to POST player's current score and print it on console
_____________________________________________ */

expressApp.post('/score', (request, response) => {
    let addpoint=request.body
    currentScore += addpoint
   console.log(currentScore);
})
//me falta hacer que sume bien pero ya f
/*___________________________________________

3) Create an endpoint to GET player's final score and print it on canvas
_____________________________________________ */

expressApp.get('/final-score', (request, response) => {
    //aquí debo crear un fetch que finiquite el proceso trayendo el total de puntos para luego pedirlos en el sketch game
})