import AdminForm from './AdminForm.jsx';
import './styles/AdminView.css';
import useFetchData from "../hooks/useFetchData.js";

function AdminView() {
    const { data, loading, error } = useFetchData('http://localhost/forms');
    
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    return (
        <div className="admin-view">
            <h1>Administración de formularios</h1>
            <button className="create-button">Crear un formulario</button>
            <div className="forms-container">
                {data.map((form) => {
                    return (
                        <AdminForm key={form.id} form={form} />
                    );
                })}
            </div>         
        </div>
    );
}

export default AdminView;