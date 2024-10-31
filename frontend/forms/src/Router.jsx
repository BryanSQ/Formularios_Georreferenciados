import { Routes, Route } from 'react-router-dom';
import { Login, CreateForm, AnswerForm, AdminView, EditForm, ResultMap, ResultTable, CodeSearch, PreviewForm, LandingPage, Error } from './components';


function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create" element={<CreateForm />} />
      <Route path="/answer/:code" element={<AnswerForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminView />} />
      <Route path="/edit/:id" element={<EditForm />} />
      <Route path="/map/:id" element={<ResultMap />} />
      <Route path="/table/:id" element={<ResultTable />} />
      <Route path="/search" element={<CodeSearch />} />
      <Route path="preview/:id" element={<PreviewForm />} />
      <Route path="*" element={<Error message='No se ha encontrado esta página.' />} />
    </Routes>
  );
}

export default AppRouter;