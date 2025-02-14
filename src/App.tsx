import { useState, useCallback, useEffect } from 'react';
import { Copy, RefreshCw, Shield, ShieldCheck, Key, Lock, Vault, Plus, Trash2, LogIn, KeyRound, Settings, Save, Search, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SavedPassword {
  id: string;
  password: string;
  account: string;
  createdAt: string;
}

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [copied, setCopied] = useState(false);
  const [savedPasswords, setSavedPasswords] = useState<SavedPassword[]>([]);
  const [newAccount, setNewAccount] = useState('');
  const [showVault, setShowVault] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('passwordVault');
    if (stored) {
      setSavedPasswords(JSON.parse(stored));
    }
  }, []);

  const filteredPasswords = savedPasswords.filter(entry =>
    entry.account.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const saveToVault = () => {
    if (!password || !newAccount) return;
    
    const newEntry: SavedPassword = {
      id: crypto.randomUUID(),
      password,
      account: newAccount,
      createdAt: new Date().toISOString()
    };
    
    const updatedPasswords = [newEntry, ...savedPasswords];
    setSavedPasswords(updatedPasswords);
    localStorage.setItem('passwordVault', JSON.stringify(updatedPasswords));
    setNewAccount('');
    setShowSaveForm(false);
  };

  const deleteFromVault = (id: string) => {
    const updatedPasswords = savedPasswords.filter(p => p.id !== id);
    setSavedPasswords(updatedPasswords);
    localStorage.setItem('passwordVault', JSON.stringify(updatedPasswords));
  };

  const generatePassword = useCallback(() => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    if (!chars) {
      setPassword('Please select at least one option');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
  }, [length, options]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const calculateStrength = () => {
    if (!password || password === 'Please select at least one option') return 0;
    let strength = 0;
    if (options.uppercase) strength += 25;
    if (options.lowercase) strength += 25;
    if (options.numbers) strength += 25;
    if (options.symbols) strength += 25;
    return Math.min(100, strength * (length / 12));
  };

  if (showLanding) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-8 inline-block"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-800 to-blue-600 rounded-2xl flex items-center justify-center transform rotate-45 relative">
              <Key className="w-12 h-12 text-white absolute -rotate-45" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-4"
          >
            SecureVault
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 mb-8"
          >
            Generate and store secure passwords with confidence
          </motion.p>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setShowLanding(false)}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-8 rounded-lg font-medium hover:from-red-900 hover:to-orange-800 transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
          >
            <LogIn className="w-5 h-5" />
            Get Started
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex">
      {/* Side Navigation */}
      <motion.div
  initial={{ x: -100 }}
  animate={{ x: 0 }}
  className="fixed top-0 left-0 w-full md:w-20 md:top-[49%]  md:bg-blue-800/50 backdrop-blur-sm md:border-b-2 border-blue-800 flex md:flex-col flex-row items-center md:items-center justify-center md:justify-start py-4 md:py-8 gap-10 z-50  md:rounded-tr-2xl md:rounded-br-2xl"
>
  <div className="mb-0 md:mb-12">
    {/* logo */}
    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
      <Key className="w-6 h-6 text-white" />
    </div>
  </div>

  <nav className="flex md:flex-col flex-row items-center gap-4">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        setShowVault(false);
        setIsSearching(false);
        setSearchQuery('');
      }}
      className={`p-3 rounded-xl transition-colors ${
        !showVault ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-gray-700/50'
      }`}
    >
      <KeyRound className="w-6 h-6" />
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setShowVault(true)}
      className={`p-3 rounded-xl transition-colors ${
        showVault ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-gray-700/50'
      }`}
    >
      <Vault className="w-6 h-6" />
    </motion.button>
  </nav>
</motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 matrix-bg opacity-30"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-gray-800/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-700 mt-20 md:mt-0">
            <AnimatePresence mode="wait">
              {showVault ? (
                <motion.div
                  key="vault"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-6">
                    {isSearching ? (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onClick={() => {
                          setIsSearching(false);
                          setSearchQuery('');
                        }}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <ArrowLeft className="w-6 h-6" />
                      </motion.button>
                    ) : (
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Vault className="w-6 h-6" />
                        Password Vault
                      </h2>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsSearching(!isSearching)}
                      className={`p-2 rounded-lg transition-colors ${isSearching ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                    >
                      <Search className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {isSearching && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative mb-4"
                      >
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search accounts..."
                          className="w-full bg-gray-900/50 p-3 pl-10 rounded-lg border border-gray-700 text-white"
                          autoFocus
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/*Vault accounts cards  */}
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
                    <AnimatePresence>
                      {filteredPasswords.map((entry, index) => (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            rotateX: 0,
                            transition: { delay: index * 0.1 }
                          }}
                          exit={{ opacity: 0, scale: 0.8, rotateX: 30 }}
                          className="card-3d bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-6 rounded-xl border border-gray-700 shadow-lg"
                        >
                          <div className="card-content">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-cyan-400 font-medium text-lg">{entry.account}</span>
                              <div className="flex gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => copyToClipboard(entry.password)}
                                  className="p-2 hover:bg-gray-700/50 rounded-lg"
                                >
                                  <Copy className="w-4 h-4 text-gray-400" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => deleteFromVault(entry.id)}
                                  className="p-2 hover:bg-gray-700/50 rounded-lg"
                                >
                                  <Trash2 className="w-4 h-4 text-red-400" />
                                </motion.button>
                              </div>
                            </div>
                            <div className="text-gray-400 text-sm font-mono bg-gray-900/50 p-2 rounded-lg">
                              {entry.password.replace(/./g, '•')}
                            </div>
                            <div className="text-gray-500 text-xs mt-2">
                              Added: {new Date(entry.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : (
                // Password Generation Screen
                <motion.div
                  key="generator"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <KeyRound className="w-6 h-6" />
                    Password Generator
                  </h2>

                  <div className="relative mb-6">
                    <div className="bg-gray-900/50 p-4 rounded-lg flex items-center justify-between border border-gray-700">
                      <input
                        type="text"
                        value={password}
                        readOnly
                        className="bg-transparent text-cyan-400 font-mono flex-1 outline-none"
                        placeholder="Generated password"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(password)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                          title="Copy to clipboard"
                        >
                          {copied ? (
                            <ShieldCheck className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => setShowSaveForm(true)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                          title="Save to vault"
                          disabled={!password}
                        >
                          <Save className="w-5 h-5 text-cyan-400" />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {showSaveForm && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute inset-x-0 top-full mt-2 bg-gray-900/90 border border-gray-700 rounded-lg p-4 backdrop-blur-sm"
                        >
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newAccount}
                              onChange={(e) => setNewAccount(e.target.value)}
                              placeholder="Account/App name"
                              className="flex-1 bg-gray-800/50 p-2 rounded-lg border border-gray-700 text-white"
                            />
                            <button
                              onClick={saveToVault}
                              disabled={!password || !newAccount}
                              className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-gray-300 flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4" />
                        Password Length: {length}
                      </label>
                      <input
                        type="range"
                        min="8"
                        max="32"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(options).map(([key, value]) => (
                        <label
                          key={key}
                          className="flex items-center space-x-2 text-gray-300 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() =>
                              setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
                            }
                            className="form-checkbox h-4 w-4 text-cyan-400 rounded border-gray-600 bg-gray-700 focus:ring-cyan-400"
                          />
                          <span className="capitalize">{key}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Password Strength
                      </span>
                      <span className="text-sm text-gray-400">{calculateStrength()}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateStrength()}%` }}
                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generatePassword}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:from-red-600 hover:to-yellow-600 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Generate Password
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
