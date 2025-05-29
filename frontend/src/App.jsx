import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Donate from './pages/Donate';
import Request from './pages/Request';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/request" element={<Request />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}
