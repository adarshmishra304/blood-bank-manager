import { useEffect, useState } from "react";
import API from "../../utils/api";
import { Card, CardContent } from "@/components/ui/card";
import { getBloodStats, getInventory } from "../../utils/api";

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);

  // const fetchData = async () => {
    
  // };

  const fetchData = async () => {
    try {
      const res = await getBloodStats(); // your API call
      setDonations(res.data.donations);
      setRequests(res.data.requests);
    } catch (error) {
      console.error("Failed to fetch blood stats", error);
    }
    try {
      const res = await getInventory(); // replace with actual API function
      setInventory(res.data);
      console.log("successfully fetched: ",inventory)
    } catch (error) {
      console.error("Failed to fetch blood inventory", error);
    }
  };
  
  useEffect(() => { 
    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-red-50 to-white min-h-screen p-6">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold text-red-700 mb-6 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      Blood Bank Dashboard
    </h1>

    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {/* Blood Inventory Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-100 transform transition hover:scale-[1.01]">
        <div className="bg-red-600 px-4 py-3">
          <h2 className="text-xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Blood Inventory
          </h2>
        </div>
        <div className="p-6">
          {inventory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              No blood data available
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {inventory.map((item) => (
                <div key={item._id} className="bg-red-50 rounded-lg p-3 text-center border border-red-100">
                  <div className="text-2xl font-bold text-red-700">{item.quantity}</div>
                  <div className="text-sm font-medium text-red-900">{item.bloodGroup}</div>
                  <div className="text-xs text-gray-500 mt-1">units</div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      {/* Donations & Requests Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-100 transform transition hover:scale-[1.01]">
        <div className="bg-red-600 px-4 py-3">
          <h2 className="text-xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Donations & Requests
          </h2>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-red-800 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Donations
            </h3>
            {donations.length === 0 ? (
              <p className="text-gray-500 text-sm pl-5">No donation records</p>
            ) : (
              <div className="space-y-3 pl-5">
                {donations.map((item) => (
                  <div key={item._id} className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                    <span className="font-medium text-gray-800">{item._id}:</span>
                    <span className="ml-auto font-bold text-red-700">{item.total} units</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-red-800 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Requests
            </h3>
            {requests.length === 0 ? (
              <p className="text-gray-500 text-sm pl-5">No request records</p>
            ) : (
              <div className="space-y-3 pl-5">
                {requests.map((item) => (
                  <div key={item._id} className="flex items-center">
                    <div className="w-3 h-3 bg-red-300 rounded-full mr-2"></div>
                    <span className="font-medium text-gray-800">{item._id}:</span>
                    <span className="ml-auto font-bold text-red-700">{item.total} units</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Dashboard;
