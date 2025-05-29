import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { HeartPulse, Droplet, HandHeart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]); // re-check on route change

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert("✅ Logged out successfully");
    navigate('/auth');
  };

  const getLinkClass = (path) =>
    `px-4 py-2 rounded-md transition-colors duration-300 hover:bg-[#c0392b] text-white hover:shadow-md hover:text-black ${
      location.pathname === path ? 'bg-red-800 text-[#E74C3C] font-semibold shadow-inner' : ''
    }`;

  return (
    <header className="bg-red-600 rounded-b-md shadow-xl text-white w-full">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold tracking-wide">
          <HeartPulse className="w-6 h-6 animate-pulse" />
          <Droplet className="w-6 h-6" />
          <HandHeart className="w-6 h-6" />
          BloodBank+
        </div>

        {/* Navigation */}
        <NavigationMenu className="w-auto">
          <NavigationMenuList className="flex gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className={getLinkClass('/')}>Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/donate" className={getLinkClass('/donate')}>Donate</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/request" className={getLinkClass('/request')}>Request</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                {isLoggedIn ? (
                  <button onClick={handleLogout} className={getLinkClass('#')}>
                    Logout
                  </button>
                ) : (
                  <Link to="/auth" className={getLinkClass('/auth')}>Login</Link>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/profile" className={getLinkClass('/profile')}>Profile</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
