import React, { useId } from "react";

const Select = ({ options, label, ...props }, ref) => {
    const id = useId();

    return (
        <div className=" w-full flex justify-center sm:justify-start ">
            {  label&& <label htmlFor={id} className="text-white">{label}</label>}

            <select id={id} {...props} ref={ref} className=" px-16 rounded-md outline-none foucs:border-none bg-[#474747] cursor-pointer" >
                {options?.map((option) =>{ 
                    return <option value={option} key={option} className="bg-white">
                                    {option}
                                </option>})}
            </select>
        </div>

    )
}

export default React.forwardRef(Select); 