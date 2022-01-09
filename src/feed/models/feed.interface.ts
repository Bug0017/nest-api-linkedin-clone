import { User } from "src/auth/models/user.interface";

    export interface Feed {
      id?: string;
      createdAt?: Date;
      updatedAt?: Date;
      body?: string;
      author?: User;
    }