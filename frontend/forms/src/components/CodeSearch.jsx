import { useNavigate } from 'react-router-dom';
import './styles/CodeSearch.css';
import { searchFormByCode } from '../services/formServices';

const CodeSearch = () => {
  const navigate = useNavigate();



  const handleSearch = async (event) => {
    event.preventDefault();

    const code = event.target[0].value;


    if (!code) return <Error message="El código no puede estar vacío" />;

    try {
      const { id } = await searchFormByCode(code);
      navigate(`/answer/${id}`);
      
    } catch (error) {
      console.error('Error al buscar el formulario:', error);
      return <Error message="Error al buscar el formulario" />;
    }
  };

  return (
    <div className="search">
      <h2>Busqueda por Codigo</h2>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Codigo" minLength={6} maxLength={6} required/>
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default CodeSearch;