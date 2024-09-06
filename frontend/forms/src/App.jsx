import CreateForm from './components/CreateForm'
import AnswerView from './components/AnswerView'
import Login from './components/Login'
import Map from './components/Map'
import AdminView from './components/AdminView'

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
      "field_name": "Ejemplo de respuesta corta",
      "is_required": true,
      "type_id": 1,
      "type_name": "text"
    },
    {
      "field_id": 2,
      "field_name": "Ejemplo de respuesta larga",
      "is_required": true,
      "type_id": 1,
      "type_name": "text"
    },
    {
      "field_id": 3,
      "field_name": "Este es el desplegable",
      "is_required": true,
      "type_id": 2,
      "type_name": "select",
      "options": [
        {
          "value": 1,
          "label": "Opcion 1"
        },
        {
          "value": 2,
          "label": "Opcion 2"
        },
        {
          "value": 3,
          "label": "Opcion 3"
        }
      ]
    },    
    {
      "field_id": 4,
      "field_name": "este es el checkbox",
      "is_required": true,
      "type_id": 3,
      "type_name": "checkbox",
      "options": [
        {
          "value": 1,
          "label": "Check 1"
        },
        {
          "value": 2,
          "label": "Check 2"
        },
        {
          "value": 3,
          "label": "Check 3"
        }
      ]
    }
  ]
}


function App() {

  return (
    <>
      <CreateForm></CreateForm>
      {/* <AnswerView id={1} /> */}
      {/* <Login></Login> */}
      {/* <Map/> */}
       <AdminView></AdminView> 
    </>
  )
}

export default App
