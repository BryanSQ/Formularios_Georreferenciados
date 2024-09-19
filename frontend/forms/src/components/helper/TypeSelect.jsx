import useFetchData from "../../hooks/useFetchData";

import API_URL from "../../config";

const TypeSelect = ({ handleClick, handleChange }) => {
  const { data, loading, error } = useFetchData(`${API_URL}/fields`);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='add-question-section'>
        <h3>Agregar pregunta</h3>
        <div className='add-question'>
          <select
            onChange={(e) => handleChange(e.target.value)}>
            {
              data.map((type) => {
                return <option key={type.id} value={type.id}>{type.name}</option>
              })
            }
          </select>
          <button type='button' onClick={handleClick}>Agregar</button>
        </div>
      </div>
  );
}

export default TypeSelect;