import Store from '../BikeModel/model.js'  

//Get the all items(display) 

export const getAllItems= async(req,res)=>{
   try{
     const storeItem = await Store.find(); 
     res.status(200).json(storeItem)
   }catch(error){
     res.status(500).json({message: 'Server Error', error: error.message })
   }
}

//Post call the add new items  

export const addItem = async(req,res)=>{
    console.log("post call recieved")
    const {name,stock,price} = req.body 
    try{
      const newItem = new Store({
        name,
        stock,
        price,
      }); 
      const newItemSave = await newItem.save(); 
      res.status(201).json(newItemSave);
    }catch(error){
        res.status(500).json({message: 'server error', error: error.message})
    }
}

//Multiple item post 
export const addItems = async (req, res) => {
    const items = req.body; 
    try {
        
        const newItems = await Store.insertMany(items);
        res.status(200).json(newItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//selling items from store 
export const sellItems = async(req,res)=>{
    try{
      const soldItem = await Store.findById(req.params._id); 
      if(!soldItem) return res.status(404).json({message: 'Item not found'})
      
        if(soldItem.stock > 0){
            soldItem.stock -= 1; 
            const itemSoldOut = await soldItem.save(); 
            res.json(itemSoldOut);
        }else{
            res.status(400).json({ message: 'Out of stock' });
        }
    }catch(error){
       res.status(500).json({message: 'Server Error', error: error.message}); 
    }
}

//restock  increased 

export const restockItem = async(req,res)=>{
    const {stock} = req.body; 

    try{
      const itemAdd = await Store.findById(req.params._id);
      if (!itemAdd) {
        return res.status(404).json({ message: 'Item not found' });  
      }

      itemAdd.stock += stock; 

      const stockItemAdd = await itemAdd.save(); 
      res.json(stockItemAdd);
    }catch(error){
      res.status(500).json({message: 'Server Error', error: error.message})
    }
}