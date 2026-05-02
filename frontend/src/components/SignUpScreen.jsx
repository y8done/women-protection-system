import React, { useState } from 'react';
import AppLogo from './AppLogo';

// --- Sign Up Screen Component ---
// A form for new users to register, including emergency contacts.
const SignUpScreen = ({ onSignUpSuccess, onShowLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState([{ name: '', email: '' }]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handles changes in the emergency contact input fields
  const handleContactChange = (index, event) => {
    const values = [...emergencyContacts];
    values[index][event.target.name] = event.target.value;
    setEmergencyContacts(values);
  };

  // Adds a new blank field for another emergency contact
  const addContactField = () => {
    setEmergencyContacts([...emergencyContacts, { name: '', email: '' }]);
  };

  // Removes an emergency contact field
  const removeContactField = (index) => {
    const values = [...emergencyContacts];
    values.splice(index, 1);
    setEmergencyContacts(values);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation for emergency contacts
    const validContacts = emergencyContacts.filter(c => c.name && c.email);
    if (validContacts.length === 0) {
      setError("Please add at least one valid emergency contact.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, emergencyContacts: validContacts }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }
      
      onSignUpSuccess(data); // Pass user data up to App.jsx to set login state

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <AppLogo className="w-16 h-16 mb-4 text-blue-600 dark:text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Join us to stay safe and protected.</p>
        </div>

        {error && <p className="text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg text-center mb-4">{error}</p>}

        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Main User Fields */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          
          <hr className="border-gray-300 dark:border-gray-600" />

          {/* Emergency Contacts Section */}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Emergency Contacts</h3>
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="space-y-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg relative">
              <input type="text" name="name" placeholder="Contact Name" value={contact.name} onChange={e => handleContactChange(index, e)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" />
              <input type="email" name="email" placeholder="Contact Email" value={contact.email} onChange={e => handleContactChange(index, e)} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" />
              {emergencyContacts.length > 1 && (
                 <button type="button" onClick={() => removeContactField(index)} className="absolute -top-1 -right-1 text-red-500 bg-white dark:bg-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold text-lg">&times;</button>
              )}
            </div>
          ))}
           <button type="button" onClick={addContactField} className="w-full py-2 text-sm text-blue-600 hover:text-blue-500 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">Add Another Contact</button>

          <button type="submit" disabled={isLoading} className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md disabled:bg-blue-400">
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          Already have an account?{' '}
          <button onClick={onShowLogin} className="font-medium text-blue-600 hover:text-blue-500">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpScreen;

