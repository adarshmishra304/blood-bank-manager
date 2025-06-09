import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Donate from './pages/Donate';
import Request from './pages/Request';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Bloods from './pages/Bloods';

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
          <Route path="/bloods" element={<Bloods />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}
