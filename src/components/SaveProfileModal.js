import React, { useEffect, useState } from 'react';
import { ModalOverlay, ModalContent } from '../styled-components';

function SaveProfileModal({ isOpen, onClose, onSave }) {
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProfileName('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!profileName.trim()) {
      return;
    }
    onSave(profileName);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Save Profile</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="profile-name">Profile Name</label>
          <input
            id="profile-name"
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="Enter profile name"
            autoFocus
          />
          <div className="modalActions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={!profileName.trim()}>
              Save
            </button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default SaveProfileModal;
