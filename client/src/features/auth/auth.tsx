import React from 'react'
import { useCurrentQuery } from '../../app/services/auth';

const Auth = ({ children }: { children: JSX.Element }) => {
    const { isLoading } = useCurrentQuery();
    return !isLoading ? children : <span>Loading...</span>
}

export default Auth;