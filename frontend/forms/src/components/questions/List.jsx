import { useState } from "react";

const List = ({ type }) => {

  const [options, setOptions] = useState(1);

  const addOption = () => {
    setOptions(options + 1);
  }

  const removeOption = () => {
    setOptions(options - 1);
  }


  return (
    <div name="options">
      {
        Array.from({length: options}, (_, index) => (
          <div key={index}>
            <input
              className="multiple"
              type_id={type}
              name={`option-${index}`}
              type="text"
              placeholder={`Opción ${index + 1}`}
            />
            <button onClick={removeOption}>Eliminar opción</button>
          </div>
        ))
      }

      <button onClick={addOption}>Agregar opción</button>
    </div>
  );

}

export default List;