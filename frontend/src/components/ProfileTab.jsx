import React, { useState, useEffect } from 'react';
import { User, Mail, ShieldCheck, Edit, Save, X, Plus, Trash2 } from 'lucide-react';

// --- Profile Tab Component ---
// An interactive component for viewing and updating user details and contacts.
const ProfileTab = ({ onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null); // Initialize as null
  const [contacts, setContacts] = useState([]);
  const [status, setStatus] = useState({ loading: false, error: null, success: null });
  const [initialLoading, setInitialLoading] = useState(true);

  // Effect to fetch the user's profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      const API_URL = import.meta.env.VITE_API_URL || '';
      try {
        const res = await fetch(`${API_URL}/api/profile/me`);
        if (!res.ok) throw new Error('Could not fetch profile.');
        const data = await res.json();
        setFormData({
          name: data.name || '',
          email: data.email || '',
        });
        setContacts(data.emergencyContacts || []);
      } catch (error) {
        setStatus({ loading: false, error: error.message, success: null });
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array means this runs once on mount

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactChange = (index, e) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][e.target.name] = e.target.value;
    setContacts(updatedContacts);
  };
  
  const addContactField = () => {
    setContacts([...contacts, { name: '', email: '' }]);
  };

  const removeContactField = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  const handleUpdateProfile = async () => {
    setStatus({ loading: true, error: null, success: null });
    const API_URL = import.meta.env.VITE_API_URL || '';
    try {
        await fetch(`${API_URL}/api/profile/me`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        await fetch(`${API_URL}/api/profile/contacts`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emergencyContacts: contacts }),
        });
        
        // No need to manage localStorage here anymore, App.jsx handles it.
        setStatus({ loading: false, success: 'Profile updated successfully!', error: null });
        setIsEditing(false);
    } catch (err) {
        setStatus({ loading: false, error: 'Failed to update profile.', success: null });
    }
  };

  if (initialLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
      </div>
    );
  }


  return (
    <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Profile</h1>
            <button onClick={() => setIsEditing(!isEditing)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {isEditing ? <X className="text-red-500" /> : <Edit className="text-blue-600" />}
            </button>
        </div>
      
      {/* User Details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 space-y-4">
        <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
            {isEditing ? (
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-gray-700 border rounded-md" />
            ) : (
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{formData.name}</p>
            )}
        </div>
        <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
             {isEditing ? (
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full mt-1 p-2 bg-gray-50 dark:bg-gray-700 border rounded-md" />
            ) : (
                <p className="text-lg text-gray-600 dark:text-gray-300">{formData.email}</p>
            )}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Emergency Contacts</h2>
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center space-x-2">
                {isEditing ? (
                    <>
                        <input type="text" name="name" placeholder="Contact Name" value={contact.name} onChange={e => handleContactChange(index, e)} className="w-1/2 p-2 bg-gray-50 dark:bg-gray-700 border rounded-md" />
                        <input type="email" name="email" placeholder="Contact Email" value={contact.email} onChange={e => handleContactChange(index, e)} className="w-1/2 p-2 bg-gray-50 dark:bg-gray-700 border rounded-md" />
                        <button onClick={() => removeContactField(index)}><Trash2 className="text-red-500" size={20}/></button>
                    </>
                ) : (
                    <div className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <p className="font-semibold text-gray-700 dark:text-gray-200">{contact.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{contact.email}</p>
                    </div>
                )}
            </div>
          ))}
          {isEditing && (
              <button onClick={addContactField} className="w-full flex items-center justify-center py-2 border-2 border-dashed rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Plus size={20} className="mr-2" /> Add Contact
              </button>
          )}
        </div>
      </div>
      
      {isEditing && (
          <div className="mt-6">
              <button onClick={handleUpdateProfile} disabled={status.loading} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-400">
                  {status.loading ? 'Saving...' : 'Save Changes'}
              </button>
          </div>
      )}

      {status.success && <p className="text-green-600 mt-4 text-center">{status.success}</p>}
      {status.error && <p className="text-red-600 mt-4 text-center">{status.error}</p>}

      {/* Logout Button */}
      <div className="mt-8">
        <button onClick={onLogout} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;

