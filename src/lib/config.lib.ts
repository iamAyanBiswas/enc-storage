import crypto from 'crypto'
let toExports:any;
if (typeof window !== 'undefined' && window.crypto) toExports=''
else toExports=crypto

export default toExports