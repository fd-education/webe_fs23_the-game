import * as Yup from 'yup';
import i18n from 'i18next';
export const profileValidation = () => {
    const passwordInvalid = i18n
        .t('auth.common.errors.invalidPassword')
        .toString();
    const usernameInvalid = i18n
        .t('auth.common.errors.invalidUsername')
        .toString();

    return Yup.object().shape({
        firstname: Yup.string().required(
            i18n.t('auth.common.errors.requiredFirstname').toString()
        ),
        lastname: Yup.string().required(
            i18n.t('auth.common.errors.requiredLastname').toString()
        ),
        username: Yup.string()
            .min(5, usernameInvalid)
            .max(30, usernameInvalid)
            .required(i18n.t('auth.common.errors.requiredUsername').toString()),
        email: Yup.string()
            .email(i18n.t('auth.common.errors.invalidEmail').toString())
            .required(i18n.t('auth.common.errors.requiredEmail').toString()),
        password: Yup.string()
            .min(8, passwordInvalid)
            .matches(/[0-9]/, passwordInvalid)
            .matches(/[a-z]/, passwordInvalid)
            .matches(/[A-Z]/, passwordInvalid)
            .matches(/\W/, passwordInvalid),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref('password')],
            i18n.t('auth.common.errors.invalidConfirmPassword').toString()
        )
    });
};
