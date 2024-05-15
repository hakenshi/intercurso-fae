import { useEffect, useRef } from "react";

export const useClickOutSide = (handler, isMenuVisible) => {
    const domNode = useRef(null)

    console.log(domNode)
    
    useEffect(() => {
        let handleClickOutside = (e) => {
         if(domNode.current && !domNode.current.contains(e.target)){
             handler()
         }
        }
        document.addEventListener('mousedown', handleClickOutside)
        
         return () => {
             document.removeEventListener("mousedown", handleClickOutside);
         };
     }, [handler, domNode]);

     return domNode
}

