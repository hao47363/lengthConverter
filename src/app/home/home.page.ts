import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  inputLengthBeforeDecimal = '0';
  inputLengthAfterDecimal = '0';
  firstLengthInput = '0';
  secondLengthInput = '0';
  option: string;
  unit = ['m', 'cm', 'mm', 'ft', 'inch'];
  currentUnit = this.unit[1];
  convertedUnit = this.unit[0];
  result = 0;
  isNewNum = true;
  isDecimal = false;
  inputLengthBeforeDecimalInFloat = 0;
  inputLengthAfterDecimalInFloat = 0;
  inputLengthCombinedInFloat = 0;
  finalAnswer = '0';
  operator: string;
  ans = 0;
  isSelectOptionDisabled = false;
  @ViewChild('inputLength') inputLength: ElementRef;
  @ViewChild('outputLength') outputLength: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('keyup') lengthStandardize() {
    switch (this.currentUnit) {
      case 'm':
        this.inputLengthCombinedInFloat = this.inputLengthCombinedInFloat * 100.0;
        break;

      case 'cm':
        this.inputLengthCombinedInFloat = this.inputLengthCombinedInFloat;
        break;

      case 'mm':
        this.inputLengthCombinedInFloat = this.inputLengthCombinedInFloat / 10.0;
        break;

      case 'ft':
        this.inputLengthCombinedInFloat = this.inputLengthCombinedInFloat / 0.032808399;
        break;

      case 'inch':
        this.inputLengthCombinedInFloat = this.inputLengthCombinedInFloat / 0.393700787;
        break;
    }
    this.calculateInputLengthCombinedInFloat();
    this.inputLength.nativeElement = this.inputLengthCombinedInFloat.toString();
    this.lengthConverter(this.inputLengthCombinedInFloat);
  }

  lengthStandardizeFinalAns() {
    switch (this.currentUnit) {
      case 'm':
        this.inputLengthCombinedInFloat = this.inputLengthCombinedInFloat * 100.0;
        break;

      case 'cm':
        this.inputLengthCombinedInFloat = this.inputLengthCombinedInFloat;
        break;

      case 'mm':
        this.inputLengthCombinedInFloat = this.inputLengthCombinedInFloat / 10.0;
        break;

      case 'ft':
        this.inputLengthCombinedInFloat = this.inputLengthCombinedInFloat / 0.032808399;
        break;

      case 'inch':
        this.inputLengthCombinedInFloat = this.inputLengthCombinedInFloat / 0.393700787;
        break;
    }
    this.inputLength.nativeElement = this.inputLengthCombinedInFloat.toString();
    this.lengthConverter(this.inputLengthCombinedInFloat);
  }

  lengthStandardizeCombinedValue(val) {
    switch (this.currentUnit) {
      case 'm':
        this.inputLengthCombinedInFloat = val * 100;
        break;

      case 'cm':
        this.inputLengthCombinedInFloat = val;
        break;

      case 'mm':
        this.inputLengthCombinedInFloat = val / 10.0;
        break;

      case 'ft':
        this.inputLengthCombinedInFloat = val / 0.032808399;
        break;

      case 'inch':
        this.inputLengthCombinedInFloat = val / 0.393700787;
        break;
    }
  }

  lengthConverter(val) {
    switch (this.convertedUnit) {
      case 'm':
        this.result = val / 100;
        break;

      case 'cm':
        this.result = val;
        break;

      case 'mm':
        this.result = val * 10.0;
        break;

      case 'ft':
        this.result = val * 0.032808399;
        break;

      case 'inch':
        this.result = val * 0.393700787;
        break;
    }
    this.ans = this.result;
    this.outputLength.nativeElement = (this.result.toFixed(4)).toString();
  }

  onACButtonClick() {
    this.inputLengthBeforeDecimal = '0';
    this.inputLengthAfterDecimal = '0';
    this.inputLength.nativeElement = '0';
    this.outputLength.nativeElement = '0';
    this.isNewNum = true;
    this.isDecimal = false;
    this.operator = '';
    this.firstLengthInput = '0';
    this.secondLengthInput = '0';
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
    this.outputLength.nativeElement = (this.ans.toFixed(4)).toString();
  }

  onDecimalButtonClick() {
    if (this.isDecimal === false) {
      this.isDecimal = true;
      this.inputLengthAfterDecimal = '0';
    } else {
      this.isDecimal = false;
    }
  }

  // TODO: fixing operation with decimal invovled
  onOperatorButtonClick(symbol) {
    if (symbol === '=') {
      this.calculateInputLengthCombinedInFloat();
      this.lengthStandardizeCombinedValue(this.inputLengthCombinedInFloat);
      this.secondLengthInput = this.inputLengthCombinedInFloat.toString();
      this.isDecimal = false;
      this.isMultiplyOrDivide(this.operator);
      if (this.operator === '+') {
        this.inputLengthBeforeDecimal = '' + (parseFloat(this.firstLengthInput) + parseFloat(this.secondLengthInput));
        this.currentUnit = this.unit[1];
        this.operator = '';
      } else if (this.operator === '-') {
        this.inputLengthBeforeDecimal = '' + (parseFloat(this.firstLengthInput) - parseFloat(this.secondLengthInput));
        this.currentUnit = this.unit[1];
        this.operator = '';
      } else if (this.operator === 'x') {
        console.log('First: ' + this.firstLengthInput);
        console.log('Second: ' + this.secondLengthInput);
        this.inputLengthBeforeDecimal = '' + (parseFloat(this.firstLengthInput) * parseFloat(this.secondLengthInput));
        this.currentUnit = this.unit[1];
        this.convertedUnit = this.currentUnit;
        this.operator = '';
      } else if (this.operator === '/') {
        this.inputLengthBeforeDecimal = '' + (parseFloat(this.firstLengthInput) / parseFloat(this.secondLengthInput));
        this.currentUnit = this.unit[1];
        this.convertedUnit = this.currentUnit;
        this.operator = '';
      } else if (this.operator === 'pow') {
        this.inputLengthBeforeDecimal = '' + Math.pow(parseFloat(this.firstLengthInput), 2);
      } else if (this.operator === 'sqrt') {
        this.inputLengthBeforeDecimal = '' + Math.sqrt(parseFloat(this.firstLengthInput));
      }
      this.inputLengthCombinedInFloat = parseFloat(this.inputLengthBeforeDecimal);
      this.lengthStandardizeFinalAns();
      this.isNewNum = true;
    } else {
      this.isNewNum = true;
      this.calculateInputLengthCombinedInFloat();
      this.lengthStandardizeCombinedValue(this.inputLengthCombinedInFloat);
      this.firstLengthInput = this.inputLengthCombinedInFloat.toString();
      this.operator = symbol;
      this.isDecimal = false;
    }
  }

  calculateInputLengthCombinedInFloat() {
    this.inputLengthBeforeDecimalInFloat = parseFloat(this.inputLengthBeforeDecimal);
    this.inputLengthAfterDecimalInFloat =
      (parseFloat(this.inputLengthAfterDecimal) / (Math.pow(10, (this.inputLengthAfterDecimal.length - 1))));
    this.inputLengthCombinedInFloat = this.inputLengthBeforeDecimalInFloat + this.inputLengthAfterDecimalInFloat;
  }

  onUnitButtonClick(unit) {
    this.currentUnit = this.unit[this.unit.indexOf(unit)];
  }

  isMultiplyOrDivide(symbol) {
    if (symbol === 'x' || symbol === '/') {
      this.isSelectOptionDisabled = true;
    } else {
      this.isSelectOptionDisabled = false;
    }
  }
}
