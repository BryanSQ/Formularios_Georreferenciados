const Text = ({ option }) => {
    const tipo = (option === "1")
      ? "corta" 
      : "larga";
    return (
      <>
        <input type="text" placeholder={"Texto de respuesta "+ tipo} disabled></input>
      </>
    )
  }
  
  export default Text;