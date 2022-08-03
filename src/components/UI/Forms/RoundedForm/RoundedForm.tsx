import React from 'react';
import classes from './RoundedForm.module.scss'

interface SimpleFormProps{
    children: React.ReactNode,
    header: React.ReactNode
    [x:string]:any
}

const RoundedForm = ({children, header, ...props}:SimpleFormProps) => {
    return (
        <form className={classes.form} {...props}>
            <h2 className={classes.header}>{header}</h2>
            {children}
        </form>
    );
};

export default RoundedForm;