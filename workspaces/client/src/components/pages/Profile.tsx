import {FC} from 'react';
import AuthService from '../../services/auth/auth.service';

export const Profile: FC = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div>
            <header>
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong>{' '}
                {currentUser.accessToken.substring(0, 20)} ...{' '}
                {currentUser.accessToken.substring(
                    currentUser.accessToken.length - 20
                )}
            </p>
            <p>
                <strong>Uid:</strong> {currentUser.uid}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
        </div>
    );
};
