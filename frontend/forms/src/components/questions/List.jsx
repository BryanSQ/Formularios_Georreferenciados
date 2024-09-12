const List = ({id, options, addOption, handleChangeOptions, removeOption}) => {

  return (
    <>
      {options.map((_, index) => (
        <div key={index}>
          <input
            type="text"
            value={options[index] || ''}
            onChange={(event) => handleChangeOptions(id, index, event)}
            placeholder={`Opción ${index + 1}`}
          />
          <button onClick={() => removeOption(id, index)}>Eliminar opción</button>
        </div>
      ))}
      <button onClick={() => addOption(id)}>Agregar opción</button>
    </>
  );

}

export default List;