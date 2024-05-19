import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { LoginPage } from '~/features/auth/pages/LoginPage';
import { ProtectedRoute } from '~/features/auth/components/ProtectedRoute';
import { MainPage } from '~/features/main/pages/MainPage';
import { AboutPages } from '~/features/about/pages/AboutPages';

export function Router() {
  return (
    <>
      <Routes>
        <Route path={routes.LOGIN} element={<LoginPage />} />
        <Route
          path={routes.ABOUT}
          element={
            <ProtectedRoute>
              <AboutPages />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.MAIN}
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={'*'}
          element={<Navigate to={routes.MAIN} replace={true} />}
        />
      </Routes>
    </>
  );
}
