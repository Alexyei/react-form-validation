import React from 'react';
import classes from "./UniversalRoundedInput.module.scss";
import getSVG from "./UniversalRoundedInputSVGs";

interface RoundedInputProps {
    // ref: React.RefObject<HTMLInputElement>,
    inputElement?:React.ReactElement
    placeholder: string,
    name: string,
    errorText: string,
    [x:string]: any;
}
const UniversalRoundedInput = React.forwardRef<Exclude<RoundedInputProps["inputElement"],undefined>, RoundedInputProps>(({ref, placeholder, name, errorText, inputElement=<input/>, ...props}:RoundedInputProps) => {

    const input = React.cloneElement(inputElement,{ref,placeholder,name,...props})

    return (
        <div className={`${classes.formGroup} ${errorText ? classes.error : ''}`}>
            {getSVG(name)}
            {/*<input ref={ref} {...props} placeholder={placeholder} name={name}/>*/}
            {input}
            <div className={classes.errorText} style={{visibility: !errorText ? 'hidden' : 'visible'}}>
                {errorText}
            </div>
        </div>
    );
});

export default UniversalRoundedInput;