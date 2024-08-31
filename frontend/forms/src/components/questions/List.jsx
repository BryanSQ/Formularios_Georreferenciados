const List = ({id, options, addOption, handleChangeOptions, removeOption}) => {

  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            value={option}
            onChange={(event) => handleChangeOptions(id, index, event)}
            placeholder={`Opción ${index + 1}`}
          />
          <button onClick={() => removeOption(id, index)}>Eliminar opción</button>
        </div>
      ))}
      <button onClick={() => addOption(id)}>Add Option</button>
    </div>
  );

}

export default List;