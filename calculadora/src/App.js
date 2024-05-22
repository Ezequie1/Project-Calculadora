import './App.css';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import battery from './assets/battery.png'
import { useEffect, useState } from 'react';


export default function App() {

  const [time, updateTime] = useState([])
  setTimeout(() => { updateTime( new Date().toTimeString().split(':'))}, 1000)
  const [font, setFont] = useState('100px')
  const [clean, setClean] = useState('AC')
  const [firstValue, setFirstValue] = useState(null)
  const [oneFiled, setOne] = useState(false)
  const [secondValue, setSecondValue] = useState(null)
  const [twoFiled, setTwo] = useState(false)
  const [displayValue, setDisplayValue] = useState('0')
  const [operation, setOperation] = useState(null)

  useEffect(() => {
    switch(displayValue.length){
      case 7:
        setFont('90px')
      break;
      case 8:
        setFont('80px')
      break;
      case 9: 
        setFont('70px')
      break;
      default:
        setFont('100px')
      break;
    }
    displayValue !== '0' ? setClean('C') : setClean('AC')
  })

  function addValue(value){
    if(displayValue.length < 9){
      if(!oneFiled){
        if(displayValue === '0'){
          setDisplayValue(value)
          setFirstValue(Number(value))
        }else{
          setDisplayValue(displayValue + value)
          setFirstValue(Number(displayValue + value))
        }
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
    } 
  }

  function changeNumbersVariations(variation){
    if(!oneFiled){
      if(variation === '+/-'){
        if(Array.from(displayValue)[0] === '-'){
          setDisplayValue(displayValue.substring(1))
          setFirstValue(Number(displayValue.substring(1)))
        }else{
          setDisplayValue('-' + displayValue)
          setFirstValue(Number('-' + displayValue))
        }
      }else{
        setDisplayValue(displayValue + '%')
      }
    }else{
    }
  }

  function addOperation(operator){
    if(!oneFiled && !twoFiled){
      setOperation(operator)
      setOne(true)
    }else{
      getResult()
    }
  }

  function removeValues(){
    if(clean === 'C'){
      displayValue.length === 1 ? setDisplayValue('0') : setDisplayValue(displayValue.slice(0, -1));
    }else{
      setDisplayValue('0')
      setFirstValue(null)
      setOne(false)
      setSecondValue(null)
      setTwo(false)
    }
  }

  function getResult(){
    if(firstValue !== null && operation !== null && Number(displayValue) !== null){
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
      setSecondValue(null)
      setTwo(false) 
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
            <button className='item item1 clear' onClick={ () => removeValues()}>{ clean }</button>
            <button value='+/-' className='item item1 negative' onClick={e => changeNumbersVariations(e.target.value)}>+/-</button>
            <button value='%' className='item percent sign' onClick={e => changeNumbersVariations(e.target.value)}>%</button>
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
            <button value=',' className='item comma'>,</button>
            <button value='=' className='item item3 equals' onClick={e => getResult(e.target.value)}>=</button>
          </div>
      </div>
      <span className='whiteBar'></span>    
    </div>
  );
}
