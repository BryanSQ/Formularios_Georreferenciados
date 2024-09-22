import { useState } from "react";

import { v4 as uuidv4 } from 'uuid';

const EditList = ({ type, optionList }) => {

  const [options, setOptions] = useState(optionList);

  const addOption = () => {
    setOptions([...options, { id: uuidv4() }]);
  }

  const removeOption = (id) => {
    setOptions(options.filter(option => option.id !== id));
  }


  //console.log('Options:', options);

  return (
    <div name="options">
      {
        options.map(({ id, value }, index) => {
          return (
            <div key={id}>
              <input
                id={id}
                className="multiple"
                type_id={type}
                name={`option-${index}`}
                type="text"
                placeholder={`Opción ${index + 1}`}
                defaultValue={value}
              />
              <button type='button' onClick={() => removeOption(id)}>Eliminar opción</button>
            </div>
          )
        })
      }
      <button type='button' onClick={addOption}>Agregar opción</button>
    </div>
  );

}
// ruta para actualizar el option
// 

export default EditList;