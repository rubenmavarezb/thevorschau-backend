import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
///////////////////////////////////////
import usersRoute from './routes/users';
import helpersRoute from './routes/helpers';
import authRoute from './routes/auth';
import productsRoute from './routes/products';
import cartRoute from './routes/cart';
import favoritesRoute from './routes/favorites';
import orderRoute from './routes/order';
///////////////////////////////////////

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.set('PORT', process.env.PORT || 4000)

app.use('/api/users', usersRoute);
app.use('/api/helpers', helpersRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);
app.use('/api/favorites', favoritesRoute);
app.use('/api/orders', orderRoute);

//Init app
app.listen(app.get('PORT'), '0.0.0.0', () => {
    console.log(`server is running in ${app.get('PORT')}`)
})