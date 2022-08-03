import React, {useState} from "react";
import RoundedForm from "../../components/UI/Forms/RoundedForm/RoundedForm";
import GradientBtn from "../../components/UI/Buttons/GradientBtn/GradientBtn";
import RoundedInput from "../../components/UI/Inputs/RoundedInput/RoundedInput";
import {useFormik} from "formik";

const FormikValidationPage = (props:any)=>{
    // const [isFormValid, setIsFormValid] = useState(true)


    const [isLoading, setIsLoading] = useState(false)
    const header="Регистрация"
    const btnText="Регистрация"
    const children = <a onClick={() => console.log("link clicked")}>Есть аккаунт?</a>

    // async function onSubmitHandler(event: React.FormEvent) {
    //     event.preventDefault()
    //     setIsLoading(true);
    //     setTimeout(()=>setIsLoading(false),2000)
    // }

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
    ] as const

    type Item =  (typeof fields[number])['name'];

    type FormValues = {
        // username:string;
        // email: string;
        // birthday: string;
        // password: string;
        // confirmPassword: string;
        [x in Item]: string
    }



    const validate = (values:FormValues) => {
        const errors:Partial<FormValues> = {};

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

        if (!values.password){
            errors.password = 'Введите пароль'
        }else if (values.password.length < 4 || values.password.length >10) {
            errors.password = 'Пароль от 4 до 10 символов';
        }

        if (values.password !== values.confirmPassword){
            errors.confirmPassword = 'Пароли не совпадают';
        }

        if (isNaN(Date.parse(values.birthday))){
            errors.birthday = "Выберите дату"
        }
        const current = new Date();
        current.setFullYear( current.getFullYear() - 18 );
        if (new Date(Date.parse(values.birthday)) > current){
            errors.birthday = "Вам должно быть больше 18 лет"
        }


        return errors;
    }


    const formik = useFormik<FormValues>({
        initialValues: {
            username: '',
            email: '',
            password: '',
            birthday: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: async (values) => {
            setIsLoading(true);
            alert(JSON.stringify(values, null, 2));
            setTimeout(()=>setIsLoading(false),2000)
        },
    });

    return (
        <RoundedForm onSubmit={formik.handleSubmit} header={header} noValidate {...props}>

            {fields.map((field, index) =>
                <RoundedInput key={index} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values[field.name]} errorText={formik.touched[field.name] && formik.errors[field.name] } {...field}></RoundedInput>
            )}

            {children}
            {/*{React.cloneElement(<input value={"sd"}/>, {type: "text", value:"abc"})}*/}

            <GradientBtn disabled={!(formik.isValid && formik.dirty) || isLoading} isLoading={isLoading} type="submit">{btnText}</GradientBtn>

        </RoundedForm>
    );
}

export default FormikValidationPage;