import CreateForm from './components/CreateForm'
import AnswerForm from './components/AnswerForm'
import Login from './components/Login'
import ResultMap from './components/ResultMap'
import AdminView from './components/AdminView'
import EditForm from './components/EditForm'
import ResultTable from './components/ResultTable'

function App() {

  return (
    <>
      <CreateForm />
      <AnswerForm id={32} />
      <Login />
      <AdminView/>
      <EditForm id={5} />
      <ResultMap />    
      <ResultTable id={1}></ResultTable>
    </>
  )
}

export default App
