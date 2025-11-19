import React, { useEffect, useMemo, useState } from 'react';

import { MainContainer, SkillContainer, SideContainer } from './styled-components';
import Professions from './components/Professions'
import Experience from './components/Experience'
import SkillModifiers from './components/SkillModifiers'
import Commands from './components/Commands'
import Certifications from './components/Certifications'
import Titles from './components/Titles';
import SkillTree from './components/SkillTree'
import ActiveSkillModifiers from './components/ActiveSkillModifiers'
import ActiveCommandsAndCertifications from './components/ActiveCommandsAndCertifications'
import SaveProfileModal from './components/SaveProfileModal';
import { SKILLS, ALL_SPECIES } from './CONSTANTS'

const DEFAULT_PROFILE_NAME = 'Default Profile';
const STORAGE_KEY = 'swgProfiles';

const ensureDefaultProfile = (profileMap = {}) => {
  if (Object.prototype.hasOwnProperty.call(profileMap, DEFAULT_PROFILE_NAME)) {
    return { ...profileMap };
  }
  return {
    [DEFAULT_PROFILE_NAME]: [],
    ...profileMap,
  };
};

const areSkillListsEqual = (listA = [], listB = []) => {
  if (listA.length !== listB.length) return false;
  for (let i = 0; i < listA.length; i++) {
    if (listA[i] !== listB[i]) return false;
  }
  return true;
};

const getInitialProfiles = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && stored.profiles && Object.keys(stored.profiles).length > 0) {
      const sanitizedProfiles = ensureDefaultProfile(stored.profiles);
      const validActive =
        stored.activeProfile && sanitizedProfiles[stored.activeProfile]
          ? stored.activeProfile
          : DEFAULT_PROFILE_NAME;
      return {
        profiles: sanitizedProfiles,
        activeProfile: validActive,
      };
    }
  } catch (error) {
    console.error('Failed to parse stored profiles', error);
  }

  let legacySkills = [];
  try {
    const legacy = JSON.parse(localStorage.getItem('playerSkills'));
    if (Array.isArray(legacy)) {
      legacySkills = legacy;
    }
  } catch (error) {
    console.error('Failed to parse legacy skills', error);
  }

  return {
    profiles: ensureDefaultProfile({
      [DEFAULT_PROFILE_NAME]: legacySkills,
    }),
    activeProfile: DEFAULT_PROFILE_NAME,
  };
};

