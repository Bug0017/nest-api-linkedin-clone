import { Feed } from "src/feed/models/feed.interface";
import { Role } from "./role.enum";

export interface User {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role?: Role
  feeds?: Feed[]
}