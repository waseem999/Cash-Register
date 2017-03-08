'use strict';

//register constructor function
function Register(){
    this.money = {
      20 : 0,
      10: 0,
      5: 0,
      2: 0,
      1: 0
    }
}

//this method adds bills to the register in each denomiation
Register.prototype.add = function(...args){
    let i = args.length-1;
    for (let key in this.money){
      this.money[key] += args[i];
      i--;
    }
}

//this method removes bills from the register in each donomination
Register.prototype.remove = function(...args){
  let i = args.length-1;
  for (let key in this.money){
      if (this.money[key] - args[i] >= 0) {
        this.money[key] -= args[i]
        } 
      else {
        throw new Error ("sorry, not enough bills in register")
      }
    i--;
  }
}

//this helper method calculates the total amount in the register
Register.prototype.total = function(){
  let total = 0;
    for (let key in this.money){
      total += this.money[key] * parseInt(key);
    }
  return total
}

//this method returns a string representing the total amount and bill demoninations in the register 
Register.prototype.show = function(){
  let total = this.total();
  let totalString = "$" + total;
  for (let key in this.money){
    totalString += " " + this.money[key] + "x" + key; 
  }
  return totalString
}

//this function makes change by taking money from the register to make change, and returning a string with the correct change.  If change cannot be made, it throws an error.
Register.prototype.change = function(num){
  let changeObject = {
      20 : 0,
      10: 0,
      5: 0,
      2: 0,
      1: 0
  };
  let tempRegister = Object.assign({}, this.money);
  let registerKeys = Object.keys(tempRegister);
  for (let i = registerKeys.length - 1 ; i >= 0; i--){
    let key = registerKeys[i];
    if (key <= num && num - key >= 0){
      while (tempRegister[key] > 0 && num - key >= 0){
        tempRegister[key]--;
        changeObject[key]++;
        num = num - key;
      }
    }
  }
  if (num){
    throw new Error ("sorry, not enough bills in register to make change")
  }
  else {
    this.money = Object.assign({}, tempRegister);
    let changeString;
    for (let key in changeObject){
      changeString ? changeString += " " + changeObject[key] + "x" + key : changeString = changeObject[key] + "x" + key; 
    }
  return changeString;
  }
}

module.exports = Register;
