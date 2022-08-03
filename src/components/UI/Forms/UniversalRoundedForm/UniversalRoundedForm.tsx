import React, {FC} from 'react';
import classes from './UniversalRoundedForm.module.scss'

interface SimpleFormProps{
    formElement?: React.ReactElement
    children: React.ReactNode,
    header: React.ReactNode
    [x:string]:any
}

const UniversalRoundedForm:FC<SimpleFormProps> = ({children, header, formElement=<form/>, ...props}:SimpleFormProps) => {
    const innerHTML = (
        <>
            <h2 className={classes.header}>{header}</h2>
            {children}
        </>
    )
    return React.cloneElement(formElement, {className: classes.form, ...props, children: innerHTML});
};

export default UniversalRoundedForm;