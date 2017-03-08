const expect = require('chai').expect;
const should = require('chai').should();
const Register = require('./register.js');

 beforeEach(function() {
    register = new Register();
  });

describe('`cash register functionality`', function() {
  it('is a constructor function', function() {
    expect(register).to.be.an.instanceOf(Register);
  });

  it("calculate the total amount in the register", function(){
    register.money[20] = 1;
    register.money[10] = 1;
    register.money[5] = 1;
    register.money[2] = 0;
    register.money[1] = 10;
    expect(register.total()).to.eql(45);
  })
  
  it("has a show method that represents current money as a string", function(){
    register.money[20] = 2;
    register.money[10] = 0;
    register.money[5] = 4;
    register.money[2] = 5;
    register.money[1] = 2;
    expect(register.show()).to.be.a('string');
    expect(register.show()).to.eql('$72 2x1 5x2 4x5 0x10 2x20');
  });

  it("adds bills in each denomination", function(){
    register.add(1, 2, 3, 4, 5);
    register.add(1, 1, 1, 1, 1);
    expect(register.money[20]).to.eql(2);
    expect(register.money[10]).to.eql(3);
    expect(register.money[5]).to.eql(4);
    expect(register.money[2]).to.eql(5);
    expect(register.money[1]).to.eql(6);
  })

   it("removes bills in each denomination", function(){
    register.money[20] = 5;
    register.money[10] = 5;
    register.money[5] = 5;
    register.money[2] = 5;
    register.money[1] = 5;
    register.remove(1, 1, 5, 0, 3);
    expect(register.money[20]).to.eql(4);
    expect(register.money[10]).to.eql(4);
    expect(register.money[5]).to.eql(0);
    expect(register.money[2]).to.eql(5);
    expect(register.money[1]).to.eql(2);
  })

   it("throws an error if there are not enough bills in the register to remove", function(){
    register.money[20] = 5;
    register.money[10] = 5;
    register.money[5] = 5;
    register.money[2] = 5;
    register.money[1] = 5;
    register.remove.bind(register, 6, 1, 5, 0, 3).should.throw("sorry, not enough bills in register")
   })

   it("removes money from cash register to make change, given a dollar amount, and returns a string with correct change", function(){
    register.money[20] = 10;
    register.money[10] = 10;
    register.money[5] = 10;
    register.money[2] = 10;
    register.money[1] = 10;
    expect(register.change(17)).to.eql("0x1 1x2 1x5 1x10 0x20");
    expect(register.show()).to.eql('$363 10x1 9x2 9x5 9x10 10x20');
    register.money[20] = 1;
    register.money[10] = 0;
    register.money[5] = 3;
    register.money[2] = 1;
    register.money[1] = 1;
    expect(register.change(28)).to.eql("1x1 1x2 1x5 0x10 1x20");
    expect(register.show()).to.eql('$10 0x1 0x2 2x5 0x10 0x20');
   })

  it("throws an error if change cannot be made", function(){
    register.money[20] = 1;
    register.money[10] = 1;
    register.money[5] = 0;
    register.money[2] = 1;
    register.money[1] = 0;
    register.change.bind(register, 21).should.throw("sorry, not enough bills in register to make change")
   })

   it("does not remove money from the register if change cannot be made", function(){
    register.money[20] = 1;
    register.money[10] = 1;
    register.money[5] = 0;
    register.money[2] = 1;
    register.money[1] = 0;
    expect(register.show()).to.eql('$32 0x1 1x2 0x5 1x10 1x20');
   })
});