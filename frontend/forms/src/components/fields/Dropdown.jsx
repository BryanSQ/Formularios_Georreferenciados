export const Dropdown = ({ field }) => {
  return (
    <select id={field.id} name={field.name}>
      {field.options.map((option, index) => (
        <option id={option.id} key={index} value={option.value}>{option.value}-{option.id}</option>
      ))}
    </select>
  );
};