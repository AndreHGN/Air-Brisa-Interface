import React, {Fragment, useState} from 'react';
import Modo from './Modo';
import TempFields from './TempFields';

const Ventilador = (props) => {
  const client = props.client;
  const generalTopic = props.generalTopic;
  const uid = "f0b1a00f-07e0-46f1-8138-31f687ee8920";
  const [isVentLigado, setIsVentLigado] = useState(null);
  const [temp, setTemp] = useState(null);
  const [consumo, setConsumo] = useState(null);
  const [tempMaxima, setTempMaxima] = useState(null);
  const [tempAceitavel, setTempAceitavel] = useState(null);
  const [reset, setReset] = useState(null);
  const [modo, setModo] = useState(null);

  client.on("message", function (topic, message) {
    const value = message.toString();
    console.log(value);
    if (topic === `${generalTopic}/${uid}/temperature`) {
      let intValue = parseInt(value);
      intValue = intValue/100;
      setTemp(intValue);
    } else if (topic === `${generalTopic}/${uid}/energy-consumption`) {
      setConsumo(value);
    } else if (topic === `${generalTopic}/${uid}/active`) {
      setIsVentLigado(value);
    } else if (topic === `${generalTopic}/${uid}/max-temp`) {
      setTempMaxima(value);
    } else if (topic === `${generalTopic}/${uid}/acceptable-temp`) {
      setTempAceitavel(value);
    } else if (topic === `${generalTopic}/${uid}/modo`) {
      setModo(value);
    }
  });

  const handleLigarDesligar = () => {
    if (isVentLigado === "1") {
      client.publish(`${generalTopic}/${uid}/fan`, "0");
    } else {
      client.publish(`${generalTopic}/${uid}/fan`, "1");
    }
  }

  const handleReset = () => {
    if (reset === "1") {
      setReset("0");
      client.publish(`${generalTopic}/${uid}/reset-energy`, "0");
    } else {
      setReset("1");
      client.publish(`${generalTopic}/${uid}/reset-energy`, "1");
    }
  }

  return (
    <div className='ventilador'>
      <h2 className='mb-2'>Ventilador #{props.id}</h2>
      <h5 className='mb-4'>ID: {uid}</h5>
      <hr />
      <div className='row'>
        <div className='col my-auto'>Estado do ventilador: </div>
        {isVentLigado === "1" ? (
          <Fragment>
            <div className='col text-center text-success my-auto'>Ligado</div>
            <div className='col d-flex flex-row-reverse my-auto'>
                <button type="button" className='btn btn-outline-danger' onClick={handleLigarDesligar} disabled={modo === "0"}>Desligar</button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className='col text-center text-danger my-auto'>Desligado</div>
            <div className='col d-flex flex-row-reverse my-auto'><button type="button" className='btn btn-outline-success' onClick={handleLigarDesligar} disabled={modo === "0"}>Ligar</button></div>
          </Fragment>
        )}
      </div>
      <hr />
      <div className='row'>
        <div className='col my-auto'>Temperatura atual:</div>
        <div className='col text-center my-auto'> {temp} ºC</div>
        <div className='col'></div>
      </div>
      <hr />
      <div className='row'>
        <div className='col my-auto'>Consumo energético:</div>
        <div className='col text-center my-auto'> {consumo} kWh</div>
        <div className='col d-flex flex-row-reverse my-auto'><button className='btn btn-outline-secondary' onClick={handleReset}>Reset</button></div>
      </div>
      <hr />
      <TempFields
        tempMaxima={tempMaxima}
        tempAceitavel={tempAceitavel}
        setTempAceitavel={setTempAceitavel}
        setTempMaxima={setTempMaxima}
        client={client}
        generalTopic={generalTopic}
        uid={uid}
      />
      <hr />
      <Modo
        client={client}
        generalTopic={generalTopic}
        uid={uid}
        modo={modo}
        />
      <hr />
    </div>
  );
}

export default Ventilador;