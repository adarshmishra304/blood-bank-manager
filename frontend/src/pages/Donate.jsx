import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addBlood, getProfile } from "../../utils/api"; // Adjust import path if needed
import { name } from "./Auth";
import LocationPickerMap from "@/components/LocationPickerMap";


const Donate = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const [formData, setFormData] = useState({
    bloodGroup: profile?.bloodType || "",
    quantity: 1,
    latitude: "", 
    longitude: "", 
    hospitalName: "",
    donorName: profile?.name || "" // Use profile name if available
  });
  console.log(profile?.name);
  formData.donorName= profile?.name || ""; // Use profile name if available
  formData.bloodGroup = profile?.bloodType || "";



  // const name=localStorage.getItem("name", res.data.name);
  // formData.donorName = localStorage.getItem("name", res.data.name);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBlood(formData);
      alert("✅ Donation successful!");
      setFormData({
        bloodGroup: "",
        quantity: 1,
        latitude: "",
        longitude: "",
        hospitalName: "",
        donorName: ""
      });
    } catch (error) {
      alert("❌ Donation failed: " + error?.response?.data?.message || error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden p-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-red-600">Donate Blood</h2>
        <p className="text-gray-600 mt-2">Your donation can save lives</p>
      </div>

      <div className="space-y-5">
        {/* Blood Group */}
        {/* <div>
          <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
            Blood Group
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select your blood type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div> */}

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity (units)</label>
          <Input type="number" name="quantity" value={formData.quantity} min={1} onChange={handleChange} required />
        </div>

        {/* Latitude */}
        {/* <div>
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
          <Input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} required />
        </div> */}
       <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select on Map *</label>
        <div className="h-70 rounded-lg overflow-hidden border border-gray-300">
          <LocationPickerMap
            onLocationSelect={(coords) =>
              setFormData((prev) => ({
                ...prev,
                longitude: coords[0], // lng
                latitude: coords[1],  // lat
              }))
            }
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Selected coordinates: {formData.latitude}, {formData.longitude}
        </p>
      </div>


        {/* Longitude */}
        {/* <div>
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
          <Input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} required />
        </div> */}

        {/* Hospital Name */}
        <div>
          <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
          <Input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} required />
        </div>

        {/* Donor Name */}
        {/* <div>
          <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-1">Donor Name</label>
          <Input type="text" name="donorName" value={formData.donorName} onChange={handleChange} required />
        </div> */}

        <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">Donate</Button>
      </div>
    </form>
  );
};

export default Donate;


// import { useState } from "react";
// import API from "../../utils/api";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { addBlood } from "../../utils/api"; // Adjust the import based on your API structure
// const Donate = () => {
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addBlood({ bloodGroup, quantity: Number(quantity) });
//       setBloodGroup("");
//       alert("✅ ho gaya donate")
//       setQuantity(1);
//     } catch (error) {
//       alert("ni ho paya donate: " + error);
//       console.error(error);
//     }
    
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden p-6">
//       <div className="text-center mb-6">
//         <h2 className="text-3xl font-bold text-red-600">Donate Blood</h2>
//         <p className="text-gray-600 mt-2">Your donation can save lives</p>
//       </div>

//       <div className="space-y-5">
//         <div>
//           <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
//             Blood Group
//           </label>
//           <select
//             id="bloodGroup"
//             value={bloodGroup}
//             onChange={(e) => setBloodGroup(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
//             required
//           >
//             <option value="">Select your blood type</option>
//             <option value="A+">A+</option>
//             <option value="A-">A-</option>
//             <option value="B+">B+</option>
//             <option value="B-">B-</option>
//             <option value="AB+">AB+</option>
//             <option value="AB-">AB-</option>
//             <option value="O+">O+</option>
//             <option value="O-">O-</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
//             Quantity (units)
//           </label>
//           <input
//             id="quantity"
//             type="number"
//             placeholder="1"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             min={1}
//             max={5}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
//             required
//           />
//           <p className="text-xs text-gray-500 mt-1">Typically 1 unit = 450ml</p>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
//         >
//           Donate Now
//         </button>
//       </div>

//       <div className="mt-6 text-center text-sm text-gray-500">
//         <p>By donating, you agree to our terms and conditions</p>
//       </div>
//     </form>
//   );
// };

// export default Donate;
