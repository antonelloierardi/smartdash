import { Client } from "./client.model";

export interface Message {
  _id: string,
  client: Client,
  text: string,
  date: Date
}
