import {AppRootStateType} from "../store/store";

export const errorSelector = (state: AppRootStateType) => state.app.error
export const isOpenMenuSelector = (state: AppRootStateType) => state.app.isOpenMenu
export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized
export const modeSelector = (state: AppRootStateType) => state.app.mode