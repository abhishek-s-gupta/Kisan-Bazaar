import React, { useState } from 'react';
import { db } from '../db/database';
import { PlusCircle, Upload, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { getCropImageFallback, resolveCropImageUrl } from '../utils/cropImages';

export function AddCropListing({ currentRole, onCreated, onCancel }) {
  const [formData, setFormData] = useState({
    cropName: '',
    category: 'Vegetables',
    quantity: '',
    unit: 'kg',
    qualityGrade: 'A Grade',
    pricePerUnit: '',
    location: 'Nashik, Maharashtra',
    description: '',
    photoUrl: '/crops/tomatoes.jpg'
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const sampleImages = [
    { label: 'Red Tomatoes', url: '/crops/tomatoes.jpg' },
    { label: 'Fresh Onions', url: '/crops/onions.jpg' },
    { label: 'Clean Potatoes', url: '/crops/potatoes.jpg' },
    { label: 'Green Chillies', url: '/crops/chillies.jpg' },
    { label: 'Fresh Carrots', url: '/crops/carrots.jpg' },
    { label: 'Cauliflower', url: '/crops/cauliflower.jpg' },
    { label: 'Green Capsicum', url: '/crops/capsicum.jpg' },
    { label: 'Fresh Spinach', url: '/crops/spinach.jpg' },
    { label: 'Highland Broccoli', url: '/crops/broccoli.jpg' },
    { label: 'Sweet Green Peas', url: '/crops/peas.jpg' },
    { label: 'Purple Brinjal', url: '/crops/brinjal.jpg' },
    { label: 'Fresh Ginger', url: '/crops/ginger.jpg' },
    { label: 'White Garlic', url: '/crops/garlic.jpg' },
    { label: 'Shimla Apples', url: '/crops/apples.jpg' },
    { label: 'Alphonso Mangoes', url: '/crops/mangoes.jpg' },
    { label: 'Yellow Bananas', url: '/crops/bananas.jpg' },
    { label: 'Nagpur Oranges', url: '/crops/oranges.jpg' },
    { label: 'Pomegranate', url: '/crops/pomegranate.jpg' },
    { label: 'Seedless Grapes', url: '/crops/grapes.jpg' },
    { label: 'Strawberries', url: '/crops/strawberries.jpg' },
    { label: 'Watermelon', url: '/crops/watermelon.jpg' },
    { label: 'Golden Papaya', url: '/crops/papaya.jpg' },
    { label: 'Golden Wheat', url: '/crops/wheat.jpg' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cropName || !formData.quantity || !formData.pricePerUnit) {
      alert('Please fill out all required crop details.');
      return;
    }

    setLoading(true);
    try {
      const newListing = {
        farmerId: 1, // Ramesh Patil default ID
        farmerName: 'Ramesh Patil',
        farmerLocation: formData.location,
        cropName: formData.cropName,
        category: formData.category,
        quantity: Number(formData.quantity),
        unit: formData.unit,
        qualityGrade: formData.qualityGrade,
        pricePerUnit: Number(formData.pricePerUnit),
        description: formData.description || `${formData.qualityGrade} fresh ${formData.cropName} directly from farmer.`,
        photoUrl: formData.photoUrl,
        status: 'Active',
        createdAt: new Date().toISOString()
      };

      await db.listings.add(newListing);
      setSuccessMsg(true);
      setTimeout(() => {
        onCreated();
      }, 1200);
    } catch (err) {
      console.error('Error posting crop:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={onCancel}
        className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs font-bold mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        
        <div className="border-b border-slate-100 pb-5 mb-6">
          <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Step 2: List Produce (Farmer Side)</span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Post Your Farm Harvest</h1>
          <p className="text-slate-500 text-xs mt-1">Upload your crop details to get instant visibility to verified wholesale & retail buyers.</p>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            Your produce listing has been saved to the database and is live on the marketplace!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Crop Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Crop Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Tomatoes, Onions, Wheat"
                value={formData.cropName}
                onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains & Pulses</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Available Quantity *</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  required
                  placeholder="e.g. 500"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                >
                  <option value="kg">kg</option>
                  <option value="quintal">quintal</option>
                  <option value="ton">ton</option>
                </select>
              </div>
            </div>

            {/* Price Per Unit */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Expected Price (₹/{formData.unit}) *</label>
              <input
                type="number"
                required
                placeholder="e.g. 20"
                value={formData.pricePerUnit}
                onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Quality Grade */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Quality Grade *</label>
              <select
                value={formData.qualityGrade}
                onChange={(e) => setFormData({ ...formData, qualityGrade: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="A Grade">A Grade (Export Quality)</option>
                <option value="B Grade">B Grade (Standard Market Quality)</option>
                <option value="C Grade">C Grade (Processing Quality)</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Farm Location *</label>
              <input
                type="text"
                required
                list="farm-locations-list"
                placeholder="e.g. Nashik, Maharashtra or Kolar, Karnataka"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <datalist id="farm-locations-list">
                <option value="Nashik, Maharashtra" />
                <option value="Pune, Maharashtra" />
                <option value="Satara, Maharashtra" />
                <option value="Jalgaon, Maharashtra" />
                <option value="Ratnagiri, Maharashtra" />
                <option value="Kolar, Karnataka" />
                <option value="Bengaluru Rural, Karnataka" />
                <option value="Shimla, Himachal Pradesh" />
                <option value="Srinagar, Jammu & Kashmir" />
                <option value="Ludhiana, Punjab" />
                <option value="Khanna, Punjab" />
                <option value="Ooty, Tamil Nadu" />
                <option value="Indore, Madhya Pradesh" />
                <option value="Chhindwara, Madhya Pradesh" />
                <option value="Udaipur, Rajasthan" />
                <option value="Kota, Rajasthan" />
                <option value="Guntur, Andhra Pradesh" />
                <option value="Anantapur, Andhra Pradesh" />
                <option value="Anand, Gujarat" />
              </datalist>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {['Nashik', 'Kolar', 'Shimla', 'Srinagar', 'Ludhiana', 'Ooty', 'Guntur'].map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      const fullMap = {
                        'Nashik': 'Nashik, Maharashtra',
                        'Kolar': 'Kolar, Karnataka',
                        'Shimla': 'Shimla, Himachal Pradesh',
                        'Srinagar': 'Srinagar, Jammu & Kashmir',
                        'Ludhiana': 'Ludhiana, Punjab',
                        'Ooty': 'Ooty, Tamil Nadu',
                        'Guntur': 'Guntur, Andhra Pradesh'
                      };
                      setFormData({ ...formData, location: fullMap[city] || city });
                    }}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 transition-colors"
                  >
                    +{city}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Produce Description</label>
            <textarea
              rows="3"
              placeholder="Mention harvesting date, organic methods used, packaging details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Photo Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Select Crop Photo</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {sampleImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData({ ...formData, photoUrl: img.url })}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                    formData.photoUrl === img.url ? 'border-emerald-600 scale-95 shadow-md' : 'border-transparent hover:border-slate-300'
                  }`}
                >
                  <img 
                    src={resolveCropImageUrl(img.url, img.label)} 
                    alt={img.label} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getCropImageFallback(img.label);
                    }}
                    className="w-full h-16 object-cover" 
                  />
                  <p className="text-[10px] font-bold text-center py-1 bg-slate-100 text-slate-700 truncate px-1">
                    {img.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              {loading ? 'Posting...' : 'Post Listing'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
