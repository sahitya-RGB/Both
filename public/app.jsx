import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_URL = "https://your-backend-url.com/api"; // Update after deployment

export default function App() {
  const [step, setStep] = useState('landing'); // landing, loading, result
  const [formData, setFormData] = useState({
    instagramUsername: '',
    viewerName: '',
    relationship: 'Friend',
    selectedTimeRange: 'Last 24h'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep('loading');
    try {
      await axios.post(`${API_URL}/submit`, formData);
      setTimeout(() => setStep('result'), 6000); // Fake scan delay
    } catch (err) {
      alert("System Error. Try again.");
      setStep('landing');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
      <AnimatePresence mode="wait">
        {step === 'landing' && <Landing setFormData={setFormData} formData={formData} onSubmit={handleSubmit} />}
        {step === 'loading' && <LoadingScreen />}
        {step === 'result' && <ResultPage data={formData} />}
      </AnimatePresence>
      
      <footer className="fixed bottom-4 w-full text-center text-[10px] text-gray-600 uppercase tracking-widest">
        This is a simulated tool for entertainment purposes only.
      </footer>
    </div>
  );
}

// --- COMPONENTS ---

function Landing({ formData, setFormData, onSubmit }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6"
    >
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Insta Profile Insights
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Check Who Viewed Your Profile 👀</p>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <input 
            required placeholder="Your Instagram Username"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all"
            onChange={e => setFormData({...formData, instagramUsername: e.target.value})}
          />
          <input 
            required placeholder="Target Viewer Name"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all"
            onChange={e => setFormData({...formData, viewerName: e.target.value})}
          />
          <select 
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none"
            onChange={e => setFormData({...formData, relationship: e.target.value})}
          >
            <option>Friend</option><option>Crush</option><option>GF/BF</option><option>Ex</option>
          </select>
          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-purple-500/20">
            Scan Profile
          </button>
        </form>
      </div>
    </motion.div>
  );
}

function LoadingScreen() {
  const [text, setText] = useState("Initializing Deep Scan...");
  const phrases = ["Connecting to Meta Servers...", "Bypassing Privacy Layers...", "Analyzing Metadata...", "Decrypting Activity Logs...", "Finalizing Report..."];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if(i < phrases.length) setText(phrases[i++]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <div className="relative w-24 h-24">
        <motion.div 
          animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-full h-full border-4 border-t-purple-500 border-white/5 rounded-full"
        />
      </div>
      <motion.p key={text} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-light tracking-widest text-purple-400">
        {text}
      </motion.p>
    </motion.div>
  );
}

function ResultPage({ data }) {
  const views = Math.floor(Math.random() * (250 - 50) + 50);
  return (
    <motion.div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl text-center">
        <div className="inline-block p-4 rounded-full bg-green-500/10 text-green-400 mb-4 font-mono text-sm tracking-tighter">
          Analysis Complete
        </div>
        <h2 className="text-5xl font-black mb-2">{views}</h2>
        <p className="text-gray-400 mb-8 uppercase tracking-widest text-xs">Profile views in last 24h</p>
        
        <div className="space-y-3 text-left">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
            <div>
              <p className="font-bold">{data.viewerName}</p>
              <p className="text-xs text-purple-400">{data.relationship}</p>
            </div>
            <p className="text-xs text-gray-500">Viewed 4m ago</p>
          </div>
          {/* Fake extra entries */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 opacity-50 flex justify-between items-center">
            <p className="font-bold">Private User</p>
            <p className="text-xs text-gray-500">Viewed 2h ago</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
