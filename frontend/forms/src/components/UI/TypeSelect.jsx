import useFetchData from "../../hooks/useFetchData";

import API_URL from "../../config";

export const TypeSelect = ({ id, handleChange }) => {
  const { data, loading, error } = useFetchData(`${API_URL}/fields`);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <Error message={error} />;
  }

  return (
    <select className='type-select'
      onChange={(e) => handleChange(id, e.target.value)}>
      {
        data.map((type) => {
          return <option key={type.id} value={type.id}>{type.spanish_name}</option>
        })
      }
    </select>
  );
};