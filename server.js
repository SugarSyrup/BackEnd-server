import express from "express";
import path from "path";
import cors from "cors";

import "./src/db.js";
import "./src/getApi.js";

import {getFoodInfoFromCode, getHumanFlag} from './src/getApi.js';

// import { authService } from './src/fbInstance.js';
// import {signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider} from'firebase/auth';

import FoodList from "./src/modules/FoodList.js";
import FoodInfo from './src/modules/FoodInfo.js';
import HumanFlag from "./src/modules/HumanFlag.js";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
    console.log("/");
});

// app.post("/auth/login", async (req,res) => {
//     const {body : {username, password}} = req;
//     const data = await signInWithEmailAndPassword(authService, username, password);
//     res.json({data});
// });

// app.post("/auth/join", async (req, res) => {
//     const {body: {username, password}} = req;
//     const data = await createUserWithEmailAndPassword(authService, username, password);
//     res.json({data});
// })

// app.post("/auth/oauth/google", async (req, res) => {
//     const provider = new GoogleAuthProvider();
//     const data = await signInWithPopup(authService, provider);
//     res.json({data});
// })

// app.post("/auth/logout", (req, res) => {
//     authService.signOut();
// })

app.get("/api/getFoodList", async (req, res) => {
    const foodDatas = await FoodList.find();
    var foods = {};
    foodDatas.forEach((foodData) => {
        const foodName = foodData.foodName;
        const foodCode = foodData.foodCode;
        foods[foodName] = foodCode;
    });
    res.json({foods});
})

app.post("/api/getFoodResource", async (req, res) => {
    const {body: {foodCode}} = req;
    await getFoodInfoFromCode(foodCode);
    const data = await FoodInfo.findOne({ foodCode });
    // console.log(data);
    res.json({data});    
})
// const data = await FoodInfo.findOne({ foodCode: "D287021"});
// console.log(data);

app.post("/api/getUserInfo", async (req,res) => {
    const {body :{age, gender}} = req;
    const Age = getHumanFlag(age);
    const data = await HumanFlag.findOne({Age, gender});
    res.json({data});
})


app.listen(PORT, function() {
    console.log("Server is Now Running : http://localhost:3000");
});