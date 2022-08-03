import React, {useState} from "react";
import RoundedForm from "../../components/UI/Forms/RoundedForm/RoundedForm";
import GradientBtn from "../../components/UI/Buttons/GradientBtn/GradientBtn";
import RoundedInput from "../../components/UI/Inputs/RoundedInput/RoundedInput";
import {useForm, SubmitHandler, RegisterOptions} from "react-hook-form";
const ReactHookFormValidationPage = (props:any)=>{
    // const [isFormValid, setIsFormValid] = useState(true)


    const [isLoading, setIsLoading] = useState(false)
    const header="Регистрация"
    const btnText="Регистрация"
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
        username:string;
        email: string;
        birthday: string;
        password: string;
        confirmPassword: string;
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


    const registerOptions:{[x in keyof FormValues]?:RegisterOptions} = {
        "username": {required: 'Login обязателен', validate: {range: value=>value.length>3 && value.length<15 || "Длина логина от 3 до 15 символов"}},
        "email": {required:'Email обязателен', pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Недопустимый email"}},
        "password": {required:'Введите пароль',validate: {range: async (value)=>{ return value.length > 2 && value.length < 10 || "Длина пароля от 3 до 10 символов"}}},
        "confirmPassword": {
            required: 'Повторите пароль',
            validate: (val: string) => {
                if (watch('password') != val) {
                    return "Пароли не совпадают";
                }
            }},
        "birthday": {required: "Выберите дату", validate: (val: string)=>{
                const current = new Date();
                current.setFullYear( current.getFullYear() - 18 );
                if (new Date(Date.parse(val)) > current){
                    return "Вам должно быть больше 18 лет"
                }
            }}
    }

    const { register, handleSubmit, watch, formState: { errors, touchedFields, isValid, isDirty }, trigger } = useForm<FormValues>({mode:"onTouched"});
    // type a = RegisterOptions;
    const onSubmit: SubmitHandler<FormValues> = data => {
        setIsLoading(true);
        alert(JSON.stringify(data, null, 2));
        setTimeout(()=>setIsLoading(false),2000)
    };

    // const formik = useFormik<FormValues>({
    {/*    initialValues: {*/}
    {/*        username: '',*/}
    //         email: '',
    //         password: '',
    //         birthday: '',
    //         confirmPassword: ''
    //     },
    //     validate,
    //     onSubmit: async (values) => {
    //         setIsLoading(true);
    //         alert(JSON.stringify(values, null, 2));
    //         setTimeout(()=>setIsLoading(false),2000)
    //     },
    // });

    console.log(errors)
    console.log(touchedFields)

    return (
        <RoundedForm onSubmit={handleSubmit(onSubmit)} header={header} {...props}>

            {fields.map((field, index) =>
                <RoundedInput key={index}  errorText={(touchedFields as any)[field.name] && (errors as any)[field.name]?.message }  {...field} {...register(field.name as any, (registerOptions as any)[field.name as any])}></RoundedInput>
            )}

            {children}
            {/*{React.cloneElement(<input value={"sd"}/>, {type: "text", value:"abc"})}*/}

            <GradientBtn disabled={!(isValid && isDirty) || isLoading} isLoading={isLoading} type="submit">{btnText}</GradientBtn>

        </RoundedForm>
    );
}

export default ReactHookFormValidationPage;