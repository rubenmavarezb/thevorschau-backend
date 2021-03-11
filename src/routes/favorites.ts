import express from 'express';
////////////////////////////////////////////////////////////
import { addToFavorites, getFavorites, deleteItemInFavorites, deleteFavorites } from '../controllers/favoritesController';
////////////////////////////////////////////////////////////

const favoritesRoute = express.Router();

favoritesRoute.post('/',
    addToFavorites
);

favoritesRoute.get('/',
    getFavorites
);

favoritesRoute.put('/:id',
    deleteItemInFavorites
);

favoritesRoute.delete('/:id',
    deleteFavorites
)



export default favoritesRoute;