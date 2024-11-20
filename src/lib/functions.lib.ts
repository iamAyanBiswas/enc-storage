import { openDB, addData, updateData, getData, deleteData, deleteDB } from "./indexDB.lib";
import { randomString } from "random-crypto-api";
import CryptoJS from "crypto-js";


//Base64 encoding
function encoding(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

// Decode a Base64 encoded string
function decoding(encodedStr: string): string {
  return decodeURIComponent(escape(atob(encodedStr)));
}

function encryption(datas:any,encKey:string):string{
  let encData = CryptoJS.AES.encrypt(datas, encKey).toString();
  return encData
}
function decryption(encData:string,encKey:string):any{
  let bytes  = CryptoJS.AES.decrypt(encData, encKey);
  let originalData = bytes.toString(CryptoJS.enc.Utf8);
  return originalData
}

async function generateKeyAuth(key: string, keyValue: string): Promise<void> {
  let randomStr1 = encoding(randomString(4))
  let randomStr2 = encoding(randomString(6))
  console.log({ randomStr1, randomStr2 })
  let encodingKeyValue = encoding(keyValue)
  try {
    await deleteDB("__encDB")
    await addData("__encDB", key, String(randomStr1 + key + randomStr2))
  } catch (_error) {
    throw _error
  }
}


async function getKeyValue(key: string): Promise<string> {
  try {
    const value: string = await getData("__encDB", key)
    const len = value.length
    const firstIdx = 0 + 8
    const lastIdx = (len - 1) - 8
    let result: string = value.slice(firstIdx, lastIdx);
    result = decoding(result)
    return result
  } catch (_error) {
    throw _error
  }
}

export { generateKeyAuth, getKeyValue, encryption, decryption }

