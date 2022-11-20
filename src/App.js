import './App.css';
import Exifreader from './components/Exifreader';
import Qrcode from './components/Qrcode';
import CurrentMap from './components/CurrentMap';
import { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLong] = useState(null);
  const [desc, setDesc] = useState("");
  const setButton = () => {
    setShow(!show);
  }
  const setLati = (param) => {
    setLat(param)
  }
  const setLongi = (param) => {
    setLong(param)
  }
  const setDescrip = (param) =>{
    setDesc(param)
  }
  return (
    <div className="App">
      <header className="App-header">
        {show === false ? null : 
          <Qrcode 
            btnshow={setButton}
            setLatState={setLati}
            setLongState={setLongi}
            setDescrip={setDescrip}
          />        
        }
        <button onClick={() => setButton()}>{show === false ? "Scan QR" : "Stop Scanning"}</button>
      <Exifreader setLatState={setLati} setLongState={setLongi} setDescrip={setDescrip} />
      <CurrentMap currLat={lat} currLng={lng} desc={desc} />
      </header>
    </div>
  );
}

export default App;
