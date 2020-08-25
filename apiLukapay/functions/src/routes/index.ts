import express from 'express';
// tslint:disable-next-line: no-implicit-dependencies
import { UserRoute} from '@routes/user.route';
// tslint:disable-next-line: no-implicit-dependencies
import { ContactRoute} from '@routes/contact.route';
export const router = express.Router();

/**
 * user Routing
 */ 
router.get('/users',UserRoute.instance.get);
router.post('/users',UserRoute.instance.post);
router.put('/users/:id',UserRoute.instance.update);
router.delete('/users/:id',UserRoute.instance.delete);
router.get('/users/:id',UserRoute.instance.getOne);


/**
 * contact Routing
 */ 
router.get('/contacts',ContactRoute.instance.get);
router.post('/contacts',ContactRoute.instance.post);
router.put('/contacts/:id',ContactRoute.instance.update);
router.delete('/contacts/:id',ContactRoute.instance.delete);
router.get('/contacts/:id',ContactRoute.instance.getOne);


/**
 * produit Routing
 */ 
// router.get('/categorie',CategorieRoute.instance.get);
// router.post('/categorie',CategorieRoute.instance.post);
// router.get('/categorie/:id',CategorieRoute.instance.get);
// router.delete('/categorie/:id',CategorieRoute.instance.delete);
// router.put('/categorie',CategorieRoute.instance.update);