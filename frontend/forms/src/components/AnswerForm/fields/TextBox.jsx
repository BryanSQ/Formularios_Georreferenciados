const TextBox = ({ field }) => {
  if(field.type.name === 'short'){
    return (
      <div>
        <input id={field.id} type_id={field.type.id} name={field.name} type={field.type.name} />
      </div>
    );
  }
  else {
    return (
      <div>
        <textarea className="text-area" id={field.id} type_id={field.type.id} name={field.name} type={field.type.name}/>
      </div>
    );
  }
};

export default TextBox;