import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { User, LogOut, Edit2 } from 'lucide-react';

const UserMenu = () => {
  const { user, petName, signOut, updatePetName } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newPetName, setNewPetName] = useState(petName || '');

  const handleSignOut = async () => {
    await signOut();
    setShowMenu(false);
  };

  const handleUpdatePetName = async () => {
    if (newPetName.trim()) {
      await updatePetName(newPetName);
      setIsEditing(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <User size={20} />
        <span>{petName || 'User'}</span>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm text-gray-500">Signed in as</p>
            <p className="text-sm font-medium text-gray-800 truncate">{user?.email}</p>
          </div>

          <div className="px-4 py-3 border-b border-gray-200">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={newPetName}
                  onChange={(e) => setNewPetName(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                  placeholder="New pet name"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdatePetName}
                    className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setNewPetName(petName || '');
                    }}
                    className="flex-1 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 w-full"
              >
                <Edit2 size={16} />
                <span>Change pet name</span>
              </button>
            )}
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
