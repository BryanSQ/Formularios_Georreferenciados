import { Dropdown } from "./fields/Dropdown";
import { Checkbox } from "./fields/Checkbox";

const FormField = ({ field }) => {
  return (
    <div>
      <label>{field.name}</label>      
      {
        field.type.name === 'select' 
        ? ( <Dropdown field={field} />)  
        : field.type.name === 'checkbox' 
          ? ( <Checkbox field={field} /> ) 
            // If the field is not a select or a checkbox, render a simple input element
          : ( <input id={field.id} name={field.name} type={field.type.name} />
        )
      }
    </div>
  );
};

export default FormField;