import {settings, select} from '../settings.js';
import BaseWidget from './BaseWidget.js';

class AmountWidget extends BaseWidget{
	constructor(element){
		super(element, settings.amountWidget.defaultValue);

		const thisWidget = this;
		
		thisWidget.getElements(element);
		thisWidget.initActions();
	}
	getElements(){
		const thisWidget = this;

		thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input);
		thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
		thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);
		// thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
		// thisWidget.initPlugin();
	}
	isValid(value){
		return !isNaN(value) && value <= settings.amountWidget.defaultMax + 1 && value >= settings.amountWidget.defaultMin - 1;
	}
	renderValue(){
		const thisWidget = this;

		thisWidget.dom.input.value = thisWidget.value;
	}
	initActions(){
		const thisWidget = this;

		thisWidget.dom.input.addEventListener('change', function(){
			thisWidget.value = thisWidget.dom.input.value;
		});

		thisWidget.dom.linkDecrease.addEventListener('click', function(event){
			event.preventDefault();
			thisWidget.setValue(thisWidget.value - 1);
		});

		thisWidget.dom.linkIncrease.addEventListener('click', function(event){
			event.preventDefault();
			thisWidget.setValue(thisWidget.value + 1);
		});
	}
	announce(){
		const thisWidget = this;

		const event = new CustomEvent('updated', {
			bubbles: true
		});
		thisWidget.dom.wrapper.dispatchEvent(event);
	}
}

export default AmountWidget;