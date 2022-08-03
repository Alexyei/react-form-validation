import React from 'react';
import classes from "./RoundedInput.module.scss";
import getSVG from "./RoundedInputSVGs";

interface RoundedInputProps {
    // ref: React.RefObject<HTMLInputElement>,
    placeholder: string,
    name: string,
    errorText: string,
    [x:string]: any;
}

const RoundedInput = React.forwardRef<HTMLInputElement, RoundedInputProps>(({ placeholder, name, errorText, ...props}:RoundedInputProps, ref) => {



    return (
        <div className={`${classes.formGroup} ${errorText ? classes.error : ''}`}>
            {getSVG(name)}
            <input ref={ref} {...props} placeholder={placeholder} name={name}/>
            <div className={classes.errorText} style={{visibility: !errorText ? 'hidden' : 'visible'}}>
                {errorText}
            </div>
        </div>
    );
});

export default RoundedInput;