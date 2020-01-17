
import React from "react";

import classes from './Input.css';

const input = ( props ) => {
    const classesInput = [classes.InputElement];

    if (props.invalid && props.touched) {
        classesInput.push(classes.Invalid)
    }

    let inputElement = null;

    switch( props.elementtype ) {

        case ( "input" ): {
            inputElement = <input onChange={props.changed} 
                            className={classesInput.join(" ")} {...props}/>;
            break;
        }

        case ( "select" ): {
            inputElement = (
                <select onChange={props.changed} className={classesInput.join(" ")} /*value={props.options[0].value}*/>
                    <option 
                        value="- Select Delivery Method -"> 
                        - Select Delivery Method -
                    </option>
                    {
                        props.options.map( (option) => {
                            return  (                                
                                <option 
                                    key={option.value}
                                    value={option.value}> 
                                    {option.displayValue} 
                                </option>
                            )
                        })
                    }
                </select>
            );

            break;
        }

        default: {
            inputElement = <input 
                                onChange={props.changed} 
                                className={classesInput.join(" ")} {...props}
                            />;
            break;
        }
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}> {props.label} </label>
            {inputElement}
        </div>
    );

}

export default input;