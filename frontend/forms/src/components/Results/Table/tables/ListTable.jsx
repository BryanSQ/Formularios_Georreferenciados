const ListTable = ({ answers }) => {
  const counts = answers.reduce((acc, answer) => {
    acc[answer.value] = (acc[answer.value] || 0) + 1;
    return acc;
  }, {});

  // Convertir el objeto counts en un array
  const groupedAnswers = Object.entries(counts).map(([value, count]) => ({ value, count }));
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Opción</th>
            <th>Cantidad de selecciones</th>
          </tr>
        </thead>
        <tbody>
          {groupedAnswers.map((answer, index) => (
            <tr key={index}>
              <td>{answer.value}</td>
              <td>{answer.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ListTable;