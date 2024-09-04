import './styles/AdminForm.css';

function AdminForm({ form }) {

    const handleDelete = () => {
        console.log('Eliminar', {"formd.id" : form.id});
    }
    return (
        <div className="forms">
            <h2>{form.name}</h2>
            <p>{form.description}</p>
            <p>{form.is_visible ? 'Visible' : 'No visible'}</p>
            <div className="buttons">
                <button>Editar</button>
                <button onClick={handleDelete}>Eliminar</button>
            </div>
        </div>
    );
}

export default AdminForm;