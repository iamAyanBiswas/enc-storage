import { randomString } from "./random.lib";
import {openDB, addData, updateData, getData, deleteData, deleteDB} from "./indexDB.lib";

//Base64 encoding
function encoding(str:string):string {
    return btoa(unescape(encodeURIComponent(str))); 
  }
  
  // Decode a Base64 encoded string
function decoding(encodedStr:string):string {
    return decodeURIComponent(escape(atob(encodedStr)));
  }


async function generateKeyAuth(key:string, keyValue:string):Promise<void>{
    let randomStr1=encoding(randomString(4))
    let randomStr2=encoding(randomString(6))
    console.log({randomStr1,randomStr2})
    let encodingKeyValue=encoding(keyValue)
    try {
      await deleteDB("__encDB")
      await addData("__encDB",key,String(randomStr1+key+randomStr2))
    } catch (_error) {
      throw _error
    }

}


  export{generateKeyAuth}

