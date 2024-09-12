import Dropdown from "./fields/Dropdown";
import Checkbox from "./fields/Checkbox";
import TextBox from "./fields/TextBox";
import AnswerMap from "./AnswerMap";

const FormField = ({ field }) => {
  return (
    <div className="questions">
      <div className="question-box">
        <label>{field.name}</label>      
        {
          field.type.name === 'select' 
          ? ( <Dropdown field={field} />)  
          : field.type.name === 'checkbox' 
            ? ( <Checkbox field={field} /> ) 
            : field.type.name === 'map'
              ? ( <AnswerMap />)// If the field is not a select or a checkbox, render a simple input element
              : ( <TextBox field={field} /> )
        }
      </div>
    </div>
  );
};

export default FormField;