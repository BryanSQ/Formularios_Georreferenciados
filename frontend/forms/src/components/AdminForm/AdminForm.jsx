import './AdminForm.css';
import { useNavigate } from 'react-router-dom';

import visibleIcon from '../../assets/visible.png';
import notVisibleIcon from '../../assets/invisible.png';
import API_URL from '../../config';

export const AdminForm = ({ form, handleDelete }) => {
    const navigate = useNavigate();
    const prepareUrl = () => {
        if (API_URL.includes('localhost')) {
            return API_URL.replace('/api', ':5173');
        } else {
            return API_URL.substring(0, API_URL.length - 4);
        }
    }

    return (
        <div className="form">
            <div className='info'>
                <h2>{form.name}</h2>
                <p>{form.description}</p>
                <div className='info-buttons'>
                    <img 
                        className='visibility-icon'
                        src={form.is_visible ? visibleIcon : notVisibleIcon}
                        alt={form.is_visible ? 'Visible' : 'No visible'} />
                    <p className='code'>{form.code}</p>
                </div>
                <div className='code'>{`${prepareUrl()}/answer/${form.code}`}</div>
            </div>
            <div className="buttons">
                <button onClick={() => navigate(`/edit/${form.id}`)}>Editar</button>
                <button onClick={() => handleDelete(form.id)}>Eliminar</button>
                <button onClick={() => navigate(`/table/${form.id}`)}>Vista de resultados tabular</button>
                <button onClick={() => navigate(`/map/${form.id}`)}>Vista de resultados mapa</button>
                <button onClick={() => navigate(`/preview/${form.id}`)}>Vista previa</button>
                <button onClick={() => navigate(`/answer/${form.id}`)}>Vista de responder formulario</button>
            </div>
        </div>
    );
};