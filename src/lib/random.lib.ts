import crypto from 'crypto'



// Function to generate a random integer
function randomInteger(length: number=4): number {

  const byteLength = Math.ceil(length * Math.log2(10) / 8);
  const randomBytes = crypto.randomBytes(byteLength);

  // Convert the random bytes into a big integer
  const randomInteger = BigInt('0x' + randomBytes.toString('hex'));

  // Ensure the integer has the correct number of digits by taking the modulus
  const max = BigInt(10 ** length); // Maximum number with `length` digits

  return Number(randomInteger % max); // Modulo to get the correct number of digits

}





// Function to generate a random float
function randomFloat(max: number=4): number {

  // Generate a random integer with extra digits for precision
  const randomInt = randomInteger(length + 10); // extra digits to ensure precision

  // Convert it to a float with the required number of decimal places
  const divisor = Math.pow(10, length);
  return randomInt / divisor;

}







//To generate random integer in range
function randomIntegerInRange(min: number=0, max: number=10000): number {
  if (min >= max) {
    throw new Error('Max must be greater than min');
  }

  // Calculate the range size
  const range = max - min;

  // Generate random bytes (e.g., 4 bytes = 32 bits)
  const randomBytes = crypto.randomBytes(4);
  const randomValue = randomBytes.readUInt32BE(0); // Convert the random bytes into an unsigned 32-bit integer

  // Map the random value to the desired range [min, max)
  return min + (randomValue % range); // Ensure the value falls within the range
}





//To generate random float in range
function randomFloatInRange(min: number=0, max: number=10000, precision: number=8): number {
  if (min >= max) {
    throw new Error('Max must be greater than min');
  }

  // Generate random bytes (e.g., 8 bytes = 64 bits for better precision)
  const randomBytes = crypto.randomBytes(8);
  const randomValue = randomBytes.readUInt32BE(0) * Math.pow(2, 32) + randomBytes.readUInt32BE(4); // Combine two 32-bit parts for a larger number

  // Scale the random value to the range [min, max)
  const scaledValue = min + (randomValue / Math.pow(2, 64)) * (max - min);

  // Round the result to the specified precision
  const factor = Math.pow(10, precision);
  return Math.round(scaledValue * factor) / factor;
}







// Function to generate a secure random string
function randomString(length: number=4, charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);

  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = values[i] % charset.length;
    randomString += charset[randomIndex];
  }

  return randomString;
}



export { randomInteger,randomFloat,randomIntegerInRange,randomFloatInRange,randomString }