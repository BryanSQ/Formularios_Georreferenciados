const formMock = {
  "form": {
      "id": 1,
      "name": "Formulario de Prueba 2",
      "description": "Formulario de Prueba 2",
      "code": "FIgYj0",
      "is_visible": 0,
      "created_by": null,
      "created_at": "2024-08-31 19:51:57",
      "updated_by": null,
      "updated_at": "2024-08-31 19:51:57"
  },
  "fields": [
      {
          "field_id": 1,
          "field_name": "Nombre",
          "is_required": true,
          "type_id": 1,
          "type_name": "texto"
      },
      {
          "field_id": 2,
          "field_name": "Apellido",
          "is_required": true,
          "type_id": 1,
          "type_name": "texto"
      },{
        "field_id": 3,
        "field_name": "Respuesta multiple",
        "is_required": true,
        "type_id": 3,
        "type_name": "checkbox"
    }
  ]
}

const AnswerView = () => {
  return(
    <div>
      <h1>Formulario: {formMock.form.name}</h1>
      <p>{formMock.form.description}</p>
      <form>
        {formMock.fields.map((field, index) => (
          <div key={index}>
            <label>{field.field_name}</label>
            <input type={field.type_name} />
          </div>
        ))}
        <button>Enviar</button>
      </form>
    </div>
  )
};

export default AnswerView;