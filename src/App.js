import React from 'react';
import mqtt from 'mqtt/dist/mqtt';
import Ventilador from './components/Ventilador';
import logo from './fan.png';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const host = "ws://broker.mqttdashboard.com:8000/mqtt";
const client = mqtt.connect(host);

const generalTopic = "PCS3734-2022/airbrisa";

client.subscribe(`${generalTopic}/#`);

function App() {
  return (
    <div className='App'>
      <div className='header'>
        <img sizes='50px' className='logo' src={logo} alt='fan' />
        <p>AirBrisa</p>
      </div>
      <div className="cards">
        <Ventilador id={1} client={client} generalTopic={generalTopic} />
      </div>
    </div>
  );
}

export default App;
