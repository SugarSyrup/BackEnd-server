import mongoose from 'mongoose';

const FoodListSchema = new mongoose.Schema({
    foodName: {type:String},
    foodCode: {type:String},
});

const FoodList = mongoose.model("FoodList", FoodListSchema);
export default FoodList;