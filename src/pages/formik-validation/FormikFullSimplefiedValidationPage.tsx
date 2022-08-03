import React, {useState} from "react";
import GradientBtn from "../../components/UI/Buttons/GradientBtn/GradientBtn";
import RoundedInput from "../../components/UI/Inputs/RoundedInput/RoundedInput";
import { Formik, Form, Field} from "formik";
import UniversalRoundedForm from "../../components/UI/Forms/UniversalRoundedForm/UniversalRoundedForm";
import UniversalRoundedInput from "../../components/UI/Inputs/UniversalRoundedInput/UniversalRoundedInput";

const FormikFullSimplifiedValidationPage = (props: any) => {


    const [isLoading, setIsLoading] = useState(false)
    const header = "Регистрация"
    const btnText = "Регистрация"
    const children = <a onClick={() => console.log("link clicked")}>Есть аккаунт?</a>



    const fields = [
        {
            placeholder: 'Введите логин',
            type: 'text',
            name: 'username',
            // errorText: '',
        },
        {
            placeholder: 'Введите email',
            type: 'email',
            name: 'email',
        },
        {
            placeholder: 'Введите ваш день рождения',
            type: 'date',
            name: 'birthday',
        },
        {
            placeholder: 'Введите пароль',
            type: 'password',
            name: 'password'
        },
        {
            placeholder: 'Подтвердите пароль',
            type: 'password',
            name: 'confirmPassword'
        },
    ]


    interface FormValues {
        username: string;
        email: string;
        birthday: string;
        password: string;
        confirmPassword: string;
    }

    const initialValues: FormValues = {
        username: '',
        email: '',
        password: '',
        birthday: '',
        confirmPassword: ''
    }

    const validate = (values: FormValues) => {
        const errors: Partial<FormValues> = {};

        if (!values.username) {
            errors.username = 'Логин обязателен';
        } else if (values.username.length > 15 || values.username.length < 3) {
            errors.username = 'Для логина от 3 до 15 символов';
        }


        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Введите пароль'
        } else if (values.password.length < 4 || values.password.length > 10) {
            errors.password = 'Пароль от 4 до 10 символов';
        }

        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Пароли не совпадают';
        }

        if (isNaN(Date.parse(values.birthday))) {
            errors.birthday = "Выберите дату"
        }
        const current = new Date();
        current.setFullYear(current.getFullYear() - 18);
        if (new Date(Date.parse(values.birthday)) > current) {
            errors.birthday = "Вам должно быть больше 18 лет"
        }


        return errors;
    }

    async function onSubmit(values: FormValues) {
        setIsLoading(true);
        alert(JSON.stringify(values, null, 2));
        setTimeout(() => setIsLoading(false), 2000)
    }



    return (
        <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
            {formik => (
                <UniversalRoundedForm formElement={<Form/>}  header={header} {...props}>

                    {fields.map((field, index) =>
                        <UniversalRoundedInput inputElement={<Field/>} key={index}
                                      errorText={(formik.touched as any)[field.name] && (formik.errors as any)[field.name]} {...field}></UniversalRoundedInput>
                    )}

                    {children}

                    <GradientBtn disabled={!(formik.isValid && formik.dirty) || isLoading} isLoading={isLoading}
                                 type="submit">{btnText}</GradientBtn>

                </UniversalRoundedForm>
            )
            }
        </Formik>
    );
}

export default FormikFullSimplifiedValidationPage;