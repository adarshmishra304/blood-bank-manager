import { useState } from "react";
import API from "../../utils/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addBlood } from "../../utils/api"; // Adjust the import based on your API structure
const Donate = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBlood({ bloodGroup, quantity: Number(quantity) });
      setBloodGroup("");
      alert("✅ ho gaya donate")
      setQuantity(1);
    } catch (error) {
      alert("ni ho paya donate: " + error);
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
    <div>
      <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
        Blood Group
      </label>
      <select
        id="bloodGroup"
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
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
    </div>

    <div>
      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
        Quantity (units)
      </label>
      <input
        id="quantity"
        type="number"
        placeholder="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min={1}
        max={5}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
        required
      />
      <p className="text-xs text-gray-500 mt-1">Typically 1 unit = 450ml</p>
    </div>

    <button
      type="submit"
      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
    >
      Donate Now
    </button>
  </div>

  <div className="mt-6 text-center text-sm text-gray-500">
    <p>By donating, you agree to our terms and conditions</p>
  </div>
</form>
  );
};

export default Donate;
