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

//some variables I will need in my change functions
let changeObject = {
      20 : 0,
      10: 0,
      5: 0,
      2: 0,
      1: 0
  };

let registerKeys = Object.keys(changeObject).map(function(val){ 
  return parseInt(val)
})
let tempRegister = {};

//this function is called if there is a remainder after the initial iteration
 Register.prototype.stepBack = function(num, lastkey, iterate){
  let iterator = iterate || lastkey;
  let bill = registerKeys[iterator]
  if (iterator > 4){
    return false
  }
  else if (changeObject[bill] > 0){
    //putting the last bill that did not result in a correct combo back in register 
    tempRegister[bill]++;
    changeObject[bill]--;
    num += bill;
    //checking combinations of a lower denomination 
    let lower = registerKeys[iterator - 1];
    for (let i = lastkey; i >= 0; i--){
     while (tempRegister[lower] > 0 && (num - lower) >= 0){
      tempRegister[lower]--;
      changeObject[lower]++;
      lastkey = i;
      num = num - lower;
      }
    }
  }
  else {
    iterator++
  }
  if (num){
    //recursively call stepBack, keeping track of which bills were incorrect with the iterator
    return this.stepBack(num, lastkey, iterator)
  }
  return true;
}

//this function makes change by taking money from the register to make change.  If change cannot be made, it throws an error.
Register.prototype.change = function(num){
  let bool = true;
  let lastkey;
  tempRegister = Object.assign({}, this.money);
  for (let i = 4; i >= 0; i--){
    let key = registerKeys[i];
    if (key <= num && num - key >= 0){
      while (tempRegister[key] > 0 && num - key >= 0){
        tempRegister[key]--;
        changeObject[key]++;
        lastkey = i;
        num = num - key;
      }
    }
  }
  if (num){
    lastkey ? lastkey = lastkey : lastkey = 0;
    let iterator = 0;
      bool = this.stepBack(num, lastkey, iterator);
  }
  if (!bool){
    throw new Error ("sorry, not enough bills in register to make change")
  }
  else {
    this.money = Object.assign({}, tempRegister);
    return true;
  }
}

module.exports = Register;
