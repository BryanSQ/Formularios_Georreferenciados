export const Checkbox = ({ field }) => {  
  return (
    field.options.map((option, index) => (
      <div key={index}>
        <input type="checkbox" id={field.id} option_id={option.id} name={field.name} value={option.value} />
        <label htmlFor={option.id}>{option.value}-{option.id}</label>
      </div>
    ))
  );
};