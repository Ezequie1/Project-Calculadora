import './App.css';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import battery from './assets/battery.png'
import { useState } from 'react';

export default function App() {

  const [time, updateTime] = useState([])
  setTimeout(() => { updateTime( new Date().toTimeString().split(':'))}, 500)
  const [font, setFont] = useState('5.8rem')
  const [firstValue, setFirstValue] = useState(0)
  const [oneFiled, setOne] = useState(false)
  const [secondValue, setSecondValue] = useState(0)
  const [twoFiled, setTwo] = useState(false)
  const [displayValue, setDisplayValue] = useState('0')
  const [operation, setOperation] = useState(null)

  function addValue(value){
    if(displayValue.length < 9){
      if(!oneFiled){
        setDisplayValue(displayValue === '0' ? value : displayValue + value)
        setFirstValue(Number(displayValue === '0' ? value : displayValue + value))
      }else{
        if(!twoFiled){
          setDisplayValue(value)
          setSecondValue(Number(value))
          setTwo(true)
        }else{
          setDisplayValue(displayValue + value)
          setSecondValue(Number(displayValue + value))
        }
      }

      switch(displayValue.length - (displayValue.split('.').length - 1)){
        case 7:
          setFont('5.2rem')
        break;
        case 8:
          setFont('4.6rem')
        break;
        case 9: 
          setFont('4rem')
        break;
        default:
          setFont('5.8rem')
        break;
      }

      //console.log(`FirstValue: ${firstValue} isFiled: ${oneFiled}`)
      //console.log(`SecondValue: ${secondValue} isFiled: ${twoFiled}`)
      //console.log(`Operation: ${operation}`)
      //console.log(`DisplayValue: ${displayValue}`)
    }
  }

  function removeValues(){
    if(document.getElementById('cleanValue').innerHTML === 'C'){
      displayValue.length === 1 ? setDisplayValue('0') : setDisplayValue(displayValue.slice(0, -1));
    }else{
      setDisplayValue('0')
      setFirstValue(0)
      setOne(false)
      setSecondValue(0)
      setTwo(false)
    }
  }

  function getResult(){
    if(firstValue !== null && operation !== null){
      switch(operation){
        case 'x':
          setDisplayValue(String(firstValue * secondValue))
          setFirstValue(firstValue * secondValue)
        break;
        case '/':
          setDisplayValue(String(firstValue / secondValue))
          setFirstValue(firstValue / secondValue)
        break;
        case '+': 
          setDisplayValue(String(firstValue + secondValue))
          setFirstValue(firstValue + secondValue)
        break;
        case '-': 
          setDisplayValue(String(firstValue - secondValue))
          setFirstValue(firstValue - secondValue)
        break;
        default:
        break;
      }

      setSecondValue(0)
      setTwo(false)
      setOperation(null)
    }

  }

  function changePositiveOrNegative(){
    if(!oneFiled){
        if(Array.from(displayValue)[0] === '-'){
          setDisplayValue(displayValue.substring(1))
          setFirstValue(Number(displayValue.substring(1)))
        }else{
          setDisplayValue('-' + displayValue)
          setFirstValue(Number('-' + displayValue))
        }
    }else{
      if(Array.from(displayValue)[0] === '-'){
        setDisplayValue(displayValue.substring(1))
        setSecondValue(Number(displayValue.substring(1)))
      }else{
        setDisplayValue('-' + displayValue)
        setSecondValue(Number('-' + displayValue))
      }
    }
  }

  function porcentageValue(){
    if(!oneFiled){
      setDisplayValue(String(firstValue / 100))
      setFirstValue(firstValue / 100)
    }else{
      setSecondValue((firstValue * secondValue) / 100)
    }
  }

  function addOperation(operator){
    if(!oneFiled){
      setOperation(operator)
      setOne(true)
    }else{
      setOperation(operator)
    }
  }

  return (
    <div className='smartphone'> 
      <div className='topInfos'>
        <span>{time[0] + ':' + time[1]}</span>
        <div className='fastInfos'>
          <SignalCellularAltRoundedIcon/>
          <WifiRoundedIcon/>
          <img src={battery} alt=''/>
        </div>
      </div>
      <div className='calculator'>
          <div className='result' style={{ fontSize: font }}>
            { displayValue }
          </div>
          <div className='buttons'>
            <button className='item item1 clear' id='cleanValue' onClick={() => removeValues()}>{ displayValue !== '0' ? 'C' : 'AC' }</button>
            <button value='+/-' className='item item1 negative' onClick={() => changePositiveOrNegative()}>+/-</button>
            <button value='%' className='item percent sign' onClick={() => porcentageValue()}>%</button>
            <button value='/' className='item item3 sign' onClick={e => addOperation(e.target.value)}>&divide;</button>
            <button value='7' className='item numbers' onClick={e => addValue(e.target.value)}>7</button>
            <button value='8' className='item numbers' onClick={e => addValue(e.target.value)}>8</button>
            <button value='9' className='item numbers' onClick={e => addValue(e.target.value)}>9</button>
            <button value='x' className='item item3 sign' onClick={e => addOperation(e.target.value)}>x</button>
            <button value='4' className='item numbers' onClick={e => addValue(e.target.value)}>4</button>
            <button value='5' className='item numbers' onClick={e => addValue(e.target.value)}>5</button>
            <button value='6' className='item numbers' onClick={e => addValue(e.target.value)}>6</button>
            <button value='-' className='item item3 sign' onClick={e => addOperation(e.target.value)}>&minus;</button>
            <button value='1' className='item numbers' onClick={e => addValue(e.target.value)}>1</button>
            <button value='2' className='item numbers' onClick={e => addValue(e.target.value)}>2</button>
            <button value='3' className='item numbers' onClick={e => addValue(e.target.value)}>3</button>
            <button value='+' className='item item3 sign' onClick={e => addOperation(e.target.value)}>+</button>
            <button value='0' className='item numbers zero' onClick={e => addValue(e.target.value)}>0</button>
            <button value='.' className='item comma' onClick={e => addValue(e.target.value)}>,</button>
            <button value='=' className='item item3 equals' onClick={e => getResult(e.target.value)}>=</button>
          </div>
      </div>
      <span className='whiteBar'></span>    
    </div>
  );
}
