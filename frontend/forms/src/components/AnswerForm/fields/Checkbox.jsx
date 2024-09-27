const Checkbox = ({ field }) => {
  return (
    <div>
      {
        field.options.map((option, index) => (
          <div key={index}>
            <input type="checkbox" type_id={field.type.id} id={field.id} option_id={option.id} name={field.name} value={option.value} />
            <label htmlFor={option.id}>{option.value}</label>
          </div>
        ))
      }
    </div>
  );
};

export default Checkbox;

