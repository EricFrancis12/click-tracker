import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider as A } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import TestLandingPage from './pages/TestLandingPage';
import NotFound from './pages/NotFound';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<A><Navigate to='/dashboard' /></A>} />
                <Route path='/dashboard' element={<A><Dashboard /></A>} />
                <Route path='/login' element={<Login />} />
                <Route path='/lp'>
                    <Route path='test' element={<TestLandingPage />} />
                </Route>
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}
