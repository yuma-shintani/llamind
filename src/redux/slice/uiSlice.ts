import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UIState {
  writing: boolean;
  sidebarOpen: boolean;
  isFullscreen: boolean;
  settingOpen: boolean;
  ollamaManagementOpen: boolean;
  selectedModel: string | null;
  renamingChatId: string | null;
}

const initialState: UIState = {
  writing: false,
  sidebarOpen: true,
  isFullscreen: false,
  settingOpen: false,
  ollamaManagementOpen: false,
  selectedModel: null,
  renamingChatId: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    startEditing: (state) => {
      state.writing = true;
    },
    stopEditing: (state) => {
      state.writing = false;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    enterFullscreen: (state) => {
      state.isFullscreen = true;
    },
    leaveFullscreen: (state) => {
      state.isFullscreen = false;
    },
    showSetting: (state) => {
      state.settingOpen = true;
    },
    hideSetting: (state) => {
      state.settingOpen = false;
    },
    showOllamaManagement: (state) => {
      state.ollamaManagementOpen = true;
    },
    hideOllamaManagement: (state) => {
      state.ollamaManagementOpen = false;
    },

    startRenaming: (state, action: PayloadAction<string>) => {
      state.renamingChatId = action.payload;
    },

    stopRenaming: (state) => {
      state.renamingChatId = null;
    },

    selectModel: (state, action: PayloadAction<string>) => {
      state.selectedModel = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startEditing,
  stopEditing,
  toggleSidebar,
  enterFullscreen,
  leaveFullscreen,
  showSetting,
  hideSetting,
  showOllamaManagement,
  hideOllamaManagement,
  selectModel,
  startRenaming,
  stopRenaming,
} = uiSlice.actions;

export default uiSlice.reducer;
