import './CropSuggestions.css';

// eslint-disable-next-line no-unused-vars
import React from "react";
import cropData from "../Cropsuggestion/crops.json"; // Importing JSON data

const CropSuggestion = () => {
  return (
    <div className="bg-gradient-to-b from-green-100 via-emerald-100 to-lime-50 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      <h3 className="text-2xl font-bold text-green-700 text-center mb-4">Crop Suggestions</h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {cropData.map((region) => (
          <div key={region.id}>
            <h4 className="text-xl font-semibold text-green-800 mb-2">{region.state}</h4>
            <p className="text-gray-600 mb-2"><strong>Soil Type:</strong> {region.soilType}</p>
            {region.crops.map((crop, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg hover:scale-105 transform transition duration-300 border-l-6 hover:border-yellow-500 mt-4">
                <h5 className="text-lg font-semibold text-green-800 mb-1">{crop.name}</h5>
                <p className="text-gray-600 mb-1"><strong>Sun Requirements:</strong> {crop.sunRequirements}</p>
                <p className="text-gray-600 mb-1"><strong>Sowing Method:</strong> {crop.sowingMethod}</p>
                <p className="text-gray-600 mb-1"><strong>Row Spacing:</strong> {crop.rowSpacing}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropSuggestion;
