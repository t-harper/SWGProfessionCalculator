import styled from 'styled-components';

const palette = {
  bodyGradientStart: '#006FE8', // back1
  bodyGradientMid: '#015BA5', // back2
  bodyGradientEnd: '#004EA4', // back3
  containerBackground: '#004EA4', // back3
  containerBorder: '#80FF00', // line1
  innerBackgroundStart: '#015BA5', // back2
  innerBackgroundEnd: '#004EA4', // back3
  scrollbarThumb: '#055CB4', // OverlayDark
  scrollbarTrack: '#003B7A',
  textPrimary: '#D5FBFF', // skillTextDefault
  textAccent: '#80FF00', // header/line colors
  textMuted: '#9BE3FF', // textdefault
  linkHover: '#0E389A', // selectionBack
  activePanelBackground: '#004EA4', // back3
  warningText: '#FF6F0F', // contrast2
  warningBackground: '#010E7E', // gamblingDefault
  resetButton: '#F05A00', // contrast2 / gamblingLights
  resetButtonHover: '#FF6F0F',
  resetButtonText: '#090D33', // titleText
  skillDefault: '#006FE8', // back1
  skillHover: '#0E5CD3', // skillactivated
  skillBorder: '#80FF00', // line1
  skillActive: '#32BE03', // skillAcquiredSelected
  skillActiveBorder: '#80FF00',
  skillTextDefault: '#D5FBFF',
  skillTextActive: '#001653', // textSelected
  skillTextActiveHover: '#CAFD00', // skillAcquiredTextHover
};

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  @media only screen and (max-width: 968px) {
    flex-direction: column;
  }
`;

export const SkillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  height: 100%;
  margin: 0 5px;

  @media only screen and (max-width: 968px) {
    order: 1;
    width: 100%;
    height: auto;
    margin: 0;
  }
`;

export const SideContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media only screen and (max-width: 968px) {
    order: 2;
  }
`;

export const Container = styled.div`
    border: 2px solid ${palette.containerBorder};
    border-radius: 16px;
    background-color: ${palette.containerBackground};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    flex: 1 1 33%;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.45);

    .profileManager {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 6px;

        label {
            font-size: 0.75rem;
            color: ${palette.textAccent};
            text-transform: uppercase;
        }

        .profileControls {
            display: flex;
            gap: 4px;
            align-items: center;

            select {
                flex: 1;
                min-width: 0;
                background: ${palette.innerBackgroundStart};
                border: 2px solid ${palette.containerBorder};
                color: ${palette.textAccent};
                padding: 4px;
                border-radius: 8px;
                font-weight: bold;
                text-transform: capitalize;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                option {
                    background: ${palette.innerBackgroundStart};
                    color: ${palette.textPrimary};
                }
            }

            .iconButton {
                border: 2px solid ${palette.containerBorder};
                border-radius: 8px;
                width: 34px;
                height: 34px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.9rem;
                cursor: pointer;
                background: ${palette.skillDefault};
                color: ${palette.textPrimary};
                flex-shrink: 0;

                &:hover {
                    background: ${palette.linkHover};
                }

                &:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            }
        }
    }

    h2 {
        text-align: center;
        margin-bottom: 8px;
        color: ${palette.textAccent};
        font-size: 1.1rem;
        text-transform: uppercase;
    }
    
    h4 {
        text-align: center;
        margin-bottom: 8px;
        color: ${palette.textAccent};
        font-size: 0.9rem;

        &.switch {
            cursor: pointer;
            color: ${palette.textAccent};
        }
    }
    
    .innerContainer { 
        width: 100%;
        flex: 1;
        border: 1px solid ${palette.containerBorder};
        border-radius: 16px;
        background: linear-gradient(
          180deg,
          ${palette.innerBackgroundStart} 0%,
          ${palette.innerBackgroundEnd} 100%
        );
        flex-direction: column;
        padding: 8px 0;
        overflow: auto;

        .row {
            display: flex;

            p {
                border: 1px solid ${palette.containerBorder};
                border-top: 0px;
                
            }

            p:first-child {
                flex: 7;
            }

            p:last-child {
                flex: 3;
                text-align: right;
            }
        }

        &::-webkit-scrollbar {
            border-radius: 0 16px 16px 0;
            overflow: hidden;
            background-color: ${palette.scrollbarTrack};
        }

        &::-webkit-scrollbar-thumb {
            background-color: ${palette.scrollbarThumb};
            border-radius: 0 16px 16px 0;
        }
    }

    button, p {
        display: block;
        color: ${palette.textPrimary};
        text-decoration: none;
        font-size: 0.8rem;
        padding: 2px 8px;
        margin: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        min-height: 0;
        background: none;
        outline: none;
        border: none;
    }

    button {
        cursor: pointer;
        width: 100%;
        text-align: left;

        &:hover {
            background-color: ${palette.linkHover};
        }
    }

    &.skillTree {
        position: relative;
        min-width: 100%;
        height: 70%;
        background-color: ${palette.activePanelBackground};
        gap: 5px;
        color: ${palette.textPrimary};
        font-weight: bold;

        select { 
            position: absolute;
            left: 5px; 
            background: ${palette.activePanelBackground};
            border: 1px solid ${palette.containerBorder};
            color: ${palette.textAccent};
            font-weight: bold;
            text-transform: capitalize; 

            option {
                background: ${palette.innerBackgroundStart};
                color: ${palette.textPrimary};
            }
        }

        .skillPointWarning {
            color: ${palette.warningText};
            font-size: 1.2rem;
            background-color: ${palette.warningBackground};
            font-weight: bolder;
            padding: 8px;
            margin: 4px;
        }

        .skillPoints { 
            width: 50%;
            display: flex;
            justify-content: space-between;
            padding: 8px;

            button {
                background-color: ${palette.resetButton};
                padding: 4px;
                font-weight: bolder;
                outline: none;
                border: none;
                border-radius: 0 4px 0 4px;
                color: ${palette.resetButtonText};

                &:hover {
                    filter: brightness(1.1);
                }
            }

            
        }

        span {
            font-size: 1rem;
            margin: 0 8px;
            color: ${palette.textAccent};
        }
    }

    .linkContainer { 
        border-radius: 0;
        border: none;
        width: 100%;
        min-height: 25px;
        display: flex;
        flex: 1;
        flex-direction: row;
        justify-content: space-evenly;
        
        p {
            cursor: pointer;
            white-space: nowrap;
            color: ${palette.textMuted};
            
            &:hover {
                background-color: ${palette.linkHover};
            }
        }
    }

    .skillBranches { 
        width: 100%;
        height: 100%;
        display: flex;
    }

    .skillBranch { 
        display: flex;
        flex: 1;
        flex-direction: column-reverse;
        align-items: flex-end;
        margin: 0 2px;

        .linkContainer {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            margin-bottom: 8px;
            order: 1;
        }
    }

    &.activeSkillModifiers  { 
        position: relative;
        height: 30%;
        width: 50%;
        overflow:hidden;

        h2 {
            width: 100%;
            text-align: left;
        }

        > p {
            white-space: normal;
        }
    }

    &.activeSkillCommands { 
        position: relative;
        height: 30%;
        width: 50%;
        overflow:hidden;

        h2 {
            width: 100%;
            text-align: right;
        }

        p {
            text-align: left !important;
        }
    }
    @media only screen and (max-width: 968px) {

        padding: 2px;
        margin: 0px;

        &.skillTree {
            height: auto;
        }

        .linkContainer {
            min-height: auto;
        }

        .skillBranch { 
            width: 25%;
        }

        a, p {
            font-size: 0.6rem;
        }

        h2 {
            font-size: 0.8rem;
            white-space: nowrap;
        }
        
        &.activeSkillCommands, &.activeSkillModifiers {
            height: auto;
        }
    }
