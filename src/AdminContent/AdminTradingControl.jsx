import React, { useState, useEffect } from 'react';
import { 
  Settings, Zap, Power, Percent, Search, Plus, 
  Save, Clock, Radio, ShieldCheck, Activity, Trash2,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Filter, Download, RefreshCw, Edit, Trash
} from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_CONFIG from '../config';

const AdminTradingControl = ({ darkMode, activeSubTab }) => {
  const [assets, setAssets] = useState([]);
  const [tradeSettings, setTradeSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const token = localStorage.getItem("admin_token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // Toast Helper for consistency
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: darkMode ? '#1a1a1a' : '#fff',
    color: darkMode ? '#fff' : '#000'
  });

  useEffect(() => {
    if (activeSubTab === 'trading_assets') fetchAssets();
    if (activeSubTab === 'trading_payouts') fetchTradeSettings();
  }, [activeSubTab]);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_CONFIG.baseURL}/trade/assets`, authHeader);
      setAssets(res.data || []);
    } catch (err) { 
      console.error(err);
      Toast.fire({ icon: 'error', title: 'Failed to load assets' });
    } 
    finally { setLoading(false); }
  };

  const fetchTradeSettings = async () => {
    try {
      const res = await axios.get(`${API_CONFIG.baseURL}/trade/settings`, authHeader);
      // Handle direct response without nested result
      setTradeSettings(res.data);
    } catch (err) { 
      console.error(err);
      Toast.fire({ icon: 'error', title: 'Failed to load settings' });
    }
  };

  // Pagination logic
  const filteredAssets = assets.filter(a => 
    a.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssets = filteredAssets.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // --- 📡 ACTIONS WITH IMPROVED POP-UPS ---

  const openCreateModal = () => {
    Swal.fire({
      title: '<strong style="color: #f99616;">⚡ DEPLOY NEW ASSET</strong>',
      background: darkMode ? '#0d0d0d' : '#fff',
      color: darkMode ? '#fff' : '#000',
      confirmButtonColor: '#f99616',
      cancelButtonColor: '#6b7280',
      showCancelButton: true,
      confirmButtonText: '<strong>🚀 DEPLOY</strong>',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'swal-custom-popup',
        confirmButton: 'swal-confirm-btn',
        cancelButton: 'swal-cancel-btn'
      },
      html: `
        <style>
          .swal-form { text-align: left; }
          .swal-form-group { margin-bottom: 20px; }
          .swal-label { 
            display: block; 
            font-size: 11px; 
            font-weight: 700; 
            color: #f99616; 
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .swal-input-custom { 
            width: 100%; 
            padding: 12px 16px; 
            border: 2px solid ${darkMode ? '#27272a' : '#e5e7eb'}; 
            border-radius: 12px; 
            background: ${darkMode ? '#18181b' : '#fff'};
            color: ${darkMode ? '#fff' : '#000'};
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s;
            outline: none;
          }
          .swal-input-custom:focus { 
            border-color: #f99616; 
            box-shadow: 0 0 0 3px rgba(249, 150, 22, 0.1);
          }
          .swal-confirm-btn {
            padding: 12px 32px !important;
            border-radius: 12px !important;
            font-weight: 900 !important;
          }
          .swal-cancel-btn {
            padding: 12px 32px !important;
            border-radius: 12px !important;
            font-weight: 700 !important;
          }
        </style>
        <div class="swal-form">
          <div class="swal-form-group">
            <label class="swal-label">Asset Symbol</label>
            <input id="n-sym" class="swal-input-custom" placeholder="e.g., ETH, BTC, USDT">
          </div>
          <div class="swal-form-group">
            <label class="swal-label">Full Name</label>
            <input id="n-name" class="swal-input-custom" placeholder="e.g., Ethereum, Bitcoin">
          </div>
          <div class="swal-form-group">
            <label class="swal-label">Exchange Rate (USD)</label>
            <input id="n-rate" type="number" step="0.01" class="swal-input-custom" placeholder="0.00">
          </div>
        </div>
      `,
      preConfirm: () => {
        const symbol = document.getElementById('n-sym').value.trim();
        const name = document.getElementById('n-name').value.trim();
        const rate = document.getElementById('n-rate').value;
        
        if (!symbol || !name || !rate) {
          Swal.showValidationMessage('⚠️ Please fill in all fields');
          return false;
        }
        
        if (parseFloat(rate) <= 0) {
          Swal.showValidationMessage('⚠️ Exchange rate must be greater than 0');
          return false;
        }
        
        return { 
          symbol: symbol.toUpperCase(), 
          name, 
          exchangeRate: parseFloat(rate), 
          type: 'crypto' 
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(`${API_CONFIG.baseURL}/trade/createCurrency`, result.value, authHeader);
          Toast.fire({ icon: 'success', title: '✅ Asset deployed successfully' });
          fetchAssets();
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Deployment Failed',
            text: err.response?.data?.message || 'Failed to create asset',
            background: darkMode ? '#0d0d0d' : '#fff',
            color: darkMode ? '#fff' : '#000',
            confirmButtonColor: '#f99616'
          });
        }
      }
    });
  };

  // View Asset Config with GET request
  const handleViewAssetConfig = async (asset) => {
    try {
      // Fetch latest config from API
      const res = await axios.get(`${API_CONFIG.baseURL}/trade/assets/${asset.symbol}`, authHeader);
      const assetConfig = res.data;
      
      // Show config in modal
      Swal.fire({
        title: `<strong style="color: #f99616;">📋 ASSET CONFIG: ${assetConfig.symbol}</strong>`,
        background: darkMode ? '#0d0d0d' : '#fff',
        color: darkMode ? '#fff' : '#000',
        width: '700px',
        showCancelButton: true,
        confirmButtonText: '<strong>✏️ EDIT CONFIG</strong>',
        cancelButtonText: 'Close',
        confirmButtonColor: '#f99616',
        cancelButtonColor: '#6b7280',
        customClass: {
          popup: 'swal-custom-popup',
          confirmButton: 'swal-confirm-btn',
          cancelButton: 'swal-cancel-btn'
        },
        html: `
          <style>
            .config-view { text-align: left; padding: 20px 10px; }
            .config-grid { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 20px; 
              margin-bottom: 20px;
            }
            .config-item {
              padding: 16px;
              border-radius: 12px;
              background: ${darkMode ? '#18181b' : '#f9fafb'};
              border: 2px solid ${darkMode ? '#27272a' : '#e5e7eb'};
            }
            .config-item-label {
              font-size: 10px;
              font-weight: 700;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 8px;
            }
            .config-item-value {
              font-size: 18px;
              font-weight: 900;
              color: ${darkMode ? '#fff' : '#000'};
              font-family: 'Courier New', monospace;
            }
            .config-item-full {
              grid-column: 1 / -1;
            }
            .status-badge {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              padding: 6px 12px;
              border-radius: 999px;
              font-size: 11px;
              font-weight: 900;
              text-transform: uppercase;
            }
            .status-online {
              background: #10b98120;
              color: #10b981;
              border: 2px solid #10b98140;
            }
            .status-offline {
              background: #ef444420;
              color: #ef4444;
              border: 2px solid #ef444440;
            }
          </style>
          <div class="config-view">
            <div class="config-grid">
              <div class="config-item config-item-full">
                <div class="config-item-label">Asset Name</div>
                <div class="config-item-value">${assetConfig.name || 'N/A'}</div>
              </div>
              
              <div class="config-item">
                <div class="config-item-label">Symbol</div>
                <div class="config-item-value">${assetConfig.symbol}</div>
              </div>
              
              <div class="config-item">
                <div class="config-item-label">Type</div>
                <div class="config-item-value">${assetConfig.type || 'crypto'}</div>
              </div>
              
              <div class="config-item">
                <div class="config-item-label">Exchange Rate (USD)</div>
                <div class="config-item-value">$${(assetConfig.exchangeRate || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 8})}</div>
              </div>
              
              <div class="config-item">
                <div class="config-item-label">Status</div>
                <div class="config-item-value">
                  <span class="status-badge ${assetConfig.enabled ? 'status-online' : 'status-offline'}">
                    ${assetConfig.enabled ? '✓ ENABLED' : '✗ DISABLED'}
                  </span>
                </div>
              </div>
              
              <div class="config-item">
                <div class="config-item-label">Min Deposit</div>
                <div class="config-item-value">$${(assetConfig.depositMin || 0).toLocaleString()}</div>
              </div>
              
              <div class="config-item">
                <div class="config-item-label">Max Deposit</div>
                <div class="config-item-value">${assetConfig.depositMax ? '$' + assetConfig.depositMax.toLocaleString() : '∞'}</div>
              </div>
              
              <div class="config-item">
                <div class="config-item-label">Market Status</div>
                <div class="config-item-value">
                  <span class="status-badge ${assetConfig.marketOpen ? 'status-online' : 'status-offline'}">
                    ${assetConfig.marketOpen ? '🟢 OPEN' : '🔴 CLOSED'}
                  </span>
                </div>
              </div>
              
              <div class="config-item">
                <div class="config-item-label">Deposit Fee</div>
                <div class="config-item-value">${assetConfig.depositFeePercent || 0}%</div>
              </div>
              
              <div class="config-item">
                <div class="config-item-label">Withdrawal Fee</div>
                <div class="config-item-value">${assetConfig.withdrawalFeePercent || 0}%</div>
              </div>
              
              <div class="config-item config-item-full">
                <div class="config-item-label">Icon URL</div>
                <div class="config-item-value" style="font-size: 11px; word-break: break-all;">
                  ${assetConfig.iconUrl || 'Default'}
                </div>
              </div>
            </div>
          </div>
        `
      }).then((result) => {
        if (result.isConfirmed) {
          handleEditAssetConfig(assetConfig);
        }
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Config',
        text: err.response?.data?.message || 'Could not fetch asset configuration',
        background: darkMode ? '#0d0d0d' : '#fff',
        color: darkMode ? '#fff' : '#000',
        confirmButtonColor: '#f99616'
      });
    }
  };

  // Edit Asset Config
  const handleEditAssetConfig = (asset) => {
    Swal.fire({
      title: `<strong style="color: #f99616;">✏️ EDIT CONFIG: ${asset.symbol}</strong>`,
      background: darkMode ? '#0d0d0d' : '#fff',
      color: darkMode ? '#fff' : '#000',
      confirmButtonText: '<strong>💾 UPDATE CURRENCY</strong>',
      confirmButtonColor: '#f99616',
      cancelButtonColor: '#6b7280',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      width: '800px',
      customClass: {
        popup: 'swal-custom-popup',
        confirmButton: 'swal-confirm-btn',
        cancelButton: 'swal-cancel-btn'
      },
      html: `
        <style>
          .edit-form { text-align: left; padding: 10px; max-height: 500px; overflow-y: auto; }
          .edit-row { margin-bottom: 20px; }
          .edit-row-double { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 16px; 
            margin-bottom: 20px; 
          }
          .edit-label { 
            display: block; 
            font-size: 10px; 
            font-weight: 700; 
            color: #f99616; 
            margin-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .edit-input { 
            width: 100%; 
            padding: 12px 16px; 
            border: 2px solid ${darkMode ? '#27272a' : '#e5e7eb'}; 
            border-radius: 12px; 
            background: ${darkMode ? '#18181b' : '#fff'};
            color: ${darkMode ? '#fff' : '#000'};
            font-size: 14px;
            font-weight: 600;
            outline: none;
            transition: all 0.3s;
          }
          .edit-input:focus { 
            border-color: #f99616; 
            box-shadow: 0 0 0 3px rgba(249, 150, 22, 0.1);
          }
          .section-title {
            font-size: 11px;
            font-weight: 900;
            color: #f99616;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 24px 0 12px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid ${darkMode ? '#27272a' : '#e5e7eb'};
          }
        </style>
        <div class="edit-form">
          <!-- Basic Info -->
          <div class="section-title">📋 Basic Information</div>
          
          <div class="edit-row-double">
            <div>
              <label class="edit-label">Symbol</label>
              <input id="e-symbol" class="edit-input" value="${asset.symbol}" readonly style="opacity: 0.6; cursor: not-allowed;">
            </div>
            <div>
              <label class="edit-label">Type</label>
              <input id="e-type" class="edit-input" value="${asset.type || 'crypto'}">
            </div>
          </div>

          <div class="edit-row">
            <label class="edit-label">Asset Name</label>
            <input id="e-name" class="edit-input" value="${asset.name || ''}">
          </div>
          
          <div class="edit-row">
            <label class="edit-label">Icon URL</label>
            <input id="e-icon" class="edit-input" value="${asset.iconUrl || ''}" placeholder="https://example.com/icon.png">
          </div>
          
          <div class="edit-row">
            <label class="edit-label">Exchange Rate (USD)</label>
            <input id="e-rate" type="number" step="0.00000001" class="edit-input" value="${asset.exchangeRate || 0}">
          </div>

          <!-- Deposit Settings -->
          <div class="section-title">💰 Deposit Settings</div>
          
          <div class="edit-row-double">
            <div>
              <label class="edit-label">Min Deposit</label>
              <input id="e-dep-min" type="number" step="0.01" class="edit-input" value="${asset.depositMin || 0}">
            </div>
            <div>
              <label class="edit-label">Max Deposit</label>
              <input id="e-dep-max" type="number" step="0.01" class="edit-input" value="${asset.depositMax || 0}">
            </div>
          </div>

          <div class="edit-row">
            <label class="edit-label">Deposit Fee (%)</label>
            <input id="e-dep-fee" type="number" step="0.01" class="edit-input" value="${asset.depositFeePercent || 0}">
          </div>

          <!-- Withdrawal Settings -->
          <div class="section-title">💸 Withdrawal Settings</div>
          
          <div class="edit-row-double">
            <div>
              <label class="edit-label">Min Withdrawal</label>
              <input id="e-with-min" type="number" step="0.01" class="edit-input" value="${asset.withdrawalMin || 0}">
            </div>
            <div>
              <label class="edit-label">Max Withdrawal</label>
              <input id="e-with-max" type="number" step="0.01" class="edit-input" value="${asset.withdrawalMax || 0}">
            </div>
          </div>

          <div class="edit-row">
            <label class="edit-label">Withdrawal Fee (%)</label>
            <input id="e-with-fee" type="number" step="0.01" class="edit-input" value="${asset.withdrawalFeePercent || 0}">
          </div>
        </div>
      `,
      preConfirm: () => {
        const symbol = document.getElementById('e-symbol').value.trim();
        const name = document.getElementById('e-name').value.trim();
        const type = document.getElementById('e-type').value.trim();
        const iconUrl = document.getElementById('e-icon').value.trim();
        const exchangeRate = parseFloat(document.getElementById('e-rate').value);
        const depositMin = parseFloat(document.getElementById('e-dep-min').value);
        const depositMax = parseFloat(document.getElementById('e-dep-max').value);
        const depositFeePercent = parseFloat(document.getElementById('e-dep-fee').value);
        const withdrawalMin = parseFloat(document.getElementById('e-with-min').value);
        const withdrawalMax = parseFloat(document.getElementById('e-with-max').value);
        const withdrawalFeePercent = parseFloat(document.getElementById('e-with-fee').value);
        
        // Validations
        if (!name) {
          Swal.showValidationMessage('⚠️ Asset name is required');
          return false;
        }
        
        if (!type) {
          Swal.showValidationMessage('⚠️ Type is required');
          return false;
        }
        
        if (exchangeRate <= 0) {
          Swal.showValidationMessage('⚠️ Exchange rate must be greater than 0');
          return false;
        }
        
        if (depositMin < 0 || depositMax < 0 || withdrawalMin < 0 || withdrawalMax < 0) {
          Swal.showValidationMessage('⚠️ Limits cannot be negative');
          return false;
        }
        
        if (depositMax > 0 && depositMin > depositMax) {
          Swal.showValidationMessage('⚠️ Min deposit cannot exceed max deposit');
          return false;
        }
        
        if (withdrawalMax > 0 && withdrawalMin > withdrawalMax) {
          Swal.showValidationMessage('⚠️ Min withdrawal cannot exceed max withdrawal');
          return false;
        }

        if (depositFeePercent < 0 || depositFeePercent > 100) {
          Swal.showValidationMessage('⚠️ Deposit fee must be between 0-100%');
          return false;
        }

        if (withdrawalFeePercent < 0 || withdrawalFeePercent > 100) {
          Swal.showValidationMessage('⚠️ Withdrawal fee must be between 0-100%');
          return false;
        }
        
        return { 
          symbol,
          name, 
          type,
          iconUrl,
          exchangeRate,
          depositMin,
          depositMax,
          depositFeePercent,
          withdrawalMin,
          withdrawalMax,
          withdrawalFeePercent
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`${API_CONFIG.baseURL}/trade/updateCurrency/${asset.symbol}`, result.value, authHeader);
          Toast.fire({ icon: 'success', title: '✅ Currency updated successfully' });
          fetchAssets();
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: err.response?.data?.message || 'Failed to update currency',
            background: darkMode ? '#0d0d0d' : '#fff',
            color: darkMode ? '#fff' : '#000',
            confirmButtonColor: '#f99616'
          });
        }
      }
    });
  };

  // Delete Currency
  const handleDeleteCurrency = async (asset) => {
    const result = await Swal.fire({
      title: '⚠️ DELETE CURRENCY?',
      html: `
        <div style="text-align: center; padding: 20px 0;">
          <p style="margin: 20px 0; font-size: 16px;">Are you sure you want to permanently delete</p>
          <p style="font-size: 24px; font-weight: 900; color: #f99616; margin: 10px 0;">${asset.symbol}</p>
          <p style="font-size: 14px; color: #6b7280; margin-top: 5px;">(${asset.name})</p>
          <p style="color: #ef4444; font-size: 13px; margin-top: 20px; font-weight: 700;">⚠️ This action cannot be undone!</p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: '<strong>🗑️ Yes, Delete It</strong>',
      cancelButtonText: 'Cancel',
      background: darkMode ? '#0d0d0d' : '#fff',
      color: darkMode ? '#fff' : '#000',
      customClass: {
        confirmButton: 'swal-confirm-btn',
        cancelButton: 'swal-cancel-btn'
      }
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_CONFIG.baseURL}/trade/deleteCurrency/${asset.symbol}`, authHeader);
        Toast.fire({ 
          icon: 'success', 
          title: `✅ ${asset.symbol} deleted successfully` 
        });
        fetchAssets();
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: err.response?.data?.message || 'Failed to delete currency',
          background: darkMode ? '#0d0d0d' : '#fff',
          color: darkMode ? '#fff' : '#000',
          confirmButtonColor: '#f99616'
        });
      }
    }
  };

  const handleToggleAsset = async (symbol, currentEnabled) => {
    const result = await Swal.fire({
      title: currentEnabled ? '⚠️ Deactivate Asset?' : '✅ Activate Asset?',
      text: `Are you sure you want to ${currentEnabled ? 'deactivate' : 'activate'} ${symbol}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: currentEnabled ? '#ef4444' : '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: currentEnabled ? 'Yes, Deactivate' : 'Yes, Activate',
      background: darkMode ? '#0d0d0d' : '#fff',
      color: darkMode ? '#fff' : '#000'
    });

    if (result.isConfirmed) {
      try {
        await axios.post(`${API_CONFIG.baseURL}/trade/assets/${symbol}/toggle`, { enabled: !currentEnabled }, authHeader);
        setAssets(prev => prev.map(a => a.symbol === symbol ? { ...a, enabled: !currentEnabled } : a));
        Toast.fire({ 
          icon: currentEnabled ? 'warning' : 'success', 
          title: `${symbol} ${currentEnabled ? 'Deactivated' : 'Activated'}` 
        });
      } catch (err) { 
        Toast.fire({ icon: 'error', title: 'Action failed' }); 
      }
    }
  };

  const handleUpdateGlobalSettings = async () => {
    const result = await Swal.fire({
      title: '🚀 Commit System Update?',
      text: 'This will push all trading parameters to production.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f99616',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Commit Update',
      background: darkMode ? '#0d0d0d' : '#fff',
      color: darkMode ? '#fff' : '#000'
    });

    if (result.isConfirmed) {
      try {
        await axios.post(`${API_CONFIG.baseURL}/trade/settings`, tradeSettings, authHeader);
        Swal.fire({
          icon: 'success',
          title: '✅ ENGINE UPDATED',
          text: 'All trading parameters have been pushed to production.',
          background: darkMode ? '#0d0d0d' : '#fff',
          color: darkMode ? '#fff' : '#000',
          confirmButtonColor: '#f99616'
        });
      } catch (err) { 
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: err.response?.data?.message || 'Failed to update settings',
          background: darkMode ? '#0d0d0d' : '#fff',
          color: darkMode ? '#fff' : '#000',
          confirmButtonColor: '#f99616'
        });
      }
    }
  };

  // --- 🛠️ UI RENDERING ---

  const renderAssets = () => (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border w-full lg:w-96 transition-all ${darkMode ? 'bg-zinc-900/50 border-zinc-800 focus-within:border-[#f99616]' : 'bg-white border-zinc-200 focus-within:border-[#f99616]'}`}>
          <Search size={18} className="text-zinc-500" />
          <input 
            className="bg-transparent outline-none text-sm w-full font-semibold placeholder:text-zinc-500" 
            placeholder="Search assets..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 w-full lg:w-auto">
          <button 
            onClick={fetchAssets}
            className={`px-4 py-3 rounded-xl border font-bold text-sm transition-all hover:scale-105 active:scale-95 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:text-black'}`}
          >
            <RefreshCw size={18} />
          </button>
          <button 
            onClick={openCreateModal} 
            className="flex-1 lg:flex-none px-6 py-3 bg-[#f99616] text-black font-black rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#f99616]/20"
          >
            <Plus size={20} /> DEPLOY ASSET
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          darkMode={darkMode}
          label="Total Assets"
          value={assets.length}
          icon={<Activity size={20} />}
          color="blue"
        />
        <StatCard 
          darkMode={darkMode}
          label="Active"
          value={assets.filter(a => a.enabled).length}
          icon={<Power size={20} />}
          color="green"
        />
        <StatCard 
          darkMode={darkMode}
          label="Inactive"
          value={assets.filter(a => !a.enabled).length}
          icon={<Power size={20} />}
          color="red"
        />
        <StatCard 
          darkMode={darkMode}
          label="Filtered Results"
          value={filteredAssets.length}
          icon={<Filter size={20} />}
          color="orange"
        />
      </div>

      {/* Table */}
      <div className={`overflow-hidden rounded-2xl border shadow-2xl ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#f99616] border-t-transparent"></div>
          </div>
        ) : currentAssets.length === 0 ? (
          <div className="text-center py-20">
            <Activity size={48} className="mx-auto mb-4 text-zinc-600" />
            <p className="text-zinc-500 font-semibold">No assets found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`text-[11px] font-black uppercase tracking-wider border-b ${darkMode ? 'bg-zinc-900/80 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'}`}>
                  <tr>
                    <th className="px-6 py-4 text-left">Asset</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Exchange Rate</th>
                    <th className="px-6 py-4 text-right">Min Deposit</th>
                    <th className="px-6 py-4 text-right">Max Deposit</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-zinc-800/50' : 'divide-zinc-200/50'}`}>
                  {currentAssets.map((asset, index) => (
                    <tr 
                      key={asset._id} 
                      className={`group transition-all ${darkMode ? 'hover:bg-[#f99616]/5' : 'hover:bg-[#f99616]/5'}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img 
                              src={asset.iconUrl || `https://ui-avatars.com/api/?name=${asset.symbol}&background=f99616&color=000&bold=true`} 
                              className="w-11 h-11 rounded-full border-2 border-zinc-800 grayscale group-hover:grayscale-0 transition-all shadow-lg" 
                              alt={asset.symbol}
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${asset.symbol}&background=f99616&color=000&bold=true`;
                              }}
                            />
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${darkMode ? 'border-zinc-950' : 'border-white'} ${asset.enabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          </div>
                          <div>
                            <div className={`text-sm font-black italic ${darkMode ? 'text-white' : 'text-black'}`}>{asset.symbol}</div>
                            <div className="text-[11px] text-zinc-500 font-bold uppercase tracking-wide">{asset.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className={`inline-flex items-center gap-2 text-[10px] font-black px-3 py-1.5 rounded-full border ${
                            asset.marketOpen 
                              ? 'text-green-500 border-green-500/30 bg-green-500/10' 
                              : 'text-red-500 border-red-500/30 bg-red-500/10'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${asset.marketOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                            {asset.marketOpen ? 'ONLINE' : 'OFFLINE'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-mono font-bold text-[#f99616]">
                          ${asset.exchangeRate?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`text-xs font-mono ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          ${asset.depositMin?.toLocaleString() || '0'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`text-xs font-mono ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          ${asset.depositMax?.toLocaleString() || '∞'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          {/* <button 
                            onClick={() => handleViewAssetConfig(asset)} 
                            className={`p-2.5 rounded-lg border transition-all hover:scale-110 active:scale-95 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500/10' : 'bg-white border-zinc-300 text-zinc-600 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500/10'}`}
                            title="View Config"
                          >
                            <Settings size={16}/>
                          </button> */}
                          <button 
                            onClick={() => handleEditAssetConfig(asset)} 
                            className={`p-2.5 rounded-lg border transition-all hover:scale-110 active:scale-95 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-[#f99616] hover:border-[#f99616] hover:bg-[#f99616]/10' : 'bg-white border-zinc-300 text-zinc-600 hover:text-[#f99616] hover:border-[#f99616] hover:bg-[#f99616]/10'}`}
                            title="Edit Currency"
                          >
                            <Edit size={16}/>
                          </button>
                          <button 
                            onClick={() => handleDeleteCurrency(asset)} 
                            className={`p-2.5 rounded-lg border transition-all hover:scale-110 active:scale-95 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-red-500 hover:border-red-500 hover:bg-red-500/10' : 'bg-white border-zinc-300 text-zinc-600 hover:text-red-500 hover:border-red-500 hover:bg-red-500/10'}`}
                            title="Delete Currency"
                          >
                            <Trash size={16}/>
                          </button>
                          <button 
                            onClick={() => handleToggleAsset(asset.symbol, asset.enabled)} 
                            className={`p-2.5 rounded-lg border transition-all hover:scale-110 active:scale-95 ${
                              asset.enabled 
                                ? 'bg-green-500/10 text-green-500 border-green-500/30 hover:bg-green-500/20' 
                                : 'bg-zinc-900 text-zinc-600 border-zinc-800 hover:bg-zinc-800'
                            }`}
                            title={asset.enabled ? 'Deactivate' : 'Activate'}
                          >
                            <Power size={16}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={`px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${darkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-50'}`}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-zinc-500">Rows per page:</span>
                <select 
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold outline-none cursor-pointer ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-300 text-black'}`}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-500 mr-4">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredAssets.length)} of {filteredAssets.length}
                </span>
                
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#f99616]/10 hover:text-[#f99616]'} ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
                >
                  <ChevronsLeft size={18} />
                </button>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#f99616]/10 hover:text-[#f99616]'} ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            currentPage === pageNum
                              ? 'bg-[#f99616] text-black shadow-lg'
                              : darkMode
                              ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                              : 'bg-white text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                      return <span key={pageNum} className="px-2 text-zinc-500">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#f99616]/10 hover:text-[#f99616]'} ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
                >
                  <ChevronRight size={18} />
                </button>

                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#f99616]/10 hover:text-[#f99616]'} ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
                >
                  <ChevronsRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderPayouts = () => tradeSettings && (
    <div className={`p-8 sm:p-12 rounded-3xl border shadow-2xl ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[11px] font-black text-[#f99616] tracking-wider uppercase flex items-center gap-2">
              <Percent size={14} /> Global Payout Multiplier (%)
            </label>
            <div className={`flex items-center gap-4 p-6 rounded-2xl border transition-all ${darkMode ? 'bg-black border-zinc-800 hover:border-[#f99616]' : 'bg-zinc-50 border-zinc-200 hover:border-[#f99616]'}`}>
              <Percent className="text-zinc-500" size={28}/>
              <input 
                type="number" 
                value={tradeSettings.payoutPercentage} 
                onChange={(e) => setTradeSettings({...tradeSettings, payoutPercentage: parseFloat(e.target.value)})} 
                className={`bg-transparent w-full outline-none font-black text-4xl italic ${darkMode ? 'text-white' : 'text-black'}`}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[11px] font-black text-[#f99616] tracking-wider uppercase flex items-center gap-2">
              <Clock size={14} /> Network Latency Delay (Seconds)
            </label>
            <div className={`flex items-center gap-4 p-6 rounded-2xl border transition-all ${darkMode ? 'bg-black border-zinc-800 hover:border-[#f99616]' : 'bg-zinc-50 border-zinc-200 hover:border-[#f99616]'}`}>
              <Clock className="text-zinc-500" size={28}/>
              <input 
                type="number" 
                value={tradeSettings.executionDelaySeconds} 
                onChange={(e) => setTradeSettings({...tradeSettings, executionDelaySeconds: parseFloat(e.target.value)})} 
                className={`bg-transparent w-full outline-none font-black text-4xl italic ${darkMode ? 'text-white' : 'text-black'}`}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black text-[#f99616] tracking-wider uppercase flex items-center gap-2">
              <Activity size={14} /> Trading Spread
            </label>
            <div className={`flex items-center gap-4 p-6 rounded-2xl border transition-all ${darkMode ? 'bg-black border-zinc-800 hover:border-[#f99616]' : 'bg-zinc-50 border-zinc-200 hover:border-[#f99616]'}`}>
              <Activity className="text-zinc-500" size={28}/>
              <input 
                type="number" 
                step="0.0001"
                value={tradeSettings.spread} 
                onChange={(e) => setTradeSettings({...tradeSettings, spread: parseFloat(e.target.value)})} 
                className={`bg-transparent w-full outline-none font-black text-4xl italic ${darkMode ? 'text-white' : 'text-black'}`}
              />
            </div>
          </div>
        </div>
        
        <div className={`p-8 rounded-2xl border border-dashed space-y-4 ${darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}>
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck size={16} className="text-[#f99616]" />
            <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-wider">Engine Protocols</h3>
          </div>
          <ProtocolRow 
            darkMode={darkMode}
            label="Main Engine Status" 
            checked={tradeSettings.tradingEnabled} 
            onChange={(v) => setTradeSettings({...tradeSettings, tradingEnabled: v})} 
          />
          <ProtocolRow 
            darkMode={darkMode}
            label="Real Mode Execution" 
            checked={tradeSettings.realModeEnabled} 
            onChange={(v) => setTradeSettings({...tradeSettings, realModeEnabled: v})} 
          />
          <ProtocolRow 
            darkMode={darkMode}
            label="Demo Environment" 
            checked={tradeSettings.demoModeEnabled} 
            onChange={(v) => setTradeSettings({...tradeSettings, demoModeEnabled: v})} 
          />
        </div>
      </div>
      
      <button 
        onClick={handleUpdateGlobalSettings} 
        className="w-full mt-10 py-6 bg-[#f99616] text-black font-black uppercase text-sm rounded-2xl hover:scale-[1.02] transition-all shadow-2xl shadow-[#f99616]/30 flex items-center justify-center gap-3 active:scale-100"
      >
        <ShieldCheck size={22}/> COMMIT SYSTEM UPDATE
      </button>
    </div>
  );

  return (
    <div className="space-y-8 p-2">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-3xl lg:text-4xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-black'}`}>
            TRADE <span className="text-[#f99616]">CONTROL</span>
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
            <span className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase">Kernel Active</span>
          </div>
        </div>
      </div>
      
      {activeSubTab === 'trading_assets' ? renderAssets() : renderPayouts()}
    </div>
  );
};

// --- Sub-components ---

const StatCard = ({ darkMode, label, value, icon, color }) => {
  const colorClasses = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    green: 'text-green-500 bg-green-500/10 border-green-500/20',
    red: 'text-red-500 bg-red-500/10 border-red-500/20',
    orange: 'text-[#f99616] bg-[#f99616]/10 border-[#f99616]/20'
  };

  return (
    <div className={`p-5 rounded-xl border transition-all hover:scale-105 ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
          <p className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-xl border ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const ProtocolRow = ({ darkMode, label, checked, onChange }) => (
  <div className={`flex justify-between items-center p-4 rounded-xl border transition-all ${darkMode ? 'bg-black/50 border-zinc-800/50 hover:border-zinc-700' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}>
    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)} 
      />
      <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:bg-[#f99616] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 shadow-inner"></div>
    </label>
  </div>
);

export default AdminTradingControl;