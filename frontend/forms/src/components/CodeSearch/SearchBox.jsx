import { searchFormByCode } from '../../services/formServices';
import { useNavigate } from 'react-router-dom';
import { Error } from '../helper/Error';

export const SearchBox = ({ object }) => {

    const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();

    const code = event.target[0].value;


    if (!code) return <Error message="El código no puede estar vacío" />;

    try {
      const { id } = await searchFormByCode(code);
      if(object === 'formulario'){
        navigate(`/answer/${code}`);
      }
      else{
        navigate(`/map/${id}`);
      }      
      
    } catch (error) {
      console.error('Error al buscar el formulario:', error);
      return <Error message="Error al buscar el formulario" />;
    }
  };

  return (
    <div className='code-container'>
        <h2>Búsqueda por Código</h2>
        <p>Ingrese el código del {object} por buscar:</p>
        <form className='form-code' onSubmit={handleSearch}>
          <input type="text" placeholder="Código" minLength={6} maxLength={6} required/>
          <button className='search-button' type="submit"></button>
        </form>
      </div>
  );
};