
import express from 'express'
import proxy from 'express-http-proxy'
import path from 'path'
import bodyParser from 'body-parser'
import {user, order, station, rfid} from './routes/index'




const app = express();
app.use(express.static(path.join(__dirname, '../../client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', user)
app.use('/api/order', order)
app.use('/api/station', station)
app.use('/api/rfid', rfid)




app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'../client/build/index.html'));
});


app.use(function (err, req, res, next) {
  //console.error(err.stack)
  res.status(500).send('Something broke!'+err)
})

export default app