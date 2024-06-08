// I intentionally left the second parameter to prove my point that I was making
// in the email. I left it there so in case of pre-created testCases it doesnt break them
function specialRound(number, lastDigits, roundingType) {
  // I don't need second param at all, I can use roundingType to determine 
  // number of digits to round
  const lengthToCut = roundingType.includes('/') ? 1 : roundingType.length;
  // This tells me how much should I round => if 00 then basically I'm rounding to 100 etc
  const factor = Math.pow(10, lengthToCut);
  // This will give me a decimal number I can further round using basic js functions
  const numberToRound = number / factor;

  const floorAndCeil = (offset) => {
    // This function determines if the closest number to given one is floored
    // or ceiled
    // so when rounding to 0(10) if I have 123 as base number
    // 123 / 10 = 12.3 => floored (12), ceiled (13)
    // now I have to recalculate to get rounded to 10 so 12 * 10 and 13 * 10
    // now I have 120 and 130 and just need to know which from those in absolute
    // terms is closest 
    // ABS[120 - 123] = 3 && ABS[130 - 123] = 7
    // 120 is closer so thats my number
    // This is universally applicable to any number of last digits to be rounded 
    const floored = Math.floor(numberToRound) * factor + offset;
    const ceiled = Math.ceil(numberToRound) * factor + offset;
    return Math.abs(number - floored) < Math.abs(number - ceiled) ? floored : ceiled;
  };

  const floorCeilComparison = (offset1, offset2) => {
    // this does the same thing as the function above but uses more offsets which determines
    // how I want to round the number 
    // the step to compare those 2 results needs to be added
    const result1 = floorAndCeil(offset1);
    const result2 = floorAndCeil(offset2);
    return Math.abs(result1 - number) < Math.abs(result2 - number) ? result1 : result2;
  };

  const roundToNearest = (increment) => {
    // this uses same principle but instead of getting the number to round with
    // division it uses remainder 
    const remainder = number % factor;
    const roundedDown = number - remainder;
    const roundedUp = number - remainder + increment;
    return Math.abs(number - roundedDown) <= Math.abs(number - roundedUp) ? roundedDown : roundedUp;
  };

  switch (roundingType) {
    case "9":
      // offset to typicall rounding to with 9 is -1
      return floorAndCeil(-1);
    case "4/9":
      // offset to typicall rounding to with 4/9 is -6 and -1
      return floorCeilComparison(-1, -6);
    case "0/5":
      // offset to typicall rounding is 0 and -5
      return floorCeilComparison(0, -5);
    case "50":
      return roundToNearest(50);
    case "50000":
      return roundToNearest(50000);
    default:
      // default values are every case including 0 and offset is 0
      return floorAndCeil(0);
  }
}

// Test cases
console.log(specialRound(123, 1, "0")); // 120
console.log(specialRound(123, 1, "9")); // 119
console.log(specialRound(123, 1, "4/9")); // 124
console.log(specialRound(122, 1, "0/5")); // 120
console.log(specialRound(123, 1, "0/5")); // 125
console.log(specialRound(128, 1, "0/5")); // 130
console.log(specialRound(1123, 2, "00")); // 1100
console.log(specialRound(1101, 2, "50")); // 1100
console.log(specialRound(1143, 2, "50")); // 1150
console.log(specialRound(12345, 3, "000")); // 12000
console.log(specialRound(12345, 4, "0000")); // 10000
console.log(specialRound(123456, 5, "00000")); // 100000
console.log(specialRound(123456, 5, "50000")); // 100000
console.log(specialRound(143456, 5, "50000")); // 150000