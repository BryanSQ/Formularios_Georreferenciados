const MapTable = ({ answers }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Latitud y Longitud</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer, index) => (
            <tr key={index}>
              <td>{answer.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default MapTable;