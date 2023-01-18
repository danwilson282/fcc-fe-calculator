//import React from 'react';
import React, { useState, Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import {updateDisplay, selectDisplay} from './features/display/displaySlice.js';
import './App.css';

export function Display (){
  return (
    <div></div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    //apply this to functions
    this.handleChange = this.handleChange.bind(this);
    this.clickNumber = this.clickNumber.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.decimal = this.decimal.bind(this)
    this.operation = this.operation.bind(this)
    this.equals = this.equals.bind(this)
    this.state = {
      num1: 0,
      num2: 0,
      output: '0',
      dp: false,
      op: '',
      opClick: false,
      negative: false
    }
  }
  
  // functions
  componentDidMount(){

  }
  componentWillUnmount(){

  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  async clickNumber(num){
    


    //if equals button was last number clicked...
    if (this.state.op=='equals'){
      await this.setState({
        num1: 0,
        num2: 0,
        output: '0',
        dp: false,
        op: '',
        opClick: false
      });
    }
    //if not a leading 0 append the digit
    if (this.state.output!=='0'){
      await this.setState({
        output: this.state.output+String(num),
      });
    }
    else{
      //zero on display, 0 picked
      if (num!=0){
        await this.setState({
          output: num,
        });
      }
      
    }
    //if an operation loaded add to num2
    let op = this.state.op
    if (op=='add' || op=='subtract' || op=='multiply' || op=='divide'){
      await this.setState({
        num2: Number(num),
      });
    }

    //negative stuff
    if (this.state.negative==true){
      await this.setState({
        output: this.state.output*-1
      })
      this.negative()
    }
  }
  clearAll(){
    this.setState({
      output: '0',
      num1: 0,
      num2: 0,
      dp: false,
      op: '',
      negative: false,
      opClick: false
    })
    document.getElementById('showMinus').style.display = "none";
  }
  decimal(){
    let numin = this.state.output
    if (this.state.dp==false){
      numin = ""+numin+'.'
      this.setState({
        output: numin,
        dp: true
      })
    }
    
  }
  async negative(){
    if (this.state.negative==false){
      document.getElementById('showMinus').style.display = "block";
      await this.setState({
        negative: true
      });
    }
    else{
      document.getElementById('showMinus').style.display = "none";
      await this.setState({
        negative: false
      });
    }
  }
  async operation(op){
    //THIS IS THE BIT THAT DOESNT WORK!!!!
    //if subtract is selected (before first number, output 0 and operation selected)
    if (op=='subtract' && this.state.output==='0' && this.state.op!=''){

      this.negative()
    }
    else{
      document.getElementById('showMinus').style.display = "none";
      await this.setState({
        negative: false
      });
      await this.setState({
        op: op,
        dp: false,
      });
    }


    //if nothing in num1 add to num1 and make output 0
    if (this.state.num1==0 && this.state.num2==0){
      await this.setState({
        num1: Number(this.state.output),
        output: '0',
      });
    }
    //if something in num1 add to num2 if empty
    else if (this.state.num1!=0 && this.state.num2==0){
      await this.setState({
        num2: Number(this.state.output),
        output: '0',
      });
    }
    else if (this.state.num1!=0 && this.state.num2!=0){
      let output = this.calculate()
      await this.setState({
        output: '0',
        num1: Number(output),
      });
      
    }

  }
  calculate(){
    let op = this.state.op
    let output = 0
    let num1 = this.state.num1
    let num2 = this.state.num2
    if (op=='add'){
      output = num1+num2
    }
    else if (op=='subtract'){
      output = num1-num2
    }
    else if (op=='multiply'){
      output = num1*num2
    }
    else if (op=='divide'){
      output = num1/num2
    }
    return output
    
  }
  async equals(e){
    //if something in output add to num2
    await this.setState({
      num2: Number(this.state.output),

    })
    let output = this.calculate()
    await this.setState({
      num1: Number(output),
      output: output,
      num2: 0,
      op: 'equals',
      dp: false,
      negative: false,
    })
  }
  
  render() {
    return (
      <div className="App">
      <header>
        <div className='calculator container'>
          <div id="display" className='row display'>
            <div id="showMinus" className='minus'>-</div>{this.state.output}
          </div>
          <div className='buttons align-items-center'>
            <div className='row'>
              <div id="clear" onClick={()=> this.clearAll()} className='btn clear col-6'>AC</div>
              <div id="divide" onClick={()=> this.operation('divide')} className='btn op col-3'>/</div>
              <div id="multiply" onClick={()=> this.operation('multiply')} className='btn op col-3'>X</div>
            </div>
            <div className='row'>
              <div id="seven" onClick={()=> this.clickNumber(7)} className='btn num col-3'>7</div>
              <div id="eight" onClick={()=> this.clickNumber(8)} className='btn num col-3'>8</div>
              <div id="nine" onClick={()=> this.clickNumber(9)} className='btn num col-3'>9</div>
              <div id="subtract" onClick={()=> this.operation('subtract')} className='btn op col-3'>-</div>
            </div>
            <div className='row'>
              <div id="four" onClick={()=> this.clickNumber(4)} className='btn num col-3'>4</div>
              <div id="five" onClick={()=> this.clickNumber(5)} className='btn num col-3'>5</div>
              <div id="six" onClick={()=> this.clickNumber(6)} className='btn num col-3'>6</div>
              <div id="add" onClick={()=> this.operation('add')} className='btn op col-3'>+</div>
            </div>
            <div className='row'>
              <div id="one" onClick={()=> this.clickNumber(1)} className='btn num col-3'>1</div>
              <div id="two" onClick={()=> this.clickNumber(2)} className='btn num col-3'>2</div>
              <div id="three" onClick={()=> this.clickNumber(3)} className='btn num col-3'>3</div>
              <div id="equals" onClick={()=> this.equals()} className='btn equals col-3'>=</div>
            </div>
            <div className='row'>
              <div id="zero" onClick={()=> this.clickNumber(0)} className='btn num col-6'>0</div>
              <div id="decimal" onClick={()=> this.decimal()} className='btn num col-3'>.</div>
              <div className='btn empty col-3'></div>
            </div>
          </div>
        </div>
      </header>
    </div>
    );
  }
}

export default App;

