import express from 'express';
import { CategorieRoute } from './categorie.route';
import { ProduitRoute } from '@routes/produit.route';
export const router = express.Router();

/**
 * produit Routing
 */ 
router.get('/produit',ProduitRoute.instance.get);
router.post('/produit',ProduitRoute.instance.post);
router.get('/produit/:id',ProduitRoute.instance.get);
router.delete('/produit/:id',ProduitRoute.instance.delete);
router.put('/produit',ProduitRoute.instance.update);


/**
 * produit Routing
 */ 
router.get('/categorie',CategorieRoute.instance.get);
router.post('/categorie',CategorieRoute.instance.post);
router.get('/categorie/:id',CategorieRoute.instance.get);
router.delete('/categorie/:id',CategorieRoute.instance.delete);
router.put('/categorie',CategorieRoute.instance.update);