// import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from "fs"

//Add food items 
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true, message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// all food list
const listfood = async (req, res) => {
    try {
        const food = await foodModel.find({});
        res.json({success:true, data:food})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`upload/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}

const fake = async (req, res) => {
    // let foods=[];
    
    // for(let i=1;i<=32;i++){
    //     foods.push({
    //         name:"food_"+i,
    //         description:"description food number "+i,
    //         price: (Math.floor(Math.random() * (10 - 1 + 1)) + 1)*100,
    //         category:"fake",
    //         image:"food_"+i+".png"
    //     })
    // }
    // console.log(normalized_foods)
        res.json({success:true, message:"Food Added"})
    // try {
    //     await foodModel.insertMany(normalized_foods)
    //     res.json({success:true, message:"Food Added"})
    // } catch (error) {
    //     console.log(error)
    //     res.json({success:false, message:"Error",error:error})
    // }
}

function getRandomBetween(min, max) {
    // Ensure the min is less than the max
    return Math.round(Math.random() * (max - min) + min);
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        // Random index between 0 and i (inclusive)
        const randomIndex = Math.floor(Math.random() * (i + 1));
        
        // Swap the elements at the current index and the random index
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}

export {addFood, listfood, removeFood, fake}





// const fake = async (req, res) => {
//     // let foods=[];
    
//     // for(let i=1;i<=32;i++){
//     //     foods.push({
//     //         name:"food_"+i,
//     //         description:"description food number "+i,
//     //         price: (Math.floor(Math.random() * (10 - 1 + 1)) + 1)*100,
//     //         category:"fake",
//     //         image:"food_"+i+".png"
//     //     })
//     // }

//     let foods ={
//         "Noodles and Rice Dishes": [
//             {
//                 "name": "Nasi Goreng",
//                 "image": "nasi_goreng.jpg",
//                 "description": "Indonesian fried rice with spices, meat, and vegetables."
//             },
//             {
//                 "name": "Mi Goreng",
//                 "image": "mi_goreng.jpg",
//                 "description": "Stir-fried noodles with vegetables and proteins."
//             },
//             {
//                 "name": "Bihun Goreng",
//                 "image": "bihun_goreng.jpg",
//                 "description": "Fried rice vermicelli noodles with soy sauce and vegetables."
//             },
//             {
//                 "name": "Nasi Campur",
//                 "image": "nasi_campur.jpg",
//                 "description": "Mixed rice with various side dishes."
//             },
//             {
//                 "name": "Nasi Uduk",
//                 "image": "nasi_uduk.jpg",
//                 "description": "Coconut rice served with various sides."
//             },
//             {
//                 "name": "Nasi Kuning",
//                 "image": "nasi_kuning.jpg",
//                 "description": "Turmeric rice with side dishes."
//             },
//             {
//                 "name": "Ketupat",
//                 "image": "ketupat.jpg",
//                 "description": "Rice cakes boiled in woven palm leaves."
//             },
//             {
//                 "name": "Lontong",
//                 "image": "lontong.jpg",
//                 "description": "Rice cakes wrapped in banana leaves."
//             },
//             {
//                 "name": "Papeda",
//                 "image": "papeda.jpg",
//                 "description": "Sago porridge, a staple in eastern Indonesia."
//             },
//             {
//                 "name": "Nasi Padang",
//                 "image": "nasi_padang.jpg",
//                 "description": "Rice served with a variety of Padang-style dishes."
//             }
//         ],
//         "Soups and Stews": [
//             {
//                 "name": "Soto Ayam",
//                 "image": "soto_ayam.jpg",
//                 "description": "Chicken soup with turmeric, vermicelli, and vegetables."
//             },
//             {
//                 "name": "Soto Betawi",
//                 "image": "soto_betawi.jpg",
//                 "description": "Beef soup with coconut milk and spices."
//             },
//             {
//                 "name": "Gudeg",
//                 "image": "gudeg.jpg",
//                 "description": "Jackfruit stew with coconut milk."
//             },
//             {
//                 "name": "Gulai",
//                 "image": "gulai.jpg",
//                 "description": "Rich and spicy curry dish."
//             },
//             {
//                 "name": "Kalio",
//                 "image": "kalio.jpg",
//                 "description": "Thick, spicy curry similar to rendang."
//             },
//             {
//                 "name": "Kari Ayam",
//                 "image": "kari_ayam.jpg",
//                 "description": "Chicken curry with spices and coconut milk."
//             },
//             {
//                 "name": "Sop Buntut",
//                 "image": "sop_buntut.jpg",
//                 "description": "Oxtail soup with vegetables."
//             },
//             {
//                 "name": "Sayur Lodeh",
//                 "image": "sayur_lodeh.jpg",
//                 "description": "Vegetable soup with coconut milk."
//             },
//             {
//                 "name": "Sop Soprah",
//                 "image": "sop_soprah.jpg",
//                 "description": "Traditional Bugis soup with beef and spices."
//             },
//             {
//                 "name": "Sop Banyu",
//                 "image": "sop_banyu.jpg",
//                 "description": "Water-based soup with vegetables and meat."
//             }
//         ],
//         "Seafood": [
//             {
//                 "name": "Pempek",
//                 "image": "pempek.jpg",
//                 "description": "Fried fish cake served with spicy vinegar sauce."
//             },
//             {
//                 "name": "Ikan Bakar",
//                 "image": "ikan_bakar.jpg",
//                 "description": "Grilled fish with spicy seasoning."
//             },
//             {
//                 "name": "Gado-Gado",
//                 "image": "gado_gado.jpg",
//                 "description": "Vegetable salad with peanut sauce."
//             },
//             {
//                 "name": "Cakalang Fufu",
//                 "image": "cakalang_fufu.jpg",
//                 "description": "Smoked skipjack tuna."
//             },
//             {
//                 "name": "Ikan Asam Pedas",
//                 "image": "ikan_asam_pedas.jpg",
//                 "description": "Sour and spicy fish stew."
//             },
//             {
//                 "name": "Ikan Bakar Malabar",
//                 "image": "ikan_bakar_malabar.jpg",
//                 "description": "Grilled Malabar fish."
//             },
//             {
//                 "name": "Ikan Bakar Banyu",
//                 "image": "ikan_bakar_banyu.jpg",
//                 "description": "Grilled Banyu fish."
//             },
//             {
//                 "name": "Ikan Bakar Lilit",
//                 "image": "ikan_bakar_lilit.jpg",
//                 "description": "Grilled fish with Balinese spices."
//             },
//             {
//                 "name": "Ikan Bakar Balado",
//                 "image": "ikan_bakar_balado.jpg",
//                 "description": "Grilled fish with spicy Balado sauce."
//             },
//             {
//                 "name": "Ikan Bakar Jengkol",
//                 "image": "ikan_bakar_jengkol.jpg",
//                 "description": "Grilled fish with Jengkol beans."
//             }
//         ],
//         "Meat Dishes": [
//             {
//                 "name": "Rendang",
//                 "image": "rendang.jpg",
//                 "description": "Spicy and rich beef stew."
//             },
//             {
//                 "name": "Satay Ayam",
//                 "image": "satay_ayam.jpg",
//                 "description": "Grilled chicken skewers with peanut sauce."
//             },
//             {
//                 "name": "Satay Kambing",
//                 "image": "satay_kambing.jpg",
//                 "description": "Grilled goat skewers."
//             },
//             {
//                 "name": "Ayam Goreng",
//                 "image": "ayam_goreng.jpg",
//                 "description": "Fried chicken."
//             },
//             {
//                 "name": "Ayam Penyet",
//                 "image": "ayam_penyet.jpg",
//                 "description": "Smashed fried chicken with sambal."
//             },
//             {
//                 "name": "Ayam Bakar",
//                 "image": "ayam_bakar.jpg",
//                 "description": "Grilled chicken with spices."
//             },
//             {
//                 "name": "Dendeng Daging",
//                 "image": "dendeng_daging.jpg",
//                 "description": "Spicy and crispy beef slices."
//             },
//             {
//                 "name": "Bistik Jawa",
//                 "image": "bistik_jawa.jpg",
//                 "description": "Javanese-style beef steak."
//             },
//             {
//                 "name": "Semur",
//                 "image": "semur.jpg",
//                 "description": "Sweet soy-braised meat stew."
//             }
//         ],
//         "Vegetarian and Vegan": [
//             {
//                 "name": "Gado-Gado",
//                 "image": "gado_gado.jpg",
//                 "description": "Vegetable salad with peanut sauce."
//             },
//             {
//                 "name": "Karedok",
//                 "image": "karedok.jpg",
//                 "description": "Raw vegetable salad with peanut dressing."
//             },
//             {
//                 "name": "Lotek",
//                 "image": "lotek.jpg",
//                 "description": "Vegetable salad with peanut sauce and crackers."
//             },
//             {
//                 "name": "Sayur Asem",
//                 "image": "sayur_asem.jpg",
//                 "description": "Sour vegetable soup."
//             },
//             {
//                 "name": "Sayur Lodeh",
//                 "image": "sayur_lodeh.jpg",
//                 "description": "Vegetable soup with coconut milk."
//             },
//             {
//                 "name": "Gudeg",
//                 "image": "gudeg.jpg",
//                 "description": "Jackfruit stew with coconut milk."
//             },
//             {
//                 "name": "Tumis Kangkung",
//                 "image": "tumis_kangkung.jpg",
//                 "description": "Stir-fried water spinach."
//             },
//             {
//                 "name": "Tumis Bayam",
//                 "image": "tumis_bayam.jpg",
//                 "description": "Stir-fried spinach."
//             },
//             {
//                 "name": "Tumis Buncis",
//                 "image": "tumis_buncis.jpg",
//                 "description": "Stir-fried green beans."
//             },
//             {
//                 "name": "Tumis Tauge",
//                 "image": "tumis_tauge.jpg",
//                 "description": "Stir-fried bean sprouts."
//             }
//         ],
//         "Snacks and Street Food": [
//             {
//                 "name": "Bakso",
//                 "image": "bakso.jpg",
//                 "description": "Meatball soup with noodles."
//             },
//             {
//                 "name": "Mie Ayam",
//                 "image": "mie_ayam.jpg",
//                 "description": "Chicken noodle soup."
//             },
//             {
//                 "name": "Sate Taichan",
//                 "image": "sate_taichan.jpg",
//                 "description": "Spicy grilled chicken skewers."
//             },
//             {
//                 "name": "Martabak Telur",
//                 "image": "martabak_telur.jpg",
//                 "description": "Savory pancake filled with egg and meat."
//             },
//             {
//                 "name": "Kebab Turki",
//                 "image": "kebab_turki.jpg",
//                 "description": "Turkish-style kebab with meat and vegetables."
//             }
//         ],
//         "Desserts": [
//             {
//                 "name": "Kue Lapis",
//                 "image": "kue_lapis.jpg",
//                 "description": "Layered cake with colorful layers."
//             },
//             {
//                 "name": "Klepon",
//                 "image": "klepon.jpg",
//                 "description": "Rice balls filled with palm sugar and coated with coconut."
//             },
//             {
//                 "name": "Pisang Goreng",
//                 "image": "pisang_goreng.jpg",
//                 "description": "Fried bananas."
//             },
//             {
//                 "name": "Es Cendol",
//                 "image": "es_cendol.jpg",
//                 "description": "Iced dessert with rice flour noodles, coconut milk, and palm sugar syrup."
//             },
//             {
//                 "name": "Es Dawet",
//                 "image": "es_dawet.jpg",
//                 "description": "Iced dessert with tapioca pearls, coconut milk, and palm sugar syrup."
//             }
//         ]
//     };
//     let normalized_foods=[]
//     console.log("3333333333333333333#############################")
//     for(let category in foods){
//         console.log(category)
//         for(let food of foods[category]){
//             let normalized_food={
//                 ...food,
//                 category: category,
//                 price: getRandomBetween(20,30)*1000
//             };
//             normalized_foods.push(normalized_food);
//         }
//     }
//     normalized_foods=shuffleArray(normalized_foods)
//     // console.log(normalized_foods)
//         // res.json({success:true, message:"Food Added"})
//     // try {
//     //     await foodModel.insertMany(normalized_foods)
//     //     res.json({success:true, message:"Food Added"})
//     // } catch (error) {
//     //     console.log(error)
//     //     res.json({success:false, message:"Error",error:error})
//     // }
// }