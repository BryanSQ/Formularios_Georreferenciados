const TextTable = ({ answers }) => {
  return (
    <>
      <table>
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