import additionCalculator from './modules/addition-calculator';
import taxCalculator from './modules/tax-calculator';
import Person from './modules/es2015/person';

var item1Price = 400;
var item2Price = 600;
var totalPrice = additionCalculator(item1Price, item2Price);
var tax = 1.08;
var priceIncludeTax = taxCalculator(totalPrice, tax);

class Friend extends Person{
    constructor(name) {
      super(name);
    }
    callName() {
      alert(this.name);
    }
}

var friend = new Friend('Ryo');

friend.callName();
console.log(priceIncludeTax);
