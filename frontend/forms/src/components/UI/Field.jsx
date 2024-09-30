import List from "./List";

export const Field = ({ type, options }) => {

  const renderInputField = () => {
    switch (type) {
      case 1:
        return <input type="text" placeholder={"Texto de respuesta corta"} disabled></input>
      case 2:
        return <input type="text" placeholder={"Texto de respuesta larga"} disabled></input>
      case 3:
      case 4:
        return <List type={type} fieldOptions={options}/>;
      default:
        return <div>Mapa</div>;
    }
  };

  return (
    <>
      {renderInputField()}
    </>
  );
};