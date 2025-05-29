import { useEffect, useState } from 'react';
import { getProfile } from '../../utils/api';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Droplet, User, Mail, HeartPulse } from 'lucide-react';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-red-600 mx-auto mb-3" />
          <p className="text-gray-600">Loading your lifesaving profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 px-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <HeartPulse className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <Card className="overflow-hidden border border-red-100 shadow-lg">
        <div className="bg-red-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <User className="h-6 w-6 mr-2" />
            Donor Profile
          </h2>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <User className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
              <p className="text-gray-600">Blood Donor Hero</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-start">
              <div className="bg-red-50 p-2 rounded-lg mr-4">
                <Mail className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-800">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-red-50 p-2 rounded-lg mr-4">
                <Droplet className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Blood Type</p>
                <div className="flex items-center">
                  <span className="bg-red-100 text-red-800 font-bold px-3 py-1 rounded-full text-sm">
                    {profile.bloodType}
                  </span>
                  {profile.bloodType && profile.bloodType.endsWith('-') && (
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                      Universal Donor
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Additional profile fields can be added here */}
            {/* Example for donation history */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-2">Donation Impact</p>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">5</div>
                  <div className="text-xs text-gray-500">Donations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">15</div>
                  <div className="text-xs text-gray-500">Lives Saved</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Thank you for being part of our lifesaving community ❤️</p>
      </div>
    </div>
  );
}