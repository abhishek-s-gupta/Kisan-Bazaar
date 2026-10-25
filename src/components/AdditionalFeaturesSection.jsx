import React, { useState, useEffect } from 'react';
import { db } from '../db/database';
import { TrendingUp, Bell, Sun, Users, FileText, HelpCircle, ArrowUpRight, ArrowDownRight, Minus, PlusCircle, Check } from 'lucide-react';

export function AdditionalFeaturesSection() {
  const [activeTab, setActiveTab] = useState('insights');
  const [marketPrices, setMarketPrices] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [newTargetCrop, setNewTargetCrop] = useState('Tomato');
  const [weatherLocation, setWeatherLocation] = useState('Nashik, Maharashtra');

  const weatherDataByLoc = {
    'Nashik, Maharashtra': [
      { day: 'Today', temp: '28°C', cond: 'Sunny / Mild Humidity', advisory: 'Ideal day for harvesting tomatoes and inspecting vineyard vines.' },
      { day: 'Fri', temp: '27°C', cond: 'Light Rain Expected', advisory: 'Cover open grain storage bags.' },
      { day: 'Sat', temp: '29°C', cond: 'Clear Sky', advisory: 'Favorable for organic spraying.' },
      { day: 'Sun', temp: '30°C', cond: 'Sunny', advisory: 'Good transport conditions.' },
      { day: 'Mon', temp: '26°C', cond: 'Partly Cloudy', advisory: 'Normal irrigation schedule.' }
    ],
    'Shimla, Himachal Pradesh': [
      { day: 'Today', temp: '16°C', cond: 'Crisp Mountain Breeze', advisory: 'Optimal morning hours for apple plucking without bruising.' },
      { day: 'Fri', temp: '14°C', cond: 'Overcast & Cool', advisory: 'Protect high-altitude nursery saplings from frost.' },
      { day: 'Sat', temp: '15°C', cond: 'Sunny Breaks', advisory: 'Ideal for grading and wooden-crate packing.' },
      { day: 'Sun', temp: '17°C', cond: 'Clear Alpine Sky', advisory: 'Great day for haulage down to plains mandis.' },
      { day: 'Mon', temp: '13°C', cond: 'Chilly Evening', advisory: 'Maintain tree mulch thickness.' }
    ],
    'Srinagar, Jammu & Kashmir': [
      { day: 'Today', temp: '14°C', cond: 'Sunny & Crisp', advisory: 'Peak harvest weather for Kashmiri Red Delicious apples.' },
      { day: 'Fri', temp: '12°C', cond: 'Light Autumn Fog', advisory: 'Early morning dispatch advised before road fog increases.' },
      { day: 'Sat', temp: '15°C', cond: 'Pleasant Sunshine', advisory: 'Optimal for fruit solar-drying and grading.' },
      { day: 'Sun', temp: '13°C', cond: 'Partly Cloudy', advisory: 'Store produce in ventilated wooden trays.' },
      { day: 'Mon', temp: '11°C', cond: 'Brisk Breeze', advisory: 'Ensure orchard irrigation channels are cleared.' }
    ],
    'Kolar, Karnataka': [
      { day: 'Today', temp: '27°C', cond: 'Mild & Sunny', advisory: 'Prime picking conditions for greenhouse bell peppers and tomatoes.' },
      { day: 'Fri', temp: '26°C', cond: 'Scattered Clouds', advisory: 'Check soil moisture before drip fertigation.' },
      { day: 'Sat', temp: '28°C', cond: 'Clear Sky', advisory: 'Excellent logistics condition for Bengaluru dispatch.' },
      { day: 'Sun', temp: '29°C', cond: 'Warm Sun', advisory: 'Harvest greens early before sun rises high.' },
      { day: 'Mon', temp: '26°C', cond: 'Gentle Breeze', advisory: 'Safe for organic foliar sprays.' }
    ],
    'Ludhiana, Punjab': [
      { day: 'Today', temp: '24°C', cond: 'Clear & Golden', advisory: 'Perfect weather for sweet pea picking and wheat field checks.' },
      { day: 'Fri', temp: '25°C', cond: 'Sunny', advisory: 'Ensure canal irrigation turns are scheduled.' },
      { day: 'Sat', temp: '23°C', cond: 'Cool Morning Breeze', advisory: 'Ideal for pod threshing and grain sorting.' },
      { day: 'Sun', temp: '26°C', cond: 'Warm & Dry', advisory: 'Optimal transport weather to Delhi Azadpur APMC.' },
      { day: 'Mon', temp: '22°C', cond: 'Light Dew', advisory: 'Aerate grain storage bins.' }
    ],
    'Ooty, Tamil Nadu': [
      { day: 'Today', temp: '17°C', cond: 'Misty Highland Air', advisory: 'Top weather for harvesting tight dark green broccoli heads.' },
      { day: 'Fri', temp: '15°C', cond: 'Intermittent Drizzle', advisory: 'Drain excess water from terrace crop beds.' },
      { day: 'Sat', temp: '18°C', cond: 'Gentle Mountain Sun', advisory: 'Ideal for harvesting Nilgiris baby carrots.' },
      { day: 'Sun', temp: '19°C', cond: 'Clear Highland Sky', advisory: 'Load cold-chain vans for Coimbatore/Chennai transit.' },
      { day: 'Mon', temp: '16°C', cond: 'Cool & Foggy', advisory: 'Maintain greenhouse plastic ventilation.' }
    ],
    'Guntur, Andhra Pradesh': [
      { day: 'Today', temp: '32°C', cond: 'Dry & Sunny', advisory: 'Superb conditions for outdoor solar-drying of red chillies.' },
      { day: 'Fri', temp: '33°C', cond: 'Hot & Clear', advisory: 'Store dried chillies in moisture-proof gunny bags.' },
      { day: 'Sat', temp: '31°C', cond: 'Breezy Afternoon', advisory: 'Inspect irrigation for papaya plantations.' },
      { day: 'Sun', temp: '30°C', cond: 'Sunny', advisory: 'Good dispatch conditions for Hyderabad mandi.' },
      { day: 'Mon', temp: '32°C', cond: 'Sunny / Dry', advisory: 'Ideal for harvesting mature chilli pods.' }
    ],
    'Indore, Madhya Pradesh': [
      { day: 'Today', temp: '29°C', cond: 'Warm & Dry', advisory: 'Safe and dry conditions for bulk potato and garlic loading.' },
      { day: 'Fri', temp: '28°C', cond: 'Clear Sky', advisory: 'Ensure proper curing ventilation in godowns.' },
      { day: 'Sat', temp: '30°C', cond: 'Sunny', advisory: 'High transport efficiency across central India corridor.' },
      { day: 'Sun', temp: '29°C', cond: 'Sunny & Pleasant', advisory: 'Routine field weeding and organic manure application.' },
      { day: 'Mon', temp: '27°C', cond: 'Mild Breeze', advisory: 'Inspect cold-store temperature uniformity.' }
    ]
  };

  const currentWeather = weatherDataByLoc[weatherLocation] || weatherDataByLoc['Nashik, Maharashtra'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const prices = await db.marketPrices.toArray();
    const posts = await db.communityPosts.toArray();
    const alertList = await db.priceAlerts.toArray();
    setMarketPrices(prices);
    setCommunityPosts(posts);
    setAlerts(alertList);
  };

  const handleAddAlert = async (e) => {
    e.preventDefault();
    await db.priceAlerts.add({
      buyerId: 2,
      cropName: newTargetCrop,
      targetPrice: Number(newTargetPrice),
      isTriggered: false,
      createdAt: new Date().toISOString()
    });
    loadData();
  };

  return (
    <div className="bg-slate-100 py-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Value-Added Modules</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Additional Features & Tools</h2>
          <p className="text-slate-500 text-xs mt-1">Market intelligence, weather advisories, community support & government initiatives.</p>
        </div>

        {/* Tab Headers */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-3">
          
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'insights' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Market Insights
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'alerts' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Bell className="w-4 h-4" />
            Price Alerts
          </button>

          <button
            onClick={() => setActiveTab('weather')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'weather' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sun className="w-4 h-4" />
            Weather Forecast
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'community' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Farmer Community
          </button>

          <button
            onClick={() => setActiveTab('schemes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'schemes' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Govt Schemes
          </button>

          <button
            onClick={() => setActiveTab('help')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'help' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Support & Helpline
          </button>

        </div>

        {/* Tab 1: Market Insights */}
        {activeTab === 'insights' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-extrabold text-slate-900 text-base mb-4">Live Mandi Market Rates (APMC Benchmark)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                    <th className="p-3">Crop</th>
                    <th className="p-3">Mandi / District</th>
                    <th className="p-3">Min Rate</th>
                    <th className="p-3">Max Rate</th>
                    <th className="p-3">Modal Price</th>
                    <th className="p-3">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                  {marketPrices.map((mp) => (
                    <tr key={mp.id} className="hover:bg-slate-50/80">
                      <td className="p-3 font-extrabold text-slate-900">{mp.cropName}</td>
                      <td className="p-3 text-slate-500">{mp.mandi} ({mp.state})</td>
                      <td className="p-3">₹{mp.minPrice}/kg</td>
                      <td className="p-3">₹{mp.maxPrice}/kg</td>
                      <td className="p-3 font-extrabold text-emerald-700">₹{mp.modalPrice}/kg</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          mp.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : mp.trend === 'down' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {mp.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : mp.trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                          {mp.trend.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Price Alerts */}
        {activeTab === 'alerts' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm max-w-xl">
            <h3 className="font-extrabold text-slate-900 text-base mb-2">Set Price Alert Notifications</h3>
            <p className="text-xs text-slate-500 mb-4">Get instant SMS & App notifications when farmers list crops at your target rate.</p>

            <form onSubmit={handleAddAlert} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Crop name"
                value={newTargetCrop}
                onChange={(e) => setNewTargetCrop(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
              <input
                type="number"
                placeholder="Target ₹/kg"
                value={newTargetPrice}
                onChange={(e) => setNewTargetPrice(e.target.value)}
                className="w-28 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
              <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm">
                Add Alert
              </button>
            </form>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Active Alerts</h4>
              {alerts.map((al) => (
                <div key={al.id} className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex justify-between text-xs font-bold text-emerald-950">
                  <span>{al.cropName}</span>
                  <span>Target: ₹{al.targetPrice}/kg</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Weather Updates with Regional Location Selector */}
        {activeTab === 'weather' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Farming Weather & Agricultural Advisory</h3>
                <p className="text-xs text-slate-500">Live regional agricultural weather forecasts and harvest recommendations.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Location:</span>
                <select
                  value={weatherLocation}
                  onChange={(e) => setWeatherLocation(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {Object.keys(weatherDataByLoc).map((loc) => (
                    <option key={loc} value={loc}>📍 {loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {currentWeather.map((w, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1 hover:border-emerald-500 transition-colors">
                  <span className="text-xs font-extrabold text-slate-500 block">{w.day}</span>
                  <Sun className="w-7 h-7 text-amber-500 mx-auto" />
                  <span className="text-lg font-extrabold text-slate-900 block">{w.temp}</span>
                  <p className="text-[10px] font-bold text-emerald-700">{w.cond}</p>
                  <p className="text-[10px] text-slate-500 leading-tight pt-1">{w.advisory}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Community */}
        {activeTab === 'community' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">Agri-Community Knowledge Sharing</h3>
            {communityPosts.map((post) => (
              <div key={post.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-extrabold text-emerald-700">{post.authorName} ({post.authorRole})</span>
                  <span className="text-[10px] text-slate-400">{post.createdAt}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{post.title}</h4>
                <p className="text-xs text-slate-600">{post.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Schemes */}
        {activeTab === 'schemes' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <h4 className="font-extrabold text-emerald-950 text-sm">PM-KISAN Samman Nidhi</h4>
              <p className="text-xs text-slate-600">Financial benefit of ₹6,000 per year in three equal installments to all landholding farmer families.</p>
              <a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="text-xs font-bold text-emerald-700 underline block">Apply on PM-KISAN Portal →</a>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <h4 className="font-extrabold text-emerald-950 text-sm">Pradhan Mantri Fasal Bima Yojana</h4>
              <p className="text-xs text-slate-600">Comprehensive crop insurance coverage against non-preventable natural risks from pre-sowing to post-harvest.</p>
              <a href="https://pmfby.gov.in" target="_blank" rel="noreferrer" className="text-xs font-bold text-emerald-700 underline block">PMFBY Portal →</a>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <h4 className="font-extrabold text-emerald-950 text-sm">Soil Health Card Scheme</h4>
              <p className="text-xs text-slate-600">Provides information to farmers on nutrient status of their soil along with recommendation on appropriate dosage of nutrients.</p>
              <a href="https://soilhealth.dac.gov.in" target="_blank" rel="noreferrer" className="text-xs font-bold text-emerald-700 underline block">View Soil Card Guidelines →</a>
            </div>
          </div>
        )}

        {/* Tab 6: Help */}
        {activeTab === 'help' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center max-w-xl mx-auto space-y-3">
            <h3 className="font-extrabold text-slate-900 text-lg">Kisan Bazaar Support & Helpline</h3>
            <p className="text-xs text-slate-500">Free Toll-Free Multilingual Assistance for Farmers & Buyers</p>
            <div className="p-4 bg-emerald-600 text-white rounded-xl text-xl font-extrabold inline-block shadow-md">
              📞 1800-180-1551
            </div>
            <p className="text-[11px] text-slate-400">Available 24/7 in Hindi, Marathi, Gujarati, Punjabi, Telugu, & English</p>
          </div>
        )}

      </div>
    </div>
  );
}
