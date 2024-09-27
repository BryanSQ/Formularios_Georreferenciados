import { Routes, Route } from 'react-router-dom';
import { Login, CreateForm, AnswerForm, AdminView, EditForm, ResultMap, ResultTable, CodeSearch } from './components';


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