import { useState, useEffect } from "react";
import AdminForm from './AdminForm.jsx';
import './styles/AdminView.css';

function AdminView() {
    const [forms, setForms] = useState([]);
    useEffect(() => {
        setForms([
            {
                "id": 1,
                "name": "Formulario1",
                "description": "Descripción del Formulario1",
                "is_visible": 0
            },
            {
                "id": 2,
                "name": "Formulario2",
                "description": "Descripción del Formulario2",
                "is_visible": 1
            },
            {
                "id": 3,
                "name": "Formulario3",
                "description": "Descripción del Formulario3",
                "is_visible": 0
            }
        ]);
    }, []);

    return (
        <div className="admin-view">
            <h1>Administración de formularios</h1>
            <button className="create-button">Crear un formulario</button>
            <div className="forms-container">
                {forms.map((form) => {
                    return (
                        <AdminForm key={form.id} form={form} />
                    );
                })}
            </div>         
        </div>
    );
}

export default AdminView;