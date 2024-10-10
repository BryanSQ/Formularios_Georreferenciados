import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-page">
            <div className="title-section">
                <h1>Innova, <b>Investiga</b>, Conecta</h1>
                <p>¡Sé parte del proceso de innovación e investigación del <b>LIIT</b>!</p>
            </div>
            <div className="background">
                <div>
                <button 
                    className="search-button"
                    onClick={() => navigate('/search')}
                    >Buscar un formulario por código</button>
                </div>
                <div className="about-section">
                    <h3>Acerca del sistema</h3>
                    <p>
                        Este es un sistema web de formularios georreferenciados diseñado
                        para satisfacer las necesidades del <b>Laboratorio de Investigación e Innovación Tecnológica (LIIT)</b> de
                        la <b>Universidad Estatal a Distancia de Costa Rica</b>. El sistema permite la creación, personalización y
                        distribución de formularios que incluyen la capacidad de marcar <b>ubicaciones geográficas en un mapa</b>.
                        Esto con el fin de facilitar la recolección, visualización y análisis de datos geolocalizados, superando
                        las limitaciones de otras plataformas de formularios actuales que no ofrecen estas capacidades. Además, 
                        el sistema proporciona la posibilidad de visualizar datos, permitiendo a los usuarios la <b>consulta y 
                        análisis de la información recopilada de manera más efectiva</b>.
                        El desarrollo de este sistema se llevó a cabo utilizando tecnologías de código abierto, como <b><i>Linux</i>,
                        <i> Apache</i>, <i>MySQL</i>, <i>PHP</i>, <i>Leaflet</i> y <i>OpenStreetMap</i></b>.
                    </p>
                </div>
            </div>
        </div>
    );
}