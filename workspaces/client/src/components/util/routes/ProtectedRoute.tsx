import React, {useCallback, useLayoutEffect, useState} from 'react';
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

    useLayoutEffect(() => {
        validateAuth()
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    }, []);

    return <>{isAuthenticated ? props.children : null}</>;
};
export default ProtectedRoute;
