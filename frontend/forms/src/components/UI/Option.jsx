export const Option = ({ id, children, removeFunction }) => {
  return (
    <div key={id}>
      {children}
      <button className='delete-button' type='button' onClick={() => removeFunction(id)}>Eliminar opción</button>
    </div>
  )
};

//<input type_id={type} name={`option-${index}`} type="text" placeholder={`Opción ${index + 1}`} />