import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import NavBarLayout from './components/layout/NavbarLayout'
import AuthLayout from './components/layout/AuthLayout'
import Login from './page/login/index'
import Register from './page/register/index'
import HomeScreen from './page/homeScreen/index'

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<NavBarLayout />}>
              <Route path="/" element={<HomeScreen />} />
              {/* <Route path="/blogs/:id" element={<BlogContent />} />
              <Route path="/profile" element={<ProtectedLayout />}>
                <Route index element={<Profile />} />
              </Route> */}
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-user" element={<div>verify-user</div>} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
