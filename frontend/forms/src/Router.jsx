import { Routes, Route } from 'react-router-dom';
import CreateForm from './components/CreateForm';
import AnswerForm from './components/AnswerForm';
import Login from './components/Login';
import AdminView from './components/AdminView';
import EditForm from './components/EditForm';
import ResultMap from './components/ResultMap';
import ResultTable from './components/ResultTable';
import CodeSearch from './components/CodeSearch';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create" element={<CreateForm />} />
      <Route path="/answer/:id" element={<AnswerForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminView />} />
      <Route path="/edit/:id" element={<EditForm />} />
      <Route path="/map/:id" element={<ResultMap />} />
      <Route path="/table/:id" element={<ResultTable />} />
      <Route path="/search" element={<CodeSearch />} />
    </Routes>
  );
}

export default AppRouter;