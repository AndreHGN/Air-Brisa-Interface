import React, {Fragment, useState} from 'react';
import TempFields from './TempFields';

const Ventilador = (props) => {
  const client = props.client;
  const generalTopic = props.generalTopic;
  const [isVentLigado, setIsVentLigado] = useState(0);
  const [temp, setTemp] = useState(0);
  const [consumo, setConsumo] = useState(0);
  const [isSistemaAtivo, setIsSistemaAtivo] = useState(0);
  const [tempMaxima, setTempMaxima] = useState(0);
  const [tempAceitavel, setTempAceitavel] = useState(0);
  const [reset,setReset] = useState("0");

  client.on("message", function (topic, message) {
    const value = message.toString();
    console.log(value);
    if (topic === `${generalTopic}/fan`) {
      setIsVentLigado(value);
    } else if (topic === `${generalTopic}/temperature`) {
      setTemp(value);
    } else if (topic === `${generalTopic}/energy-consumption`) {
      setConsumo(value);
    } else if (topic === `${generalTopic}/active`) {
      setIsSistemaAtivo(value);
    } else if (topic === `${generalTopic}/max-temp`) {
      setTempMaxima(value);
    } else if (topic === `${generalTopic}/acceptable-temp`) {
      setTempAceitavel(value);
    }
  });

  const handleActivate = () => {
    if (isSistemaAtivo === "1") {
      setIsSistemaAtivo("0");
      client.publish(`${generalTopic}/active`, "0");
    } else {
      setIsSistemaAtivo( "1");
      client.publish(`${generalTopic}/active`, "1");
    }
  }

  const handleReset = () => {
    if (reset === "1") {
      setReset("0");
      client.publish(`${generalTopic}/reset-energy`, "0");
    } else {
      setReset("1");
      client.publish(`${generalTopic}/reset-energy`, "1");
    }
  }

  return (
    <div className='ventilador'>
      <h2 className='mb-4'>Ventilador #{props.id}</h2>
      <hr />
      <div className='row'>
        <div className='col'>Estado do sistema: </div>
        {isSistemaAtivo === "1" ? (
          <Fragment>
            <div className='col text-center text-success'>Ativo</div>
            <div className='col d-flex flex-row-reverse'><button type="button" className='btn btn-outline-danger' onClick={handleActivate}>Desativar</button></div>
          </Fragment>
        ) : (
          <Fragment>
            <div className='col text-center text-danger'>Inativo</div>
            <div className='col d-flex flex-row-reverse'><button type="button" className='btn btn-outline-success' onClick={handleActivate}>Ativar</button></div>
          </Fragment>
        )}
      </div>
      <hr />
      <div className='row'>
        <div className='col'>Estado do ventilador: </div>
        {isVentLigado === "1" ? (
            <div className='col text-center text-success'>Ligado</div>
        ) : (
            <div className='col text-center text-danger'>Desligado</div>
        )}
        <div className='col'></div>
      </div>
      <hr />
      <div className='row'>
        <div className='col'>Temperatura atual:</div>
        <div className='col text-center'> {temp} ºC</div>
        <div className='col'></div>
      </div>
      <hr />
      <div className='row'>
        <div className='col'>Consumo energético:</div>
        <div className='col text-center'> {consumo} kWh</div>
        <div className='col d-flex flex-row-reverse'><button className='btn btn-outline-secondary' onClick={handleReset}>Reset</button></div>
      </div>
      <hr />
      <TempFields
        tempMaxima={tempMaxima}
        tempAceitavel={tempAceitavel}
        setTempAceitavel={setTempAceitavel}
        setTempMaxima={setTempMaxima}
        client={client}
        generalTopic={generalTopic}
      />
      <hr />
    </div>
  );
}

export default Ventilador;