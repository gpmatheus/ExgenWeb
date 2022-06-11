
let operations = ['+', '-', '*', '/'];

class NumberElement {
    constructor(value) {
        this._value = value;
        this._operationLevel = 0;
        this._left = null;
        this._right = null;
    }

    isLeaf() {
        return this._left == null && this._right == null;
    }

    getString(brackets) {
        if (this.isLeaf()) {
            return new String(this._value);
        }
        let left_brackets = this._left._operationLevel < this._operationLevel;
        let right_brackets = this._operationLevel >= this._right._operationLevel;
        let str = this._left.getString(left_brackets) + ' ' + this._operation + ' ' + this._right.getString(right_brackets);
        if (brackets) {
            return '(' + str + ')';
        }
        return str;
    }

    split(chance, alpha) {
        if (this._value <= 2 || Math.random() > chance) {
            return;
        }

        let num = Math.floor(Math.random() * operations.length)
        if (num <= 1) {
            this._operationLevel = 0;
        } else {
            this._operationLevel = 1;
        }
        this._operation = operations[num];

        if (this._operation === '+') {
            let minus = Math.floor(Math.random() * this._value);
            let result = parseInt(this._value - minus);
            this._left = new NumberElement(result);
            this._right = new NumberElement(minus);
        }

        else if (this._operation === '-') {
            let plus = Math.floor(Math.random() * 1000);
            let result = parseInt(this._value + plus);
            this._left = new NumberElement(result);
            this._right = new NumberElement(plus);
        }

        else if (this._operation === '*') {
            let divide = Math.floor(Math.random() * this._value);
            let counter = 1000;
            while (counter > 0 && this._value % divide != 0) {
                divide = Math.floor(Math.random() * this._value)
                counter--;
                if (counter == 0) {
                    divide = 1;
                }
            }
            let result = parseInt(this._value / divide)
            this._left = new NumberElement(result);
            this._right = new NumberElement(divide);
        }

        else if (this._operation === '/') {
            let multiply = Math.floor(Math.random() * 99) + 1;
            let result = parseInt(this._value * multiply);
            this._left = new NumberElement(result);
            this._right = new NumberElement(multiply);
        }

        let newChance = chance * alpha;
        this._left.split(newChance, alpha);
        this._right.split(newChance, alpha);
    }
}