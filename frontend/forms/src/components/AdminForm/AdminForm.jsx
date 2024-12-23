import './AdminForm.css';
import { useNavigate } from 'react-router-dom';

import visibleIcon from '../../assets/visible.png';
import notVisibleIcon from '../../assets/invisible.png';
import API_URL from '../../config';

import clipboard from '../../assets/copy-clipboard.svg';

export const AdminForm = ({ form, prepareDelete }) => {
    const navigate = useNavigate();
    const prepareUrl = () => {
        if (API_URL.includes('localhost')) {
            return API_URL.replace('/api', ':5173');
        } else {
            return API_URL.substring(0, API_URL.length - 4);
        }
    }

    const copyToClipboard = async () => {
        try {
            navigator.clipboard.writeText(`${prepareUrl()}/answer/${form.code}`);
        }
        catch (err) {
            console.error(err.message)
        }
            
    };

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
                <div className='code'>
                    {`${prepareUrl()}/answer/${form.code}`}
                    <button style={{border: 'none'}} onClick={copyToClipboard}>
                        <img src={clipboard} alt='Copy to clipboard' />
                    </button>
                    
                </div>
            </div>
            <div className="buttons">
                <button onClick={() => navigate(`/edit/${form.id}`)}>Editar</button>
                <button onClick={() => prepareDelete(form)}>Eliminar</button>
                <button onClick={() => navigate(`/table/${form.id}`)}>Vista de resultados tabular</button>
                <button onClick={() => navigate(`/map/${form.id}`)}>Vista de resultados mapa</button>
                <button onClick={() => navigate(`/preview/${form.id}`)}>Vista previa</button>
            </div>
        </div>

    );
};
