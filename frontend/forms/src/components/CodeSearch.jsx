import { useNavigate } from 'react-router-dom';
import './styles/CodeSearch.css';

const CodeSearch = () => {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const code = event.target[0].value;


    if (!code) return <Error message="El código no puede estar vacío" />;

    // peticion al servidor
    navigate(`/answer/${34}`);
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