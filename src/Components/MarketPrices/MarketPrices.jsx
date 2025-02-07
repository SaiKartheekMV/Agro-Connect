// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import './MarketPrices.css';

const MarketPrices = () => {
  const [marketPrices, setMarketPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("Maharashtra");

  const states = [
    "Maharashtra", "Punjab", "Haryana", "Karnataka", "Gujarat", "Uttar Pradesh", 
    "Madhya Pradesh", "Rajasthan", "Tamil Nadu", "Andhra Pradesh", "Bihar", "West Bengal"
  ];

  // Data for each state
  const fetchMarketPrices = async (state) => {
    try {
      const mockData = {
        "Andhra Pradesh": [
          { crop: "Rice", price: 2500, msp: 1868 },
          { crop: "Cotton", price: 5000, msp: 5515 },
          { crop: "Groundnut", price: 5000, msp: 5100 }
        ],
        "Arunachal Pradesh": [
          { crop: "Maize", price: 2100, msp: 1960 },
          { crop: "Millets", price: 2700, msp: 2500 },
        ],
        "Assam": [
          { crop: "Tea", price: 150, msp: 140 },
          { crop: "Jute", price: 5000, msp: 4750 },
          { crop: "Rice", price: 2400, msp: 1868 }
        ],
        "Bihar": [
          { crop: "Wheat", price: 2000, msp: 1975 },
          { crop: "Maize", price: 1800, msp: 1960 },
          { crop: "Pulses", price: 5100, msp: 5250 }
        ],
        "Chhattisgarh": [
          { crop: "Paddy", price: 2300, msp: 1868 },
          { crop: "Wheat", price: 2000, msp: 1975 },
          { crop: "Maize", price: 2100, msp: 1960 }
        ],
        "Goa": [
          { crop: "Coconut", price: 6000, msp: 6500 },
          { crop: "Rice", price: 2600, msp: 1868 },
          { crop: "Cashew", price: 9000, msp: 8800 }
        ],
        "Gujarat": [
          { crop: "Groundnut", price: 5200, msp: 5100 },
          { crop: "Cotton", price: 4700, msp: 5515 },
          { crop: "Wheat", price: 2000, msp: 1975 }
        ],
        "Haryana": [
          { crop: "Wheat", price: 2200, msp: 1975 },
          { crop: "Rice", price: 2700, msp: 1868 },
          { crop: "Bajra", price: 1950, msp: 2250 }
        ],
        "Himachal Pradesh": [
          { crop: "Apple", price: 60000, msp: 57000 },
          { crop: "Barley", price: 1500, msp: 1525 },
          { crop: "Maize", price: 1900, msp: 1960 }
        ],
        "Jharkhand": [
          { crop: "Rice", price: 2400, msp: 1868 },
          { crop: "Pulses", price: 5200, msp: 5250 },
          { crop: "Maize", price: 2000, msp: 1960 }
        ],
        "Karnataka": [
          { crop: "Ragi", price: 3100, msp: 2700 },
          { crop: "Rice", price: 2500, msp: 1868 },
          { crop: "Tur (Arhar)", price: 5600, msp: 5300 },
          { crop: "Groundnut", price: 5200, msp: 5100 }
        ],
        "Kerala": [
          { crop: "Rubber", price: 12500, msp: 12200 },
          { crop: "Rice", price: 2600, msp: 1868 },
          { crop: "Coconut", price: 6500, msp: 6500 }
        ],
        "Madhya Pradesh": [
          { crop: "Wheat", price: 2050, msp: 1975 },
          { crop: "Soybean", price: 4500, msp: 3950 },
          { crop: "Cotton", price: 5000, msp: 5515 }
        ],
        "Maharashtra": [
          { crop: "Wheat", price: 2100, msp: 1975 },
          { crop: "Rice", price: 2600, msp: 1868 },
          { crop: "Cotton", price: 4800, msp: 5515 },
          { crop: "Sugarcane", price: 2900, msp: 2750 },
          { crop: "Jowar (Sorghum)", price: 2300, msp: 2560 }
        ],
        "Punjab": [
          { crop: "Wheat", price: 2200, msp: 1975 },
          { crop: "Rice", price: 2700, msp: 1868 },
          { crop: "Maize", price: 1950, msp: 1870 },
          { crop: "Barley", price: 1600, msp: 1525 },
          { crop: "Sugarcane", price: 3000, msp: 2850 }
        ],
        "Rajasthan": [
          { crop: "Wheat", price: 2100, msp: 1975 },
          { crop: "Bajra", price: 2200, msp: 2250 },
          { crop: "Cotton", price: 4900, msp: 5515 }
        ],
        "Tamil Nadu": [
          { crop: "Rice", price: 2700, msp: 1868 },
          { crop: "Coconut", price: 6300, msp: 6500 },
          { crop: "Sugarcane", price: 3100, msp: 2750 },
          {crop: "Cotton", price: 3560, msp: 3160},
          {crop:"Tumeric", price: 12000, msp: 8170}
        ],
        "Telangana": [
          { crop: "Rice", price: 2600, msp: 1868 },
          { crop: "Cotton", price: 5000, msp: 5515 },
          { crop: "Maize", price: 2100, msp: 1960 }
        ],
        "Uttar Pradesh": [
          { crop: "Wheat", price: 2000, msp: 1975 },
          { crop: "Rice", price: 2400, msp: 1868 },
          { crop: "Sugarcane", price: 2800, msp: 2750 },
          { crop: "Pulses", price: 5500, msp: 5250 },
          { crop: "Maize", price: 1950, msp: 1870 }
        ],
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMarketPrices(mockData[state]);
      setLoading(false);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Failed to fetch market prices");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketPrices(selectedState);
  }, [selectedState]);

  return (
    <div className="market-prices">
      <h1>Market Prices</h1>
      <p>Select a state to view the latest crop prices and MSP (Minimum Support Price).</p>

      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="state-selector"
      >
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {loading && <p>Loading market prices...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <table className="prices-table">
          <thead>
            <tr>
              <th>Crop</th>
              <th>Market Price (₹)</th>
              <th>MSP (₹)</th>
            </tr>
          </thead>
          <tbody>
            {marketPrices.map((item, index) => (
              <tr key={index}>
                <td>{item.crop}</td>
                <td>{item.price}</td>
                <td>{item.msp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MarketPrices;
