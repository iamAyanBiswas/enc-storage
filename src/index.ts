//@ts-check
import { randomIntegerInRange, randomString } from "random-crypto-api";
import { generateKeyAuth, getKeyValue, encryption, decryption } from "./lib/functions.lib";
import { deleteDB } from "./lib/indexDB.lib";
import DEFAULT_INDEX_DB from "./lib/default.lib";


const encStorage = (): any => {

    //Define Type 

    interface generateKeyConfigType {
        dbName?: string | undefined | null
        objStore?: string | undefined | null
        keyName?: string | undefined | null
        envConfig?: boolean | undefined | null
    }
    interface setAndGetItemConfigType {
        dbName?: string | undefined | null
        objStore?: string | undefined | null
        keyName?: string | undefined | null
        storageType?: string | undefined | null
    }
    return {
        generateKey: async (envKeyValue: string, obj: generateKeyConfigType = {}): Promise<boolean> => {

            let object = {
                dbName: obj.dbName || DEFAULT_INDEX_DB.dbName,
                objStore: obj.objStore || DEFAULT_INDEX_DB.objStore,
                keyName: obj.keyName || DEFAULT_INDEX_DB.keyName,
                envConfig: obj.envConfig || DEFAULT_INDEX_DB.envConfig,
            }


            let randomNumber: number = randomIntegerInRange(10, 20)
            let keyValue: string = randomString(randomNumber)
            await generateKeyAuth(keyValue, object)
            return true
        },
        deleteKey: async (): Promise<void> => {
            await deleteDB("__encDB")
        },
        getItem: async (item: string, obj: setAndGetItemConfigType = {}, envValue: string): Promise<any> => {
            let object = {
                dbName: obj.dbName || DEFAULT_INDEX_DB.dbName,
                objStore: obj.objStore || DEFAULT_INDEX_DB.objStore,
                keyName: obj.keyName || DEFAULT_INDEX_DB.keyName,
            }
            let storageType: string = obj?.storageType
            storageType = storageType.toLowerCase()

            if (storageType !== 'localstorage' && storageType !== 'sessionstorage') throw new Error("Invalid storageType ")

            let encData: string;
            storageType === "localstorage" ? encData = localStorage.getItem(item) : encData = sessionStorage.getItem(item)
            if (encData === '') return ""
            else {
                try {
                    let encriptionKey: string = await getKeyValue(object,envValue)
                    let values: any = decryption(encData, encriptionKey)
                    return values
                } catch (_error) {
                    throw _error
                }
            }
        },
        setItem: async (item: string, value: any, obj: setAndGetItemConfigType = {}, envValue: string): Promise<void> => {
            let object = {
                dbName: obj.dbName || DEFAULT_INDEX_DB.dbName,
                objStore: obj.objStore || DEFAULT_INDEX_DB.objStore,
                keyName: obj.keyName || DEFAULT_INDEX_DB.keyName,
            }
            let storageType = obj?.storageType
            if (storageType !== 'localstorage' && storageType !== 'sessionstorage') throw new Error("Invalid storageType ")

            try {
                let encriptionKey: string = await getKeyValue(object, envValue)
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
