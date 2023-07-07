import { Outlet } from 'react-router-dom';

import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <Outlet />
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
