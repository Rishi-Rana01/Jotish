import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ListPage from './pages/ListPage';
import DetailsPage from './pages/DetailsPage';
import PhotoResultPage from './pages/PhotoResultPage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className='min-h-screen bg-slate-900 flex items-center justify-center text-white'>Loading...</div>;
  if (!user) return <Navigate to='/login' replace />;
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route 
            path='/list' 
            element={
              <ProtectedRoute>
                <ListPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/details' 
            element={
              <ProtectedRoute>
                <DetailsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/photo-result' 
            element={
              <ProtectedRoute>
                <PhotoResultPage />
              </ProtectedRoute>
            } 
          />
          <Route path='*' element={<Navigate to='/list' replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;