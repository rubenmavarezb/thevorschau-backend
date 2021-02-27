import Favorites from '../models/Favorites';
import { Request, Response } from 'express';
//////////////////////////////////////////////////////


export const getFavorites = async (req: Request, res: Response) => {
    console.log('Desde getFavorites');
    console.log(req.body)
}

export const addToFavorites = async (req: Request, res: Response) => {
    console.log('Desde addToFavorites');
    console.log(req.body)
}

export const updateItemInFavorites = async (req: Request, res: Response) => {
    console.log('Desde updateItemInFavorites');
    console.log(req.body)
}

export const deleteItemInFavorites = async (req: Request, res: Response) => {
    console.log('Desde deleteItemInFavorites');
    console.log(req.body)
}