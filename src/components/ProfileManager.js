import React from 'react';

function ProfileManager({
  profiles,
  activeProfile,
  isDefaultProfile,
  handleProfileSelection,
  handleSaveProfile,
  handleDeleteProfile,
}) {
  const profileNames = Object.keys(profiles);

  return (
    <div className="profileManager">
      <label htmlFor="profile-select">Profiles</label>
      <div className="profileControls">
        <select
          id="profile-select"
          value={activeProfile}
          title={activeProfile}
          onChange={(e) => handleProfileSelection(e.target.value)}
        >
          {profileNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="iconButton"
          aria-label="Save profile"
          title="Save profile"
          onClick={handleSaveProfile}
        >
          💾
        </button>
        <button
          type="button"
          className="iconButton"
          aria-label="Delete profile"
          title={
            isDefaultProfile
              ? 'Default profile cannot be deleted'
              : 'Delete profile'
          }
          onClick={handleDeleteProfile}
          disabled={isDefaultProfile}
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default ProfileManager;
