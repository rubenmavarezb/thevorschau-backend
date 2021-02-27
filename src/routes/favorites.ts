import express from 'express';
////////////////////////////////////////////////////////////
import { addToFavorites, getFavorites, updateItemInFavorites, deleteItemInFavorites } from '../controllers/favoritesController';
////////////////////////////////////////////////////////////

const favoritesRoute = express.Router();

favoritesRoute.post('/',
    addToFavorites
);

favoritesRoute.get('/',
    getFavorites
);

favoritesRoute.put('/:id',
    updateItemInFavorites
);

favoritesRoute.delete('/:id',
    deleteItemInFavorites
);



export default favoritesRoute;