import React, {Fragment, useState} from 'react';
import {useFormik} from 'formik';

const Modo = (props) => {
  const client = props.client;
  const generalTopic = props.generalTopic;
  const uid = props.uid;
  const modo = props.modo;
  //const setModo = props.setModo;

  const [config, setConfig] = useState(false);

  const formik = useFormik({
    initialValues: {
      modo: modo,
    },
    onSubmit: (values) => {
      client.publish(`${generalTopic}/${uid}/modo`, values.modo);
      setConfig(!config);
    }
  });

  const form = (
    <form onSubmit={formik.handleSubmit}>
      <div className='row'>
        <div className='col my-auto'>Modo: </div>
        <select
          className="col form-select mb-3 my-auto "
          aria-label=".form-select-lg example"
          name="modo"
          onChange={formik.handleChange}
          value={formik.values.modo}
        >
          <option value="">Selecione o modo</option>
          <option value="0">Automático</option>
          <option value="1">Manual</option>
        </select>
        <div className='col'>
          <div className='d-flex flex-row-reverse mb-2'>
            <button className='btn btn-outline-primary' type="submit">Salvar</button>
          </div>
          <div className='d-flex flex-row-reverse'>
          <button className='btn btn-outline-secondary' type="cancel" onClick={() => setConfig(false)}>Cancelar</button>
          </div>
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
            <div className='col my-auto'>Modo:</div>
          <div className='col text-center my-auto'>
            {modo === "0" ? "Automático" : "Manual"}
          </div>
          <div className='col d-flex flex-row-reverse'>
            <button className='btn btn-outline-secondary' onClick={() => setConfig(!config)}>Configurar</button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Modo;