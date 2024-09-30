import { useState } from "react";

import { v4 as uuidv4 } from 'uuid';
import { Option } from "./Option";

const List = ({ type, fieldOptions }) => {

  const [options, setOptions] = useState(fieldOptions || []);

  const addOption = () => {
    setOptions([...options, { id: uuidv4() }]);
  }

  const removeOption = (id) => {
    setOptions(options.filter(option => option.id !== id));
  }

  return (
    <>
      {
        (options.length === 0 

          ? options.map(({ id }, index) => {
            return (
              <Option key={id} id={id} removeFunction={removeOption} >
                <input
                  id={id}
                  type_id={type}
                  name={`option-${index}`}
                  type="text"
                  placeholder={`Opción ${index + 1}`}
                />
              </Option>
            )
          })



          : options.map(({ id, value }, index) => {
            return (
              <Option key={id} id={id} removeFunction={removeOption} >
                <input
                  id={id}
                  type_id={type}
                  name={`option-${index}`}
                  type="text"
                  placeholder={`Opción ${index + 1}`}
                  defaultValue={value}
                />
              </Option>
            )
          }))
      }
      <button className="add-option" type='button' onClick={addOption}>Agregar opción</button>
    </>
  );

}

export default List;
