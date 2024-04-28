import express from 'express';
import auth from "./routes/auth";
import passport from 'passport';
import session from 'cookie-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectionDB from './routes/dbConnection'
import dbScoreRoutes from "./routes/dbScoreRoutes";
import { WebSocketServer } from 'ws'
import http from "http";

const app = express();

connectionDB;

const server = http.createServer( app );
const socketServer = new WebSocketServer({ server });
const clients: import("ws")[] = [];
socketServer.on( 'connection', client => {
    console.log( 'connect!' )

    // when the server receives a message from this client...
    client.on( 'message', msg => {
        // send msg to every client EXCEPT the one who originally sent it
        clients.forEach( c => { if( c !== client ) c.send( msg ) })
    })

    // add client to client list
    clients.push( client )
})

app.use(express.json());

//sessions middleware
app.use(session({
    secret: 'react-game',

    httpOnly: true,
    secure: false,
    maxAge: 24*60*60*1000 //for one day

}));

//set passport middleware
app.use(passport.initialize());
app.use(passport.session());

//app.use(cors({ maxAge: 84600 }));
app.use(
    cors({
        origin: "http://localhost:3000", // React app's origin
        credentials: true,
    })
)
app.use(bodyParser.json());

app.use("/api/dbScoreRoutes", dbScoreRoutes);
app.use("/api/auth", auth);



server.listen( 5000 );
export default app;