const FormField = ({ field }) => {
  return (
    <div>
      <label>{field.name}</label>      
      {
        field.type === 'select' ? (
          <select>
            {field.options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : field.type === 'checkbox' ? (
          field.options.map((option, index) => (
            <div key={index}>
              <input type="checkbox" id={option.value} name={field.name} value={option.value} />
              <label htmlFor={option.value}>{option.label}</label>
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