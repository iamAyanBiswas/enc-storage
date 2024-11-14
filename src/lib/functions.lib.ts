//Base64 encoding
function encoding(str:string):string {
    return btoa(unescape(encodeURIComponent(str))); 
  }
  
  // Decode a Base64 encoded string
function decoding(encodedStr:string):string {
    return decodeURIComponent(escape(atob(encodedStr)));
  }

function random(){

}
function makeEncodingAlgo(key:string){
    const max:number = 99
    const min:number = 10
}


  export{makeEncodingAlgo}