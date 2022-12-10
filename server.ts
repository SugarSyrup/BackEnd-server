import express, { Express, Request, Response } from "express";
// import path from "path";
// import cors from "cors";

// import "./src/db.js";
// import "./src/getApi.js";

// import {getFoodInfoFromCode, getHumanFlag} from './src/getApi.js';

import authRouter from "./src/routers/authRouter";

// import FoodList from "./src/modules/FoodList.js";
// import FoodInfo from './src/modules/FoodInfo.js';
// import HumanFlag from "./src/modules/HumanFlag.js";

// const __dirname = path.resolve();
const app:Express = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
// app.use(cors({
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Credentials': 'true',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
//     'Access-Control-Allow-Headers': 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json',
//     'origin': "*",
//     'credentials': 'true',
// }));
// app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/auth', authRouter);

app.get("/", ( req:Request, res:Response ) => {
    res.send("Footritions BackEnd Server");
});

// app.get("/api/getFoodList", async (req, res) => {
//     const foodDatas = await FoodList.find();
//     var foods = {};
//     foodDatas.forEach((foodData) => {
//         const foodName = foodData.foodName;
//         const foodCode = foodData.foodCode;
//         foods[foodName] = foodCode;
//     });
//     res.json({foods});
// })

// app.post("/api/getFoodResource", async (req, res) => {
//     const {body: {foodCode}} = req;
//     getFoodInfoFromCode(foodCode);
//     setTimeout(async ()=> {
//         const data = await FoodInfo.findOne({ foodCode });
//         res.json({data});    
//     },2000)
// })
// const data = await FoodInfo.findOne({ foodCode: "D287021"});
// console.log(data);

// app.post("/api/getUserInfo", async (req,res) => {
//     const {body :{age, gender}} = req;
//     const Age = getHumanFlag(age);
//     const data = await HumanFlag.findOne({Age, gender});
//     res.json({data});
// })


app.listen(PORT, function() {
    console.log("Server is Now Running : http://localhost:8080");
});