`;

export const SkillBoxContainer = styled.div`
  width: clamp(100px, 100%, 300px);
  height: 50px;
  min-height: 50px;
  padding: 4px;
  margin: 1px 0;
  border-radius: 0 8px 0 8px;
  border: 2px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? palette.skillActive : palette.skillDefault)};
  border-color: ${(props) => (props.active ? palette.skillActiveBorder : palette.skillBorder)};
  cursor: pointer;
  overflow: hidden;

  &:hover {
    background-color: ${(props) => (props.active ? palette.skillActiveBorder : palette.skillHover)};
    border-color: ${(props) => (props.active ? palette.skillActiveBorder : palette.skillBorder)};

    p {
      color: ${(props) =>
        props.active ? palette.skillTextActiveHover : palette.textAccent};
    }
  }

  p {
    border: none;
    text-align: center;
    border: none;
    white-space: normal;
    font-weight: bold;
    line-height: 1rem;
    color: ${(props) =>
      props.active ? palette.skillTextActive : palette.skillTextDefault};
  }

  @media only screen and (max-width: 968px) {
    width: 100%;
    padding: 1px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: ${palette.containerBackground};
  border: 2px solid ${palette.containerBorder};
  border-radius: 12px;
  padding: 20px;
  width: min(90vw, 360px);
  color: ${palette.textPrimary};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);

  h3 {
    margin-bottom: 12px;
    text-align: center;
    color: ${palette.textAccent};
    text-transform: uppercase;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    label {
      font-size: 0.8rem;
      color: ${palette.textAccent};
    }

    input {
      padding: 6px;
      border-radius: 8px;
      border: 2px solid ${palette.containerBorder};
      background: ${palette.innerBackgroundStart};
      color: ${palette.textPrimary};
      font-size: 1rem;
    }

    .modalActions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;

      button {
        border: 2px solid ${palette.containerBorder};
        border-radius: 8px;
        padding: 4px 10px;
        cursor: pointer;
        color: ${palette.resetButtonText};
        background: ${palette.resetButton};
        font-weight: bold;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &:hover:not(:disabled) {
          background: ${palette.resetButtonHover};
        }

        &:first-child {
          background: ${palette.innerBackgroundStart};
          color: ${palette.textPrimary};
        }
      }
    }
  }
`;
