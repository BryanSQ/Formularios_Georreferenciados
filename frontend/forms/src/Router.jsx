import { Routes, Route } from 'react-router-dom';
import { Login, CreateForm, AnswerForm, AdminView, EditForm, ResultMap, ResultTable, CodeSearch, PreviewForm, LandingPage, Error } from './components';
import PrivateRoute from './components/helper/PrivateRoute';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/answer/:code" element={<AnswerForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/map/:id" element={<ResultMap />} />
      <Route path="/search" element={<CodeSearch />} />

      <Route path="/admin" element={<PrivateRoute><AdminView /></PrivateRoute>} />
      <Route path="/edit/:id" element={<PrivateRoute><EditForm /></PrivateRoute>} />
      <Route path="/create" element={<PrivateRoute><CreateForm /></PrivateRoute>} />
      <Route path="/table/:id" element={<PrivateRoute><ResultTable /></PrivateRoute>} />
      <Route path="/preview/:id" element={<PrivateRoute><PreviewForm /></PrivateRoute>} />

      <Route path="*" element={<Error message='No se ha encontrado esta página.' />} />
    </Routes>
  );
}

export default AppRouter;