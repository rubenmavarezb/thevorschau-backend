import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
///////////////////////////////////////
import usersRoute from './routes/users';
import authRoute from './routes/auth';
///////////////////////////////////////

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.set('PORT', process.env.PORT || 4000)

app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

//Init app
app.listen(app.get('PORT'), '0.0.0.0', () => {
    console.log(`server is running in http://localhost:${app.get('PORT')}`)
})