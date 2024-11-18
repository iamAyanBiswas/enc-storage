//@ts-check

import config from "./lib/config.lib";
import { generateKeyAuth } from "./lib/functions.lib";
import { randomString,randomIntegerInRange } from "./lib/random.lib";

function encStorage() {
    let generateKey = async (key="__primaryKey"): Promise<void> => {
        let randomNumbet:number=randomIntegerInRange(10,20)
        let keyValue:string=randomString(randomNumbet)
        await generateKeyAuth(key,keyValue)
    }
    let getItem = (item: string, storageType: string = 'localstorage'):string => {
        return item
    }
    let setItem = (item: string, value: string):void => {
    }
    return {generateKey,getItem,setItem}
}

// encStorage().generateKey()
// .then((e:unknown)=>{
//     console.log("lol")
// })
// .catch((e:Event)=>{
//     console.log("Some things went wrong")
// })

