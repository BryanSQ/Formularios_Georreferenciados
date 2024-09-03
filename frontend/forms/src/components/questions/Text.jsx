const Text = (props) => {
    return (
      <>
        <input type="text" placeholder={"Texto de respuesta "+props.option} disabled></input>
      </>
    )
  }
  
  export default Text;