import { useState } from "react";

import { v4 as uuidv4 } from 'uuid';

const List = ({ type }) => {

  const [options, setOptions] = useState([]);

  const addOption = () => {
    setOptions([...options, { id: uuidv4() }]);
  }

  const removeOption = (id) => {
    setOptions(options.filter(option => option.id !== id));
  }

  return (
    <>
      <div name="options" className="question-box-body">
        {
          options.map(({ id }, index) => {
            return (
              <div key={id}>
                <input
                  type_id={type}
                  name={`option-${index}`}
                  type="text"
                  placeholder={`Opción ${index + 1}`}
                />
                <button className='delete-button' type='button' onClick={() => removeOption(id)}>Eliminar opción</button>
              </div>
            )
          })
        }
      <button className="add-option" type='button' onClick={addOption}>Agregar opción</button>
      </div>
    </>
  );

}

export default List;