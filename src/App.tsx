import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';

// Páginas de Autenticação
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SplashScreen from './pages/SplashScreen';

// Páginas Internas
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import ChatPage from './pages/ChatPage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import MoreOptionsPage from './pages/MoreOptionsPage';

const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useApp();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/feed" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/splash" element={<SplashScreen />} />

        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/feed" replace />} />
                  <Route path="/feed" element={<FeedPage />} />

                  {/* ROTA DE PERFIL DINÂMICA ATUALIZADA */}
                  <Route path="/profile/:username" element={<ProfilePage />} />
                  {/* Caso o usuário acesse sem nome, redireciona ou mostra o seu */}
                  <Route path="/profile" element={<ProfilePage />} />

                  <Route
                    path="/notifications"
                    element={<NotificationsPage />}
                  />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/more" element={<MoreOptionsPage />} />
                  <Route path="*" element={<Navigate to="/feed" replace />} />
                </Routes>
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
