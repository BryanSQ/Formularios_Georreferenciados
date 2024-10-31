import './AdminView.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteForm } from '../../services/formServices.js';

import useFetchData from "../../hooks/useFetchData.js";

import { AdminForm } from '../AdminForm/AdminForm.jsx';
import { ConfirmMessage } from '../helper/ConfirmMessage.jsx';

import API_URL from '../../config.js';

export const AdminView = () => {
    const navigate = useNavigate();
    let { data: initialData, loading, error } = useFetchData(`${API_URL}/forms`);
    const [data, setData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [formToBeDeleted, setFormToBeDeleted] = useState(null);

    useEffect(() => {
        setData(initialData);
    }, [initialData])

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error!: {error.message}</div>;
    }

    const prepareDelete = (form) => {
        setFormToBeDeleted(form);
        setIsOpen(true);
    }

    const handleDelete = () => {
        let id = formToBeDeleted.id;
        deleteForm(id)
            .then(() => {
                console.log('Formulario eliminado');
                setData(data.filter((form) => form.id !== id));
                setIsOpen(false);
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
                    data.length > 0 ? data.map((form, i) => {
                        return <AdminForm key={form.id} form={form} prepareDelete={prepareDelete}/>
                    }) : <div>No hay formularios</div>
                }
                {isOpen && <ConfirmMessage message={`¿Desea eliminar el formulario "${formToBeDeleted.name}"?`}
                onConfirm={() => handleDelete(8)}
                onCancel={() => setIsOpen(false)} />}
                <button className='forms-container-create'
                onClick={() => navigate(`/create`)}>
                    Agregar nuevo formulario
                </button>
            </div>
        </div>
    );
};