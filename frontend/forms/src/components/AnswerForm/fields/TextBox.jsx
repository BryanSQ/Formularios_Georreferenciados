const TextBox = ({ field }) => {
  if(field.type.name === 'short'){
    return (
      <div>
        <input id={field.id} type_id={field.type.id} name={field.name} type={field.type.name} placeholder="Tu respuesta" />
      </div>
    );
  }
  else {
    return (
      <div>
        <textarea className="text-area" id={field.id} type_id={field.type.id} name={field.name} type={field.type.name} placeholder="Tu respuesta"/>
      </div>
    );
  }
};

export default TextBox;