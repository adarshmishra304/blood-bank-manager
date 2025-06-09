// this is the home page
import DonationsMap from '@/components/DonationsMap';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HeartPulse, Droplet, HandHeart } from 'lucide-react';
import heroImage from '@/assets/images.jpeg';
import { useState, useEffect } from 'react';
import { getTransactionHistory } from '../../utils/api';

export default function Home() {

  const [donations, setDonations] = useState([]);
  
    useEffect(() => {
      const fetchHistory = async () => {
        try {
          const res = await getTransactionHistory();
          const donatedOnly = res.data.filter(entry => entry.type === "donation");
          setDonations(donatedOnly);
        } catch (err) {
          console.error("Failed to fetch donation history:", err);
        }
      };
  
      fetchHistory();
    }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-100 to-red-200">
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-5xl font-bold text-red-700 leading-tight">
            Save Lives with <br /> Every Drop
          </h1>
          <p className="text-lg text-gray-700 max-w-lg">
            Join BloodBank+ to donate blood, request urgently needed units, and track your life-saving contributions.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link to="/donate">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg rounded-xl">
                Donate Now
              </Button>
            </Link>
            <Link to="/request">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 text-lg rounded-xl">
                Request Blood
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <img src={heroImage} alt="Blood Donation" className="w-full rounded-3xl shadow-lg" />
        </div>
      </section>
      <div className='bg-white shadow-lg rounded-3xl p-6 mx-6 mb-12'>
        <div className='mr-20 ml-10'>
          <h2 className="text-2xl font-semibold mb-4">Live Blood Donation Map</h2>
          <DonationsMap donations={donations} />
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white py-16 shadow-inner">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-red-50 rounded-2xl shadow">
            <HeartPulse className="mx-auto text-red-600 w-12 h-12" />
            <h3 className="text-xl font-semibold text-red-700 mt-4">Real-time Inventory</h3>
            <p className="text-gray-600 mt-2">
              Stay updated with current blood stock levels and make informed donation or request decisions.
            </p>
          </div>
          <div className="p-6 bg-red-50 rounded-2xl shadow">
            <Droplet className="mx-auto text-red-600 w-12 h-12" />
            <h3 className="text-xl font-semibold text-red-700 mt-4">Seamless Transactions</h3>
            <p className="text-gray-600 mt-2">
              Easily donate or request blood with just a few clicks. Your actions matter.
            </p>
          </div>
          <div className="p-6 bg-red-50 rounded-2xl shadow">
            <HandHeart className="mx-auto text-red-600 w-12 h-12" />
            <h3 className="text-xl font-semibold text-red-700 mt-4">Track Impact</h3>
            <p className="text-gray-600 mt-2">
              See your donation and request history to understand how you're making a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-red-700 py-12 mt-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Be a Hero. Donate Blood Today.</h2>
        <p className="mb-6 text-lg">Your contribution could be the difference between life and death for someone in need.</p>
        <Link to="/donate">
          <Button className="bg-white text-red-700 hover:bg-red-200 px-6 py-3 text-lg rounded-xl font-semibold">
            Start Donating
          </Button>
        </Link>
      </section>
    </div>
  );
}
