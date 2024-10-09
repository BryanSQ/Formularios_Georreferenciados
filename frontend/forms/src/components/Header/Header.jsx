import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/Logo-LIIT-UNED.png';

export const Header = () =>{
    const navigate = useNavigate();
    return(
        <header className="header">      
                <div className="header-logo">
                    <img src={logo} alt="Logo"></img>
                </div>
                <div className="header-tittle">
                    <h2>Sistema de Formularios Georreferenciados</h2>
                </div>
                <div className="header-options">
                    <button className="button">Inicio</button>
                    <button className="button" onClick={() => navigate('/search')}>Buscar formulario</button>
                    <button className="config-button" onClick={() => navigate('/login')}></button>
                </div> 
        </header>
    );
};

export default Header;