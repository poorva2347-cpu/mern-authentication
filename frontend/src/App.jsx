import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Any unknown URL goes back to the login page */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* One shared toast container for the whole app */}
      <Toaster position="top-right" theme="light" richColors closeButton duration={5000} />
    </>
  );
}

export default App;
