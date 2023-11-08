import { Agenda } from "./agenda.model";
import { City } from "./city.model";
import { Client } from "./client.model";
import { Company } from "./company.model";
import { Log } from "./log.model";
import { Settings } from "./settings.model";
import { Sidebar, SidebarMenu } from "./sidebar.model";
import { User } from "./user.model";

export interface AuthResponse {
  token: string;
  user: User;
}
export interface UserResponse {
  message: string;
  user: User;
}
export interface UsersResponse {
  token: string;
  data: User[];
}

export interface AgendaResponse {
  data: Agenda[];
  message: string;
}

export interface SidebarResponse {
  data: SidebarMenu[];
  message: string;
}

export interface SettingsResponse {
  data: Settings[];
  message: string;
}

export interface LogResponse {
  data: Log[];
  message: string;
}

export interface ClientResponse {
  data: Client[];
  message: string;
}

export interface CitiesResponse {
  data: City[];
  message: string;
}

export interface CompaniesResponse {
  data: Company;
  message: string;
}
