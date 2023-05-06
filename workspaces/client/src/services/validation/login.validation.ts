import * as Yup from 'yup';
import i18n from 'i18next';

export const loginValidationSchema = () => {
    return Yup.object().shape({
        email: Yup.string()
            .email(i18n.t('auth.common.errors.invalidEmail').toString())
            .required(i18n.t('auth.common.errors.requiredEmail').toString()),
        password: Yup.string().required(
            i18n.t('auth.common.errors.requiredPassword').toString()
        )
    });
};
