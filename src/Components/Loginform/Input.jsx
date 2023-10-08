import React, { useId } from "react";

const Input = ({ label, type = "text", placeholder = "Press random keys if you're  blank...", ...props }, ref) => {     //refrence will be passed different from props
const id = useId(); 

  return (
    <div className="w-full h-full gap-2 flex items-center flex-col ">
        {label&& <label htmlFor={id}>{label}</label>}   
        <input type={type} id={id} className="border-2 rounded-lg py-1.5 px-3" placeholder={placeholder} ref={ref} {...props}/>        
        
         {/*here use that refrence, this will pass the refrence of paticular input field and label to your parent component when you will use this 
         component multiple times, so to get to know for what type we are using this component, this value will pass the refrence to the parent component,
         
         and for the access of state which is present in parent component, so that we can use event listeners to get the values and set those values*/}
    </div>
    )
}

export default React.forwardRef(Input);
