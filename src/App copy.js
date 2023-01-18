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
      output: 0,
      dp: false,
      op: '',
      opClick: false
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
  clickNumber(num){
    let numin = 0
    if (this.state.op=='equals'){
      this.setState({
        output: 0,
        num1: 0,
        num2: 0,
        dp: false,
        op: '',
        opClick: false,
      })
      numin = 0
    }
    //just pressed decimal point
    else if (this.state.dp==true){
      numin = this.state.output
    }
    //second number picked
    else if (this.state.op=='add' || this.state.op=='subtract' || this.state.op=='multiply' || this.state.op=='divide'){
      console.log('herre')
      this.setState({
        output: num,
        num2: num,
      //  num2: 0,
       // dp: false,
      })
      //just clicked operation button
      if (this.state.opClick){
        numin = 0
      }
      else{
        numin = this.state.output
      }
      
    }
    else{
      numin = this.state.output
    }
    
    
    if (num!=0){
      numin = ""+numin+num
      numin = Number(numin)
    }
    else{
      if (numin!==0){
        numin = ""+numin+num
      }
      
    }
    if (this.state.num1!=0){
      this.setState({
        num2: numin,
        output: numin
      })
    }
    else{
      this.setState({output: numin})
    }
    
    console.log(this.state)
  }
  clearAll(){
    this.setState({
      output: 0,
      num1: 0,
      num2: 0,
      dp: false,
      op: '',
      negative: false,
      opClick: false
    })
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
  operation(op){
    if (this.state.num1==0){
      this.setState({
        num1: this.state.output,
        output: 0
      })
    }
    else if (this.state.num1!=0 && this.state.num2==0){
      this.setState({
        num2: this.state.output,
        output: 0
      })
    }
    //if 
    if (op=='subtract' && this.state.num1==0){
      this.setState({
        negative: true,
      })
      document.getElementById('showMinus').style.display = "block";
    }
    else if (op=='subtract' && this.state.num2==0){
      this.setState({
        negative: true,
      })
      document.getElementById('showMinus').style.display = "block";
    }
    else if(this.state.num1!=0){
      this.equals(op)
      document.getElementById('showMinus').style.display = "none";
    }
    else if(this.state.op!=''){
      this.setState({
        op: op,
      })
      document.getElementById('showMinus').style.display = "none";
    }
    else if(this.state.output!=0){
      document.getElementById('showMinus').style.display = "none";
      let num = this.state.output
      if (this.state.negative){
        num = num*-1
      }
      this.setState({
        num1: num,
        dp: false,
        op: op,
        negative: false,
        opClick: true
      })
    }
    
    console.log(this.state)
  }
  equals(e){
    console.log(this.state)
    let calc = 0;
    let num1 = this.state.num1
    let num2 = this.state.num2
    if (this.state.negative){
      num2 = num2*-1
    }
    let op = this.state.op
    if (op!=''){
      if (op=='add'){
        calc = num1+num2
      }
      else if (op=='subtract'){
        calc = num1-num2
      }
      else if (op=='multiply'){
        calc = num1*num2
      }
      else if (op=='divide'){
        calc = num1/num2
      }
    }
    if (e){
      console.log('heee')
      this.setState({
        num1: calc,
        num2: 0,
        dp: false,
        output: 0,
        op: e,
        negative: false,
        opClick: false
      })
    }
    else{
      this.setState({
        num1: 0,
        num2: 0,
        dp: false,
        output: calc,
        op: 'equals',
        negative: false,
        opClick: false
      })
    }
    
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

