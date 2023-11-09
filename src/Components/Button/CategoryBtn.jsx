import React from "react"

const CategoryBtn = ({children, ...props}, ref) => {
    return(
        <button className="py-2.5 px-5 text-sm text-white focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-purple-500" ref={ref} {...props}>
            {children}
        </button>
    )
}

export default React.forwardRef(CategoryBtn)