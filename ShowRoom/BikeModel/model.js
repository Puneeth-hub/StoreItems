import mongoose from "mongoose"; 

const storeSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true,
    }, 
    stock:{
        type: Number, 
        required: true, 
        default:0,
    }, 
    price:{
        type: Number, 
        required: true,
    },

},{ timestamps: true }); 

const Store = mongoose.model("store", storeSchema); 

export default Store;