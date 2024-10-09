import './AdminView.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteForm } from '../../services/formServices.js';

import useFetchData from "../../hooks/useFetchData.js";

import { AdminForm } from '../AdminForm/AdminForm.jsx';

import API_URL from '../../config.js';

export const AdminView = () => {
    const navigate = useNavigate();
    let { data: initialData, loading, error } = useFetchData(`${API_URL}/forms`);
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(initialData);
    }, [initialData])

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error!: {error.message}</div>;
    }

    const handleDelete = (id) => {
        console.log('Eliminar', { "formd.id": id });
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
            <div className="forms-container">
                {
                    data.length > 0 ? data.map((form) => {
                        return <AdminForm key={form.id} form={form} handleDelete={handleDelete} />
                    }) : <div>No hay formularios</div>
                }
                <button className='forms-container-create'
                onClick={() => navigate(`/create`)}>
                    Agregar nuevo formulario
                </button>
            </div>
        </div>
    );
};