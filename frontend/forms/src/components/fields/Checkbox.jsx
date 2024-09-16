const Checkbox = ({ field }) => {  
  return (
    field.options.map((option, index) => (
      <div key={index} className="question-box">
        <input type="checkbox" id={field.id} option_id={option.id} name={field.name} value={option.value} />
        <label htmlFor={option.id}>{option.value}</label>
      </div>
    ))
  );
};

export default Checkbox;