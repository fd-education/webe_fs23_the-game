import {FC} from 'react';
import AuthService from '../../services/auth/auth.service';

export const Profile: FC = () => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) return null;

    return <div>LoggedIn</div>;
};
