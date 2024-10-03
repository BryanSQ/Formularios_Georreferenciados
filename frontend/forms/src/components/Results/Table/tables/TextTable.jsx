const TextTable = ({ answers }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Respuestas</th>
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

export default TextTable;