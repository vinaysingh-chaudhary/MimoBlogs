import React, { useId } from "react";

const Select = ({ options, label, ...props }, ref) => {
    const id = useId();

    return (
        <div className=" w-full">
            {  label&& <label htmlFor={id}>{label}</label>}

            <select id={id} {...props} ref={ref} >
                {options?.map((option) =>{ 
                    return <option value={option} key={option}>
                                    {option}
                                </option>})}
            </select>
        </div>

    )
}

export default React.forwardRef(Select); 