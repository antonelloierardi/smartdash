export interface Settings {
  _id?:string,
  companyID: string
  userID: string
  settingsHeader: SettingsHeader
  settingsSidebar: SettingsSidebar
  settingsFooter: SettingsFooter
}

export interface SettingsHeader {
  formSearch: boolean
  megaMenu: boolean
  languages: boolean
  notifications: boolean
  messages: boolean
}

export interface SettingsSidebar {
  clienti:boolean,
  vendite: boolean,
  acquisti: boolean,
  organizer: boolean,
  agenda: boolean,
  calendario: boolean,
  marketing: boolean,
  statistiche: boolean,
  messaggi: boolean,
  notifiche: boolean,
}

export interface SettingsFooter {
  serviceMenu: boolean
  helpCenter: boolean
  privacy: boolean
  support: boolean
  terms: boolean
}
