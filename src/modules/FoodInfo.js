import mongoose from 'mongoose';

const FoodInfoSchema = new mongoose.Schema({
    foodName: {type:String},
    foodCode: {type:String},
    energy : {type:Number},
    prot : {type:Number},
    carbohydrate : {type:Number},
    ntrfs : {type:Number},
    fibtg : {type:Number}
});

const FoodInfo = mongoose.model("foodinfos", FoodInfoSchema);
export default FoodInfo;