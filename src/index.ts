//@ts-check

import config from "./lib/config.lib";
import { makeEncodingAlgo } from "./lib/functions.lib";
import { randomInteger } from "./lib/random.lib";

function encStorage(){
    let getItem = (item:string, storageType:string='localstorage')=>{
        return item
    }
    let setItem = (item:string, value:string)=>{
        return value
    }

}
console.log(randomInteger(10))
