import { openDB, addData, updateData, getData, deleteData, deleteDB } from "./indexDB.lib";
import { randomString } from "random-crypto-api";
import CryptoJS from "crypto-js";


interface generateKeyAuthObject {
  dbName?: string | undefined | null
  objStore?: string | undefined | null
  keyName?: string | undefined | null
  envConfig?: boolean | undefined | null
}
interface getKeyValueObject {
  dbName?: string | undefined | null
  objStore?: string | undefined | null
  keyName?: string | undefined | null
  envConfig?: boolean | undefined | null
}



//Base64 encoding
function encoding(str: string): string {
  return btoa(encodeURIComponent(str));
}

// Decode a Base64 encoded string
function decoding(encodedStr: string): string {
  return decodeURIComponent(atob(encodedStr));
}

function encryption(datas: any, encKey: string): string {
  let encData = CryptoJS.AES.encrypt(datas, encKey).toString();
  return encData
}
function decryption(encData: string, encKey: string): any {
  let bytes = CryptoJS.AES.decrypt(encData, encKey);
  let originalData = bytes.toString(CryptoJS.enc.Utf8);
  return originalData
}

async function generateKeyAuth(keyValue: string, obj?: generateKeyAuthObject): Promise<void> {
  let randomStr1 = encoding(randomString(4))
  let randomStr2 = encoding(randomString(6))
  let encodingKeyValue = encoding(keyValue)

  let dataObj = {
    value: String(randomStr1 + encodingKeyValue + randomStr2),
    envConfig: obj.envConfig
  }
  try {
    await addData(obj.dbName, obj.objStore, obj.keyName, encoding(JSON.stringify(dataObj)))
  } catch (_error) {
    throw _error
  }
}


async function getKeyValue(obj?: getKeyValueObject, envValue?: string): Promise<string> {
  try {
    let data: string = await getData(obj.dbName, obj.objStore, obj.keyName)
    data=decoding(data)
    const objData=JSON.parse(data)
    const value=objData.value
    const len = value.length
    const firstIdx = 0 + 8
    const lastIdx = (len - 1) - 8
    let result: string = value.slice(firstIdx, lastIdx);
    result = decoding(result)
    objData.envConfig===true?result+=envValue:''
    return result
  } catch (_error) {
    throw _error
  }
}

export { generateKeyAuth, getKeyValue, encryption, decryption }

