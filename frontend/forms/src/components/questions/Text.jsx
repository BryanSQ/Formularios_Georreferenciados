const Text = (props) => {
    return (
      <div>
        <input type="text" placeholder={"Texto de respuesta "+props.option} disabled></input>
      </div>
    )
  }
  
  export default Text;