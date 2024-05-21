import './App.css';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import battery from './assets/battery.png'
import { useState } from 'react';


export default function App() {

  const [time, updateTime] = useState([]);
  setTimeout(() => { updateTime( new Date().toTimeString().split(':'))}, 1000)

  const [clean, setClean] = useState('AC')
  const [result, setResult] = useState('0');

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
          <div className='result'>
            <span>{ result }</span>
          </div>
          <div className='buttons'>
            <button className='item item1 clear' onClick={ () => setResult('0')}>{clean}</button>
            <button className='item item1 negative'>+/-</button>
            <button className='item percent sign'>%</button>
            <button className='item item3 sign'>&divide;</button>
            <button className='item numbers'>7</button>
            <button className='item numbers'>8</button>
            <button className='item numbers'>9</button>
            <button className='item item3 sign'>x</button>
            <button className='item numbers'>4</button>
            <button className='item numbers'>5</button>
            <button className='item numbers'>6</button>
            <button className='item item3 sign'>&minus;</button>
            <button className='item numbers'>1</button>
            <button className='item numbers'>2</button>
            <button className='item numbers'>3</button>
            <button className='item item3 sign'>+</button>
            <button className='item numbers zero'>0</button>
            <button className='item comma'>,</button>
            <button className='item item3 equals'>=</button>
          </div>
      </div>
      <span className='whiteBar'></span>    
    </div>
  );
}
