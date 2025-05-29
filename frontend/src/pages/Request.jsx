import { useState } from "react";
import API from "../../utils/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Request = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleRequest = async (e) => {
    e.preventDefault();
    await API.post("/blood/request", { bloodGroup, quantity });
    alert("🩸 Request placed successfully!");
  };

  return (
    <form onSubmit={handleRequest} className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden p-6 border-red-600">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-red-600">Request Blood</h2>
        <p className="text-gray-600 mt-2">Help us find the right match for your needs</p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="requestBloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
            Required Blood Group
          </label>
          <select
            id="requestBloodGroup"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            required
          >
            <option value="">Select required blood type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="UNKNOWN">Unknown</option>
          </select>
        </div>

        <div>
          <label htmlFor="requestQuantity" className="block text-sm font-medium text-gray-700 mb-1">
            Units Needed
          </label>
          <input
            id="requestQuantity"
            type="number"
            placeholder="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={1}
            max={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 1 unit required</p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
          >
            Find Donors
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>All requests are verified by our medical team</p>
      </div>
    </form>
  );
};

export default Request;
