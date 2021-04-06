import {createContext} from 'react';

export type User = {
    username: string;
    email: string;
    firstname: string;
    surname: string;
    roles: string[];
    token: string;
};

type Config = {
    user?: User
};

const UserDataContext = createContext<Config>({});

export { UserDataContext };