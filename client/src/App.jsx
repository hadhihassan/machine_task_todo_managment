import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import NavBarLayout from './components/layout/NavbarLayout'
import AuthLayout from './components/layout/AuthLayout'
import Login from './page/login/index'
import Register from './page/register/index'
import HomeScreen from './page/homeScreen/index'
import VerifyPage from './page/verify';
import { ProtectedRoute, LogedUsers } from './components/ProtectedRoute'


function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>

            <Route element={<NavBarLayout />}>
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomeScreen />} />
              </Route>
            </Route>

            <Route element={<AuthLayout />}>
              <Route element={<LogedUsers />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-user" element={<VerifyPage />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
