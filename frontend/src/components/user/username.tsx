import React, { useContext } from 'react';
import { UserDataContext } from '../../contexts/user-data-context';

export function Username() {
    const {user} = useContext(UserDataContext);
    return (
        <p>Hallo {user?.username}</p>
    );
}