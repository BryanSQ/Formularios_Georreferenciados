import './styles/AdminForm.css';
import { useNavigate } from 'react-router-dom';

function AdminForm({ form, handleDelete }) {
    const navigate = useNavigate();

    return (
        <div className="forms">
            <h2>{form.name}</h2>
            <p>{form.description}</p>
            <p>{form.is_visible ? 'Visible' : 'No visible'}</p>
            <div className="buttons">
                <button onClick={() => navigate(`/edit/${form.id}`)}>Editar</button>
                <button onClick={() => handleDelete(form.id)}>Eliminar</button>
                <button onClick={() => navigate(`/table/${form.id}`)}>Vista de resultados tabular</button>
                <button onClick={() => navigate(`/map/${form.id}`)}>Vista de resultados mapa</button>
                <button onClick={() => navigate(`/answer/${form.id}`)}>Vista de responder formulario</button>
            </div>
        </div>
    );
}

export default AdminForm;