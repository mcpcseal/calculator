import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
let n1_str :string = "";
let n2_str :string = "";
let operator :string = "";

let is_first_num :boolean = true;
let display_string = "";
let change_display :Function;

function App() {
  [display_string, change_display] = useState("");
  return (
    <>
      <div className="text-center">
        <div className="row row-double">
          <input className="form-control" type="text" value={display_string} readOnly></input>
        </div>
        <div className="row">
          {NumButton(7)}
          {NumButton(8)}
          {NumButton(9)} 
          {OperatorButton("+")}
        </div>
        <div className="row">
          {NumButton(4)}
          {NumButton(5)}
          {NumButton(6)}
          {OperatorButton("-")}
        </div>
        <div className="row">
          {NumButton(1)}
          {NumButton(2)}
          {NumButton(3)}
          {OperatorButton("+")}
        </div>
        <div className="row">
          <div className="col"></div>
          {NumButton(0)}
          <div className="col"></div>
          {ResultButton()}
        </div>
      </div>
    </>
  )
}

function NumButton(value :number) {
  let num :number = value;
  return (
    <>
      <div className="col">
        <button type="button" className="my-2 btn btn-lg btn-light" 
        onClick={ () => {
          if (is_first_num) {
            n1_str += String(num);
          }
          else {
            n2_str += String(num);
          }
          update_display(n1_str + operator + n2_str);
        }
        }>{ num }</button>
      </div>
    </>
  )
}

function OperatorButton(value :string) {
  let op :string = value;
  return (
    <>
      <div className="col">
        <button type="button" className="my-2 btn btn-lg btn-light"
        onClick={ () => {
          operator = op;
          is_first_num = false;
          update_display(n1_str + operator + n2_str);
        }}>{ op }</button>
      </div>
    </>
  )
}

function ResultButton() {
  return (
    <>
      <div className="col">
        <button type="button" className="my-2 btn btn-lg btn-primary"
        onClick={ () => { 
          if (false == is_first_num) {
            let n1 = Number(n1_str);
            let n2 = Number(n2_str);
            let result = calculate(operator, n1, n2);
            update_display(String(result));
            n1_str = "";
            n2_str = "";
            operator = "";
            is_first_num = true;
          }
        }}>=</button>
      </div>
    </>
  )
}

function update_display(value:string) {
  change_display(value);
}

function calculate(operator:string, n1:number, n2:number) :number | null {
  let result :number = 0;
  switch (operator) {
    case '+':
      result = Number(n1) + Number(n2);
      break;
    case '-':
      result = Number(n1) - Number(n2);
      break;
    case 'x':
      result = Number(n1) * Number(n2);
      break;
    case '/':
      if (0 != n2) {
        result = Number(n1) / Number(n2);
      }
      else {
        return null;
      }
      break;
    default:
      break;
  }
  return result;
}

export default App
