const TextBox = ({ field }) => {
  return (
    <div>
      <input id={field.id} name={field.name} type={field.type.name} />
    </div>
  );
};

export default TextBox;