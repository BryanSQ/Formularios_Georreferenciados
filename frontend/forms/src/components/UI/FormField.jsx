import Dropdown from "../AnswerForm/fields/Dropdown";
import Checkbox from "../AnswerForm/fields/Checkbox";
import TextBox from "../AnswerForm/fields/TextBox";
import MapField from "../AnswerForm/fields/MapField";
const FormField = ({ field }) => {
  console.log(field);
  return (
    <div className="question-container">
      <label name='question-name' >{field.name}</label>
      {
        field.type.name === 'select'
          ? (<Dropdown field={field} />)
          : field.type.name === 'checkbox'
            ? (<Checkbox field={field} />)
            : field.type.name === 'map'
              ? (<MapField field={field} />)
              : (<TextBox field={field} />)
      }
    </div>
  );
};

export default FormField;