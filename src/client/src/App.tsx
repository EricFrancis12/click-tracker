import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TestLandingPage from './pages/TestLandingPage';
import NotFound from './pages/NotFound';

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/lp'>
                        <Route path='test' element={<TestLandingPage />} />
                    </Route>
                    <Route path='/*' element={<NotFound />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}
