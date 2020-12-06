import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  inputLengthBeforeDecimal = '0';
  inputLengthAfterDecimal = '0';
  prevLengthInput = '0';
  option: string;
  unit: string[] = ['m', 'cm', 'mm', 'ft', 'inch'];
  currentUnit = this.unit[1];
  convertedUnit = this.unit[0];
  result = 0;
  isNewNum = true;
  isDecimal = false;
  inputLengthBeforeDecimalInFloat = 0;
  inputLengthAfterDecimalInFloat = 0;
  inputLengthCombinedInFloat = 0;
  operator: string;
  ans = 0;

  constructor() { }

  @HostListener('keyup') lengthStandardize() {
    switch (this.currentUnit) {
      case 'm':
        this.calculateinputLengthCombinedInFloat();
        document.getElementById('inputLength').innerHTML = this.inputLengthCombinedInFloat.toString();
        this.lengthConverter(this.inputLengthCombinedInFloat * 100.0);
        break;

      case 'cm':
        this.calculateinputLengthCombinedInFloat();
        document.getElementById('inputLength').innerHTML = this.inputLengthCombinedInFloat.toString();
        this.lengthConverter(this.inputLengthCombinedInFloat);
        break;

      case 'mm':
        this.calculateinputLengthCombinedInFloat();
        document.getElementById('inputLength').innerHTML = this.inputLengthCombinedInFloat.toString();
        this.lengthConverter(this.inputLengthCombinedInFloat / 10.0);
        break;

      case 'ft':
        this.calculateinputLengthCombinedInFloat();
        document.getElementById('inputLength').innerHTML = this.inputLengthCombinedInFloat.toString();
        this.lengthConverter(this.inputLengthCombinedInFloat / 0.032808399);
        break;

      case 'inch':
        this.calculateinputLengthCombinedInFloat();
        document.getElementById('inputLength').innerHTML = this.inputLengthCombinedInFloat.toString();
        this.lengthConverter(this.inputLengthCombinedInFloat / 0.393700787);
        break;
    }
  }

  lengthStandardize2(val) {
    switch (this.currentUnit) {
      case 'm':
        this.inputLengthBeforeDecimal = (parseFloat(val) * 100).toString();
        break;

      case 'cm':
        this.inputLengthBeforeDecimal = this.inputLengthBeforeDecimal;
        break;

      case 'mm':
        this.inputLengthBeforeDecimal = (parseFloat(val) / 10.0).toString();
        break;

      case 'ft':
        this.inputLengthBeforeDecimal = (parseFloat(val) / 0.032808399).toString();
        break;

      case 'inch':
        this.inputLengthBeforeDecimal = (parseFloat(val) / 0.393700787).toString();
        break;
    }
  }

  lengthConverter(val) {
    switch (this.convertedUnit) {
      case 'm':
        this.result = val / 100;
        this.ans = this.result;
        document.getElementById('outputLength').innerHTML = (this.result.toFixed(8)).toString();
        break;

      case 'cm':
        this.result = val;
        this.ans = this.result;
        document.getElementById('outputLength').innerHTML = (this.result.toFixed(8)).toString();
        break;

      case 'mm':
        this.result = val * 10.0;
        this.ans = this.result;
        document.getElementById('outputLength').innerHTML = (this.result.toFixed(8)).toString();
        break;

      case 'ft':
        this.result = val * 0.032808399;
        this.ans = this.result;
        document.getElementById('outputLength').innerHTML = (this.result.toFixed(8)).toString();
        break;

      case 'inch':
        this.result = val * 0.393700787;
        this.ans = this.result;
        document.getElementById('outputLength').innerHTML = (this.result.toFixed(8)).toString();
        break;
    }

  }

  onACButtonClick() {
    this.inputLengthBeforeDecimal = '0';
    this.inputLengthAfterDecimal = '0';
    document.getElementById('inputLength').innerHTML = this.inputLengthBeforeDecimal;
    document.getElementById('outputLength').innerHTML = this.inputLengthBeforeDecimal;
    this.isNewNum = true;
    this.isDecimal = false;
    this.operator = '';
  }

  onNumberButtonClick(num) {
    if (this.isDecimal === false) {
      if (this.isNewNum) {
        this.inputLengthBeforeDecimal = '' + num;
      } else {
        this.inputLengthBeforeDecimal += '' + num;
      }
    } else if (this.isDecimal === true) {
      if (this.isNewNum) {
        this.inputLengthAfterDecimal = '' + num;
      } else {
        this.inputLengthAfterDecimal += '' + num;
      }
    }
    this.isNewNum = false;
    this.lengthStandardize();
  }

  onAnsButtonClick() {
    document.getElementById('outputLength').innerHTML = (this.ans.toFixed(2)).toString();
  }

  onDecimalButtonClick() {
    if (this.isDecimal === false) {
      this.isDecimal = true;
    } else {
      this.isDecimal = false;
    }
  }

  onOperatorButtonClick(symbol) {
    if (symbol === '=') {
      if (this.operator === '+') {
        this.lengthStandardize2(this.inputLengthBeforeDecimal);
        this.inputLengthBeforeDecimal = '' + (parseFloat(this.prevLengthInput) + parseFloat(this.inputLengthBeforeDecimal));
        this.currentUnit = this.unit[1];
        this.lengthStandardize();
      } else if (this.operator === '-') {
        this.lengthStandardize2(this.inputLengthBeforeDecimal);
        this.inputLengthBeforeDecimal = '' + (parseFloat(this.prevLengthInput) - parseFloat(this.inputLengthBeforeDecimal));
        this.currentUnit = this.unit[1];
        this.lengthStandardize();
      } else if (this.operator === 'x') {
        this.lengthStandardize2(this.inputLengthBeforeDecimal);
        this.inputLengthBeforeDecimal = '' + (parseFloat(this.prevLengthInput) * parseFloat(this.inputLengthBeforeDecimal));
        this.currentUnit = this.unit[1];
        this.lengthStandardize();
      } else if (this.operator === '/') {
        this.lengthStandardize2(this.inputLengthBeforeDecimal);
        this.inputLengthBeforeDecimal = '' + (parseFloat(this.prevLengthInput) / parseFloat(this.inputLengthBeforeDecimal));
        this.currentUnit = this.unit[1];
        this.lengthStandardize();
      } else if (this.operator === 'pow') {
        this.inputLengthBeforeDecimal = '' + Math.pow(parseFloat(this.prevLengthInput), 2);
        this.lengthStandardize();
      } else if (this.operator === 'sqrt') {
        this.inputLengthBeforeDecimal = '' + Math.sqrt(parseFloat(this.prevLengthInput));
        this.lengthStandardize();
      }
    } else {
      this.isNewNum = true;
      this.lengthStandardize2(this.inputLengthBeforeDecimal);
      this.prevLengthInput = this.inputLengthBeforeDecimal;
      this.operator = symbol;
    }
  }

  calculateinputLengthCombinedInFloat() {
    this.inputLengthBeforeDecimalInFloat = parseFloat(this.inputLengthBeforeDecimal);
    this.inputLengthAfterDecimalInFloat = (parseFloat(this.inputLengthAfterDecimal) / (Math.pow(10, (this.inputLengthAfterDecimal.length - 1))));
    this.inputLengthCombinedInFloat = this.inputLengthBeforeDecimalInFloat + this.inputLengthAfterDecimalInFloat;
  }

  onUnitButtonClick(unit) {
    this.currentUnit = this.unit[this.unit.indexOf(unit)];
  }

}
