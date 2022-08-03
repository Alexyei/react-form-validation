import {useEffect, useMemo, useState} from "react";
//:<FormValues extends {[x:string]:any}>(initialValues:FormValues,validate:(values:FormValues)=>{[x in keyof FormValues]:string} , onSubmit:(values:FormValues)=>any)=>void
const useForm = <FormValues extends {[x:string]:any}>(initialValues:FormValues, validate:(values:FormValues)=>Partial<{[x in keyof FormValues]:string}>, onSubmit:(values:FormValues, e:React.FormEvent)=>any)=>{
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState(Object.keys(initialValues).reduce<Partial<{[x in keyof typeof initialValues]:boolean}>>((sum, val:keyof typeof initialValues)=>{sum[val]=false; return sum},{}));
    const [errors, setErrors] = useState(validate(values))

    useEffect(()=>{
        setErrors(validate(values))
    },[values, touched])

    const isValid = useMemo( ()=>Object.keys(errors).length === 0,[errors])
    const isDirty = useMemo( ()=>Object.values(touched).some(val=>val),[touched])

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if (isValid)
            onSubmit(values, e)
    };

    const handleChange = (e:any) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleBlur = (e:any) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    return {
        handleChange,
        handleBlur,
        handleSubmit,
        isDirty,
        isValid,
        values,
        touched,
        errors
    }
}

export default useForm;