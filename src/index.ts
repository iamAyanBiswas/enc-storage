//@ts-check
import { randomIntegerInRange, randomString } from "random-crypto-api";
import { generateKeyAuth, getKeyValue, encryption, decryption } from "./lib/functions.lib";
import { deleteDB } from "./lib/indexDB.lib";
import DEFAULT from "./lib/default.lib";


const encStorage = (): any => {
    interface generateKeyConfigType {
        dbName?: string | undefined | null
        objStore?: string | undefined | null
        keyName?: string | undefined | null
        envConfig?: boolean | undefined | null
    }

    interface setIAndGetItemConfigType{
        dbName?: string | undefined | null
        objStore?: string | undefined | null
        keyName?: string | undefined | null
        envConfig?: boolean | undefined | null
        storageType?: string | undefined | null
    }
    return {
        generateKey: async (envKeyValue: string, obj: generateKeyConfigType = {}): Promise<boolean> => {

            let object={
                dbName : obj.dbName || DEFAULT.dbName,
                objStore : obj.objStore || DEFAULT.objStore,
                keyName : obj.keyName || DEFAULT.keyName,
                envConfig : obj.envConfig || DEFAULT.envConfig,
            }

            
            let randomNumber: number = randomIntegerInRange(10, 20)
            let keyValue: string = randomString(randomNumber)
            await generateKeyAuth(keyValue,object)
            return true
        },
        deleteKey: async (): Promise<void> => {
            await deleteDB("__encDB")
        },
        getItem: async (item: string, obj:setIAndGetItemConfigType={}): Promise<any> => {
            let storageType=obj?.storageType
            if (storageType !== 'localstorage' || storageType !== 'localstorage') throw new Error("Invalid storageType ")
            let encData: string;
            storageType === "localstorage" ? encData = localStorage.getItem(item) : encData = sessionStorage.getItem(item)
            if (encData === '') return ""
            else {
                try {
                    let encriptionKey: string = await getKeyValue("__primaryKey")
                    let values: any = decryption(encData, encriptionKey)
                    return values
                } catch (_error) {
                    throw _error
                }
            }
        },
        setItem: async (item: string, value: string, storageType: string = 'localstorage'): Promise<void> => {
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
