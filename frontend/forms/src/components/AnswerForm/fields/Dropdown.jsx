const Dropdown = ({ field }) => {
  return (
    <select id={field.id} type_id={field.type.id} name={field.name}>
      {field.options.map((option, index) => (
        <option id={option.id} key={index} value={option.value}>{option.value}</option>
      ))}
    </select>
  );
};

export default Dropdown;