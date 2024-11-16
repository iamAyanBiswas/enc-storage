// Function to generate random values based on type
import crypto from 'crypto'
function generateRandomValue(type: 'integer' | 'float' | 'range' | 'string', lengthOrMin: number, max?: number, charset?: string): number | string {
    // For integer generation
    if (type === 'integer') {
      return generateRandomInteger(lengthOrMin);
    }
  
    // For float generation
    if (type === 'float') {
      return generateRandomFloat(lengthOrMin);
    }
  
    // For range integer or float generation
    if (type === 'range' && max !== undefined) {
      return generateRandomInRange(lengthOrMin, max);
    }
  
    // For string generation
    if (type === 'string' && charset) {
      return generateSecureRandomString(lengthOrMin, charset);
    }
  
    throw new Error("Invalid parameters for random value generation.");
  }
  
  // Function to generate a random integer
  function generateRandomInteger(max: number): number {
    return Math.floor(Math.random() * max);
  }
  
  // Function to generate a random float
  function generateRandomFloat(max: number): number {
    return parseFloat((Math.random() * max).toFixed(2));  // Two decimal places
  }
  
  // Function to generate a random number within a range (integer or float)
  function generateRandomInRange(min: number, max: number): number {
    const isInteger = Number.isInteger(min) && Number.isInteger(max);
    if (isInteger) {
      return Math.floor(Math.random() * (max - min + 1)) + min; // Integer in range
    } else {
      return parseFloat((Math.random() * (max - min) + min).toFixed(2)); // Float in range
    }
  }
  
  // Function to generate a secure random string
  function generateSecureRandomString(length: number, charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
    const values = new Uint32Array(length);
    crypto.getRandomValues(values);
  
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = values[i] % charset.length;
      randomString += charset[randomIndex];
    }
  
    return randomString;
  }
  