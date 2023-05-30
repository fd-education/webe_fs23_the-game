import React, {FC, useCallback, useEffect, useState} from 'react';
import {Navigate, Route} from 'react-router-dom';
import authInterceptor from '../../../services/api';

type Props = {
    children: React.ReactNode | React.ReactNode[];
};

const ProtectedRoute = (props: Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const validateAuth = useCallback(async () => {
        try {
            await authInterceptor.post('/auth/validate');
            return true;
        } catch (err) {
            return false;
        }
    }, []);

    useEffect(() => {
        validateAuth()
            .then((_) => {
                setIsAuthenticated(true);
            })
            .catch((_) => {
                setIsAuthenticated(false);
            });
    }, []);

    return <>{isAuthenticated ? props.children : null}</>;
};
export default ProtectedRoute;
