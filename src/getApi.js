import request from 'request';
import request_promise from 'request-promise';
import convert from 'xml-js';

import dotenv from 'dotenv';
dotenv.config();

import FoodList from './modules/FoodList.js';
import FoodInfo from './modules/FoodInfo.js';
import HumanFlag from './modules/HumanFlag.js';

const getFoodList = async () => {
        var url = 'http://apis.data.go.kr/1390802/AgriFood/MzenFoodCode/getKoreanFoodList';
        var queryParams = '?' + encodeURIComponent('serviceKey') + process.env.EXPORT_API_SECRETKEY; 
        var foodsCount = 0;

        await request_promise({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            foodsCount = JSON.parse(convert.xml2json(body, {compact: true , spaces: 4}))['response']['body']['total_Count']['_text'];
        });

        queryParams += '&' + encodeURIComponent('Page_Size') + '=' + encodeURIComponent(foodsCount); 

        request({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            if(error){
                console.log(error);
            }
            console.log('Reponse received');
            const foodList = JSON.parse(convert.xml2json(body, {compact: true , spaces: 4}))['response']['body']['items']['item'];
            // const largeNames = new Set();
            // const middleNames = new Set();
            const allfoods = {};
            var count = 0;
            foodList.forEach(async (food, index) => {
                setTimeout(async () => {
                    count += 1;
                    // largeNames.add(food.large_Name["_text"]);
                    // middleNames.add(food.middle_Name["_text"]);
                    allfoods[food.food_Name["_text"]] = food.food_Code["_text"];
                    // await FoodList.create({
                    //     foodName : food.food_Name["_text"],
                    //     foodCode : food.food_Code["_text"],
                    // });
                    setFoodInfoList(food.food_Code["_text"]);
                },2000*index);
            })    
        });
}
//getFoodList();
const setFoodInfoList = async(foodCode) => {
    var url = 'http://apis.data.go.kr/1390802/AgriFood/MzenFoodNutri/getKoreanFoodIdntList';
    var queryParams = '?' + encodeURIComponent('serviceKey') + process.env.EXPORT_API_SECRETKEY + '&' + encodeURIComponent('food_Code') + '=' + foodCode;
    
    request({
        url: url + queryParams,
        method: 'GET'
    }, async function (error, response, body) {
        try{
            if(error){
                console.log(error);
            }
            const foodName = JSON.parse(convert.xml2json(body, {compact: true , spaces: 4}))['response']['body']['items']['item']['main_Food_Name']["_text"];
            const foodList = JSON.parse(convert.xml2json(body, {compact: true , spaces: 4}))['response']['body']['items']['item']['idnt_List'];

            let energy =0;
            let prot = 0;
            let carbohydrate = 0;
            let ntrfs = 0;
            let fibtg = 0;

        
            // if(foodList.length === 1) {
                energy += Number(foodList["energy_Qy"]["_text"]);
                prot += Number(foodList["prot_Qy"]["_text"]);
                carbohydrate += Number(foodList["carbohydrate_Qy"]["_text"]);
                ntrfs += Number(foodList["ntrfs_Qy"]["_text"]);
                fibtg += Number(foodList["fibtg_Qy"]["_text"]);
            // } else {
            //     foodList.forEach(async (food) => {
            //         energy += Number(food["energy_Qy"]["_text"]);
            //         prot += Number(food["prot_Qy"]["_text"]);
            //         carbohydrate += Number(food["carbohydrate_Qy"]["_text"]);
            //         ntrfs += Number(food["ntrfs_Qy"]["_text"]);
            //         fibtg += Number(food["fibtg_Qy"]["_text"]);
            //     })
            // }
            console.log(foodName, foodCode);
            await FoodInfo.create({
                foodName, foodCode, energy, prot ,carbohydrate ,ntrfs ,fibtg
            })
        } catch (e) {
            console.log(e);
        }        
    });
}

export const getFoodInfoFromCode = async (food_code) => {
    const data = await FoodInfo.findOne({foodCode:food_code});
    if(data !== null) {
        return ;
    }
    else {
        var url = 'http://apis.data.go.kr/1390802/AgriFood/MzenFoodNutri/getKoreanFoodIdntList';
        var queryParams = '?' + encodeURIComponent('serviceKey') + process.env.EXPORT_API_SECRETKEY + '&' + encodeURIComponent('food_Code') + '=' + food_code; 

        request({
            url: url + queryParams,
            method: 'GET'
        }, async function (error, response, body) {
            if(error){
                console.log(error);
            }
            console.log('Reponse received');
            const foodName = JSON.parse(convert.xml2json(body, {compact: true , spaces: 4}))['response']['body']['items']['item']['main_Food_Name']["_text"];
            const foodList = JSON.parse(convert.xml2json(body, {compact: true , spaces: 4}))['response']['body']['items']['item']['idnt_List'];

            let energy =0;
            let prot = 0;
            let carbohydrate = 0;
            let ntrfs = 0;
            let fibtg = 0;

            //console.log(foodList);
            try{
                if(foodList.length === 1) {
                    energy += Number(foodList["energy_Qy"]["_text"]);
                    prot += Number(foodList["prot_Qy"]["_text"]);
                    carbohydrate += Number(foodList["carbohydrate_Qy"]["_text"]);
                    ntrfs += Number(foodList["ntrfs_Qy"]["_text"]);
                    fibtg += Number(foodList["fibtg_Qy"]["_text"]);
                } else {
                    foodList.forEach(async (food) => {
                        energy += Number(food["energy_Qy"]["_text"]);
                        prot += Number(food["prot_Qy"]["_text"]);
                        carbohydrate += Number(food["carbohydrate_Qy"]["_text"]);
                        ntrfs += Number(food["ntrfs_Qy"]["_text"]);
                        fibtg += Number(food["fibtg_Qy"]["_text"]);
                    })
                }
            } catch (e) {
                console.log(e);
            }
            await FoodInfo.create({
                foodName, foodCode:food_code, energy,prot ,carbohydrate ,ntrfs ,fibtg
            })
        });
    }
}

export const getHumanFlag = (age) => {
    let Age = 0;
    if(age <= 1) Age = 1;
    else if(age <= 2) Age = 2;
    else if(age <= 5) Age = 5;
    else if(age <= 8) Age = 8;
    else if(age <= 11) Age = 11;
    else if(age <= 14) Age = 14;
    else if(age <= 18) Age = 18;
    else if(age <= 29) Age = 29;
    else if(age <= 49) Age = 49;
    else if(age <= 64) Age = 64;

    return Age;
}