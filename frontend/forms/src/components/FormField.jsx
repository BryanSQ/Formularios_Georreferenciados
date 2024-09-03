const FormField = ({ field }) => {
  console.log(field);
  return (
    <div>
      <label>{field.name}</label>      
      {
        field.type.name === 'select' ? (
          <select>
            {field.options.map((option, index) => (
              <option key={index} value={option.value}>{option.value}</option>
            ))}
          </select>
        ) : field.type.name === 'checkbox' ? (
          field.options.map((option, index) => (
            <div key={index}>
              <input type="checkbox" id={option.value} name={field.name} value={option.value} />
              <label htmlFor={option.value}>{option.value}</label>
            </div>
          ))
        ) : (
          <input type={field.type} />
        )
      }
    </div>
  );
};

export default FormField;