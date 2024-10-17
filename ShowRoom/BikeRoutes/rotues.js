import express from 'express'; 
import { getAllItems,addItem, addItems, sellItems, restockItem} from '../BikeControllers/controller.js'; 

const router = express.Router(); 

router.get('/', getAllItems);  
router.post('/', addItem); 
router.post('/item', addItems);
router.put('/sell/:_id', sellItems); 
router.put('/restock/:_id', restockItem);


export default router;