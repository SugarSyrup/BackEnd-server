import mongoose from 'mongoose';

mongoose.pluralize(null);
const HumanFlagSchema = new mongoose.Schema({
    gender : {type:String},
    Age : {type:Number},
    energy : {type:Number},
    carbohydrate : {type:Number},
    fibtg : {type:Number},
    ntrfs : {type:Number},
    prot : {type:Number},
});

const HumanFlag = mongoose.model("flag", HumanFlagSchema);
export default HumanFlag;