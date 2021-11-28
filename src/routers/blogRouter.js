const router=require('express').Router();
const blogController=require('../controllers/blogController')


router.post('/',blogController.aramaYap);
router.get('/',blogController.tumMakaleleriGetir);
//router.get('/blog',blogController.tumMakaleleriGetir);
//router.get('/blog/:id',blogController.aramaYap);
router.get('/:id',blogController.tekMakaleGetir);


module.exports=router;