function App() {

  const initialProfileState = useMemo(() => getInitialProfiles(), []);
  const [profiles, setProfiles] = useState(initialProfileState.profiles);
  const [activeProfile, setActiveProfile] = useState(initialProfileState.activeProfile);
  const [playerSkills, setPlayerSkills] = useState(
    initialProfileState.profiles[initialProfileState.activeProfile] || []
  );
  const [skillPointWarning, setSkillPointWarning] = useState(false)
  const [activeSkill, setActiveSkill] = useState('combat_brawler_novice');
  const [activeProfession, setActiveProfession] = useState('combat_brawler')
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSkillPointWarning(false)
    }, 2500)
  }, [skillPointWarning])

  useEffect(() => {
    if (!activeProfile || activeProfile === DEFAULT_PROFILE_NAME) return;
    setProfiles((prev) => {
      const currentSkills = prev[activeProfile] || [];
      if (areSkillListsEqual(currentSkills, playerSkills)) return prev;
      return {
        ...prev,
        [activeProfile]: [...playerSkills],
      };
    });
  }, [playerSkills, activeProfile]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        profiles,
        activeProfile,
      })
    );
  }, [profiles, activeProfile]);

  const handleProfessionChange = (newProf) => {
    setActiveProfession(() => newProf)
  }

  const handleActiveSkillChange = (skill) => {
    setActiveSkill(() => skill)
  }

  const getSkillPoint = (skill) => {
    return SKILLS[skill].skillPoints
  }

  const hasSkillPoints = (sp) => {
    const MAX_SKILL_POINTS = 250;
    const playerSkillPointsUsed = playerSkills.reduce((acc, item) => getSkillPoint(item) + acc, 0)
    return (MAX_SKILL_POINTS - playerSkillPointsUsed - sp) > -1
  }

  const getPreReqs = (skill) => {
    return SKILLS[skill].preReqs
  }

  const handleSkillChange = ({action, data}) => {
    if (action === 'add') {
      addSkillsToPlayer(data)
    } else if (action === 'reset') {
      setActiveProfile(DEFAULT_PROFILE_NAME);
      setPlayerSkills(() => [...(profiles[DEFAULT_PROFILE_NAME] || [])])
    } else {
      removeSkillsFromPlayer(data)
    }
  }

  const addSkillsToPlayer = (skill) => {
    let skillsToAdd = [skill];
    for (let i = 0; i < skillsToAdd.length; i++) {
      if (skillsToAdd[i] === "") {
        i++
      } else {
        const preReqs = getPreReqs(skillsToAdd[i])
        skillsToAdd = [...skillsToAdd, ...preReqs]
        if (skillsToAdd[skillsToAdd.length - 1] === '') {
          i++
        }
      }
    }

    const filteredSkills = [...new Set(skillsToAdd.filter(item => {
      return playerSkills.indexOf(item) < 0
    }).filter(item => item !== ''))]

    const newSkillSkillPoints = filteredSkills.reduce((acc, item) => getSkillPoint(item) + acc, 0)

    if (hasSkillPoints(newSkillSkillPoints)) {
      const currentSkills = playerSkills
      const newSkills = [...currentSkills, ...filteredSkills]

      setPlayerSkills(() => newSkills)
    } else {
      setSkillPointWarning(() => true)
    }
  }
  const removeSkillsFromPlayer = (skill) => {

    const activeSkills = playerSkills
       let removeSkills = [skill]
       for (let i = 0; i < removeSkills.length; i++) {
         for (let j = 0; j < activeSkills.length; j++) {
          const skill = activeSkills[j]
          const preReqs = getPreReqs(activeSkills[j]);
          const removeSkill = removeSkills[i]
          const match = preReqs.includes(removeSkill)
          if (match) removeSkills.push(skill)
         }
       }
       const newSkills = activeSkills.filter((skill) => {
         return !removeSkills.includes(skill)
       })
      setPlayerSkills(() => newSkills)
  }

  const handleSpeciesChange = (species) => {
    const activeSkills = playerSkills
    const newSkills = activeSkills.filter((item) => {
      return !ALL_SPECIES.includes(item)
    })
    newSkills.push(species);
    setPlayerSkills(() => newSkills);
  }

  const handleProfileSelection = (profileName) => {
    const fallback = profiles[profileName]
      ? profileName
      : DEFAULT_PROFILE_NAME;
    setActiveProfile(fallback);
    setPlayerSkills(() => [...(profiles[fallback] || [])]);
  };

  const handleProfileDelete = () => {
    if (activeProfile === DEFAULT_PROFILE_NAME) {
      window.alert('The default profile cannot be deleted.');
      return;
    }
    const profileNames = Object.keys(profiles);
    if (profileNames.length === 1) {
      window.alert('You must keep at least one profile.');
      return;
    }
    const confirmed = window.confirm(`Delete profile "${activeProfile}"?`);
    if (!confirmed) return;
    const updatedProfiles = { ...profiles };
    delete updatedProfiles[activeProfile];
    const remainingNames = Object.keys(updatedProfiles);
    const nextProfile = remainingNames[0] || DEFAULT_PROFILE_NAME;
    setProfiles(updatedProfiles);
    setActiveProfile(nextProfile);
    setPlayerSkills(() => [...(updatedProfiles[nextProfile] || [])]);
  };

  const handleProfileSave = () => {
    if (activeProfile === DEFAULT_PROFILE_NAME) {
      setIsSaveModalOpen(true);
      return;
    }
    setProfiles((prev) => ({
      ...prev,
      [activeProfile]: [...playerSkills],
    }));
  };

  const handleCloseSaveModal = () => {
    setIsSaveModalOpen(false);
  };

  const handleSaveProfile = (profileName) => {
    const trimmed = profileName.trim();
    if (!trimmed) return;
    if (trimmed === DEFAULT_PROFILE_NAME) {
      window.alert('Please choose a different name. The default profile cannot be overwritten.');
      return;
    }
    const exists = profiles[trimmed];
    if (exists && trimmed !== activeProfile) {
      const overwrite = window.confirm(
        `Profile "${trimmed}" already exists. Overwrite it?`
      );
      if (!overwrite) return;
    }
    setProfiles((prev) => ({
      ...prev,
      [trimmed]: [...playerSkills],
    }));
    setActiveProfile(trimmed);
    setIsSaveModalOpen(false);
  };

  return (
    <>
      <MainContainer>
        <SideContainer>
          <Professions 
            playerSkills={playerSkills}
            handleProfessionChange={handleProfessionChange}
            profiles={profiles}
            activeProfile={activeProfile}
            defaultProfileName={DEFAULT_PROFILE_NAME}
            handleProfileSelection={handleProfileSelection}
            handleSaveProfile={handleProfileSave}
            handleDeleteProfile={handleProfileDelete}
          />
          <Experience 
            playerSkills={playerSkills}/>
          <SkillModifiers 
            playerSkills={playerSkills}/>
        </SideContainer>
        <SkillContainer>
          <SkillTree 
            handleSpeciesChange={handleSpeciesChange}
            skillPointWarning={skillPointWarning}
            playerSkills={playerSkills}
            activeProfession={activeProfession}
            handleProfessionChange={handleProfessionChange}
            handleActiveSkillChange={handleActiveSkillChange}
            handleSkillChange={handleSkillChange}
          />
          <ActiveSkillModifiers activeSkill={activeSkill}/>
          <ActiveCommandsAndCertifications activeSkill={activeSkill}/> 
        </SkillContainer>
        <SideContainer>
          <Commands 
            playerSkills={playerSkills}/>
          <Certifications 
            playerSkills={playerSkills} />
          <Titles
            playerSkills={playerSkills} />
        </SideContainer>
      </MainContainer>
      <SaveProfileModal 
        isOpen={isSaveModalOpen}
        onClose={handleCloseSaveModal}
        onSave={handleSaveProfile}
      />
    </>
  );
}

export default App;
