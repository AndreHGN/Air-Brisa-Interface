import React, {Fragment, useState} from 'react';
import {useFormik} from 'formik';

const TempFields = (props) => {
  const client = props.client;
  const generalTopic = props.generalTopic;
  const uid = props.uid;
  const max = props.tempMaxima;
  const aceitavel = props.tempAceitavel;
  const setMax = props.setTempMaxima;
  const setAceitavel = props.setTempAceitavel;

  const [config, setConfig] = useState(false);

  const formik = useFormik({
    initialValues: {
      max: max,
      aceitavel: aceitavel,
    },
    onSubmit: (values) => {
      setMax(values.max);
      setAceitavel(values.aceitavel);
      client.publish(`${generalTopic}/${uid}/max-temp`, values.max);
      client.publish(`${generalTopic}/${uid}/acceptable-temp`, values.aceitavel);
      setConfig(!config);
    }
  });

  const form = (
    <form onSubmit={formik.handleSubmit}>
      <div className='row mb-2'>
        <div className='col'>Temperatura máxima: </div>
        <input className='col text-center' name="max" value={formik.values.max} onChange={formik.handleChange}/>
        <div className='col d-flex flex-row-reverse'>
          <button className='btn btn-outline-primary' type="submit">Salvar</button>
        </div>
      </div>
      <div className='row'>
        <div className='col'>Temperatura aceitável: </div>
        <input className='col text-center' name="aceitavel" value={formik.values.aceitavel} onChange={formik.handleChange}/>
        <div className='col d-flex flex-row-reverse'>
          <button className='btn btn-outline-secondary' type="cancel" onClick={() => setConfig(false)}>Cancelar</button>
        </div>
      </div>
    </form>
  );
  
  return (
    <Fragment>
      {config ? (
        form
      ) : (
        <div className='row'>
          <div className='col'>
            <div className='mb-3'>Temperatura máxima:</div>
            <div>Temperatura aceitável:</div>
          </div>
          <div className='col text-center'>
            <div className='mb-3'>{max} ºC</div>
            <div>{aceitavel} ºC</div>
          </div>
          <div className='col d-flex flex-row-reverse'>
            <button className='btn btn-outline-secondary' onClick={() => setConfig(!config)}>Configurar</button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default TempFields;