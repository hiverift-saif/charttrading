import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setKycStatus } from '../redux/tradingSlice';
import { 
  ShieldCheck, Phone, Smartphone, Camera, 
  Loader2, CheckCircle, ArrowRight, FileCheck, Clock 
} from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import API_CONFIG from '../config';
import Swal from 'sweetalert2';

const KYCPage = () => {
  const { darkMode } = useTheme();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    aadhaarNumber: '',
    panNumber: '',
    aadhaarImage: null,
    panImage: null
  });

  const [previews, setPreviews] = useState({ aadhaar: null, pan: null });
  const aadhaarInputRef = useRef(null);
  const panInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [type === 'aadhaar' ? 'aadhaarImage' : 'panImage']: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 🚀 STEP 1: Start KYC (OTP Bhej rha hai)
  const startKYC = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      alert(token);
      const response = await axios.post(`${API_CONFIG.baseURL}/kyc/start`, 
        { phone: formData.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 || response.status === 201) {
        setStep(2);
        Swal.fire({ icon: 'info', title: 'OTP Sent', text: 'Verification code sent to your phone.' });
      }
    } catch (err) {
      console.error("Step 1 Error:", err.response?.data);
      Swal.fire({ icon: 'error', title: 'Failed', text: err.response?.data?.message || 'Error sending OTP' });
    } finally { setLoading(false); }
  };

  // 🚀 STEP 2: OTP State mein save karke Step 3 par jana
  const handleNextToDocs = (e) => {
    e.preventDefault();
    if (formData.otp.length === 6) {
      setStep(3);
    } else {
      Swal.fire({ icon: 'warning', text: 'Please enter a valid 6-digit OTP' });
    }
  };

  // 🚀 STEP 3: Final Submission (Aadhaar + PAN + OTP + Files)
  const completeKYC = async (e) => {
    e.preventDefault();
    if (!formData.aadhaarImage || !formData.panImage) {
      return Swal.fire({ icon: 'warning', text: 'Please upload both Aadhaar and PAN card images.' });
    }

    setLoading(true);
    const uploadData = new FormData();
    uploadData.append('otp', formData.otp);
    uploadData.append('aadhaarNumber', formData.aadhaarNumber);
    uploadData.append('panNumber', formData.panNumber);
    
    // Backend expects 'documents' key for multiple files
    uploadData.append('documents', formData.aadhaarImage); 
    uploadData.append('documents', formData.panImage); 

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${API_CONFIG.baseURL}/kyc/complete`, uploadData, {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' 
        }
      });

      console.log("Complete KYC API Response:", response.data);

      // Status check (Step 4 ke liye)
      if (response.status === 200 || response.status === 201) {
        dispatch(setKycStatus('pending'));
        localStorage.setItem('kyc_status', 'pending');
        setStep(4); // Ab yeh step 4 par bhej dega
      }
    } catch (err) {
      console.error("Step 3 Critical Error:", err.response?.data);
      Swal.fire({ 
        icon: 'error', 
        title: 'Submission Failed', 
        text: err.response?.data?.message || 'Server did not accept documents. Check OTP or file size.' 
      });
    } finally { setLoading(false); }
  };

  return (
    <div className={`min-h-screen p-4 md:p-10 transition-all duration-500 ${darkMode ? "bg-black text-white" : "bg-gray-50 text-slate-900"}`}>
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#f99616]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#f99616]/20">
            <ShieldCheck size={32} className="text-[#f99616]" />
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Identity <span className="text-[#f99616]">Verification</span></h2>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[3px] mt-2 italic">Secured by Binovera Protocol</p>
        </div>

        {/* --- STEP 1: PHONE --- */}
        {step === 1 && (
          <form onSubmit={startKYC} className={`p-8 rounded-[2.5rem] border shadow-2xl animate-in fade-in slide-in-from-bottom-4 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-200"}`}>
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Phone Number</label>
            <div className="relative mt-2 mb-6">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 size-5" />
              <input 
                name="phone" required type="tel" value={formData.phone} onChange={handleInputChange}
                className={`w-full h-14 rounded-2xl border pl-12 pr-4 font-bold outline-none transition-all ${darkMode ? "bg-black border-gray-800 focus:border-[#f99616] text-white" : "bg-gray-50 border-gray-200 focus:border-[#f99616]"}`} 
                placeholder="Enter 10-digit number"
              />
            </div>
            <button disabled={loading} className="w-full h-14 bg-[#f99616] text-black rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all">
              {loading ? <Loader2 className="animate-spin" /> : <>Get Verification Code <ArrowRight size={18}/></>}
            </button>
          </form>
        )}

        {/* --- STEP 2: OTP --- */}
        {step === 2 && (
          <form onSubmit={handleNextToDocs} className={`p-8 rounded-[2.5rem] border shadow-2xl animate-in zoom-in-95 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-200"}`}>
            <h4 className="text-sm font-black uppercase mb-6 flex items-center gap-2"><Smartphone className="text-[#f99616]" size={18}/> Verify Mobile</h4>
            <input 
              name="otp" maxLength="6" required value={formData.otp} onChange={handleInputChange} autoFocus
              className={`w-full h-16 text-center text-3xl font-black tracking-[1rem] border rounded-2xl outline-none mb-6 ${darkMode ? "bg-black border-gray-800 focus:border-[#f99616] text-white" : "bg-gray-50 border-gray-200 focus:border-[#f99616]"}`} 
              placeholder="000000"
            />
            <button type="submit" className="w-full h-14 bg-[#f99616] text-black rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all">
              Verify & Proceed
            </button>
            <button type="button" onClick={() => setStep(1)} className="w-full mt-4 text-[10px] font-black text-gray-500 uppercase hover:text-[#f99616]">Change Number</button>
          </form>
        )}

        {/* --- STEP 3: DOCUMENT UPLOAD --- */}
        {step === 3 && (
          <form onSubmit={completeKYC} className={`p-8 rounded-[2.5rem] border shadow-2xl space-y-6 animate-in zoom-in-95 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Aadhaar Card No.</label>
                <input name="aadhaarNumber" required value={formData.aadhaarNumber} onChange={handleInputChange} className={`w-full h-12 rounded-xl border px-4 font-bold ${darkMode ? "bg-black border-gray-800 text-white" : "bg-gray-50"}`} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">PAN Card No.</label>
                <input name="panNumber" required value={formData.panNumber} onChange={handleInputChange} className={`w-full h-12 rounded-xl border px-4 font-bold ${darkMode ? "bg-black border-gray-800 text-white" : "bg-gray-50"}`} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div onClick={() => aadhaarInputRef.current.click()} className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${previews.aadhaar ? 'border-[#f99616] bg-[#f99616]/5' : 'border-gray-800'}`}>
                {previews.aadhaar ? <img src={previews.aadhaar} className="h-24 mx-auto rounded-xl object-cover" /> : <div className="text-gray-500 flex flex-col items-center gap-1"><Camera size={24} /><p className="text-[9px] font-black uppercase tracking-widest">Upload Aadhaar</p></div>}
                <input type="file" ref={aadhaarInputRef} hidden accept="image/*" onChange={(e) => handleImageChange(e, 'aadhaar')} />
              </div>

              <div onClick={() => panInputRef.current.click()} className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${previews.pan ? 'border-blue-500 bg-blue-500/5' : 'border-gray-800'}`}>
                {previews.pan ? <img src={previews.pan} className="h-24 mx-auto rounded-xl object-cover" /> : <div className="text-gray-500 flex flex-col items-center gap-1"><FileCheck size={24} /><p className="text-[9px] font-black uppercase tracking-widest">Upload PAN</p></div>}
                <input type="file" ref={panInputRef} hidden accept="image/*" onChange={(e) => handleImageChange(e, 'pan')} />
              </div>
            </div>

            <button disabled={loading} className="w-full h-14 bg-[#f99616] text-black rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
              {loading ? <Loader2 className="animate-spin" /> : <>Submit All Documents <CheckCircle size={18}/></>}
            </button>
          </form>
        )}

        {/* --- STEP 4: SUCCESS STATUS --- */}
        {step === 4 && (
          <div className={`p-10 rounded-[2.5rem] border text-center shadow-2xl animate-in zoom-in-95 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
              <div className="relative w-full h-full bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
                <CheckCircle size={40} className="text-green-500" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-6">
              <Clock size={14} className="text-yellow-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500">Status: Pending Review</span>
            </div>

            <h3 className="text-2xl font-black uppercase italic text-white mb-2 tracking-tighter">Submission <span className="text-[#f99616]">Received</span></h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[2px] mb-8">
              Verification is in progress. Usually takes 2-4 hours.
            </p>

            <button onClick={() => window.location.href='/trading'} className="w-full h-14 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-[#f99616] transition-all shadow-xl">
              Back to Terminal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCPage;