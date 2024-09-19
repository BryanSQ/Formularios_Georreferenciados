import AdminForm from './AdminForm.jsx';
import './styles/AdminView.css';
import useFetchData from "../hooks/useFetchData.js";
import { deleteForm } from '../services/formServices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminView() {
    const navigate = useNavigate();
    let { data: initialData, loading, error } = useFetchData('http://localhost/forms');
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(initialData);
    }, [initialData])

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleDelete = (id) => {
        console.log('Eliminar', {"formd.id" : id});
        deleteForm(id)
            .then(() => {
                console.log('Formulario eliminado');
                setData(data.filter((form) => form.id !== id));
            })
            .catch((error) => {
                console.error('Error al eliminar el formulario', error);
            }
        );

        
    }
    
    return (
        <div className="admin-view">
            <h1>Administración de formularios</h1>
            <button className="create-button" onClick={() => navigate(`/create`)}>Crear un formulario</button>
            <div className="forms-container">
                {
                    data.length > 0 ? data.map((form) => {
                        return <AdminForm key={form.id} form={form} handleDelete={handleDelete} />
                    }) : <div>No hay formularios</div>
                }
            </div>         
        </div>
    );
}

export default AdminView;