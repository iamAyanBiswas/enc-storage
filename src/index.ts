//@ts-check
import { randomIntegerInRange, randomString } from "random-crypto-api";
import { generateKeyAuth, getKeyValue, encryption, decryption } from "./lib/functions.lib";
import { deleteDB } from "./lib/indexDB.lib";


const encStorage = ():any => {
    return{
        generateKey : async (): Promise<void> => {
            let randomNumbet: number = randomIntegerInRange(10, 20)
            let keyValue: string = randomString(randomNumbet)
            await generateKeyAuth("__primaryKey", keyValue)
        },
        deleteKey : async():Promise<void>=>{
            await deleteDB("__encDB")
        },
        getItem : async (item: string, storageType: string = 'localstorage'): Promise<any> => {
            if (storageType !== 'localstorage' || storageType !== 'localstorage') throw new Error("Invalid storageType ")
            let encData: string;
            storageType === "localstorage" ? encData = localStorage.getItem(item) : encData = sessionStorage.getItem(item)
            if (encData === '') return ""
            else {
                try {
                    let encriptionKey: string = await getKeyValue("__primaryKey")
                    let values: any=decryption(encData,encriptionKey)
                    return values
                } catch (_error) {
                    throw _error
                }
            }
        },
        setItem : async (item: string, value: string, storageType: string = 'localstorage'): Promise<void> => {
            if (storageType !== 'localstorage' || storageType !== 'localstorage') throw new Error("Invalid storageType ")
    
            try {
                let encriptionKey: string = await getKeyValue("__primaryKey")
                //enc part
                let encData = encryption(value, encriptionKey)
                storageType === "localstorage" ? localStorage.setItem(item, encData) : sessionStorage.setItem(item, encData)
    
            } catch (_error) {
                throw _error
            }
        }
    }
    
    
}


export default encStorage
