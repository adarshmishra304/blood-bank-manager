// import React, { useEffect, useState } from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from '@/components/ui/button';
// import { getTransactionHistory } from "../../utils/api";
// const Bloods = () => {
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await getTransactionHistory();
//         const donatedOnly = res.data.filter(entry => entry.type === "donation");
//         setDonations(donatedOnly);
//       } catch (err) {
//         console.error("Failed to fetch donation history:", err);
//       }
//     };

//     fetchHistory();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
//       {donations.map((donation) => (
//         <Card key={donation._id} className="shadow-md border rounded-xl">
//           <CardContent className="p-4 space-y-2">
//             <h2 className="text-xl font-semibold text-red-600">{donation.bloodGroup}</h2>
//             <p><strong>Donor:</strong> {donation.donorName}</p>0
//             <p><strong>Quantity:</strong> {donation.quantity} units</p>
//             <p><strong>Hospital:</strong> {donation.hospitalName}</p>
//             <p><strong>Location:</strong> Lat {donation.latitude}, Lng {donation.longitude}</p>
//             <p className="text-sm text-gray-500"><strong>Donated On:</strong> {new Date(donation.date).toLocaleString()}</p>
//             <Button variant="outline" className="bg-red-500 mt-2" onClick={() => handleRequest(donation._id)}>
//               Request
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default Bloods;


import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { getTransactionHistory, requestBlood } from "../../utils/api";
import Map from '@/components/Map';
import DonationsMap from '@/components/DonationsMap'; // Assuming you have a DonationsMap component
// import { Link } from 'react-router-dom'; // Optional: If you want to link to a donation form
// import { toast } from "@/components/ui/use-toast"; // Optional: If using ShadCN toast

const Bloods = () => {
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

  const handleRequest = async (donation) => {
    const requestData = {
      bloodGroup: donation.bloodGroup,
      quantity: donation.quantity,
      latitude: donation.latitude,
      longitude: donation.longitude,
      hospitalName: donation.hospitalName,
      donorName: donation.donorName,
    };

    try {
      const res = await requestBlood(requestData);
      alert("🩸 Request placed successfully!");
      console.log("Request successful:", res.data);
      //   toast({
    //     title: "Request Successful",
    //     description: res.data.message || "Blood requested successfully",
    //   });
    } catch (err) {
        alert("❌ Request failed!");
        console.error("Failed to request blood:", err);
    //   toast({
    //     title: "Request Failed",
    //     description: err.response?.data?.message || "Something went wrong",
    //     variant: "destructive",
    //   });
    }
  };

  return (
    <>
          {/* <div>
        <h2 className="text-2xl font-semibold mb-4">Live Blood Donation Map</h2>
        <DonationsMap donations={donations} />
      </div> */}
      {donations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          No blood data available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {donations.map((donation) => (
            <Card key={donation._id} className="shadow-md border rounded-xl">
              <CardContent className="p-4 space-y-2">
                <h2 className="text-xl font-semibold text-red-600">{donation.bloodGroup}</h2>
                <p><strong>Donor:</strong> {donation.donorName}</p>
                <p><strong>Quantity:</strong> {donation.quantity} units</p>
                <p><strong>Hospital:</strong> {donation.hospitalName}</p>

                <div className="flex items-center justify-between">
                  <Map lat={donation.latitude} lng={donation.longitude} name={donation.hospitalName} />
                </div>

                <p className="text-sm text-gray-500"><strong>Donated On:</strong> {new Date(donation.date).toLocaleString()}</p>
                <Button 
                  variant="outline" 
                  className="bg-red-500 text-white hover:bg-red-600 mt-2"
                  onClick={() => handleRequest(donation)}
                >
                  Request
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
  
};

export default Bloods;
