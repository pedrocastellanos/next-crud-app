import {useState, useEffect } from 'react'
export default function useLocalStorage(key, initialState) {
    const [state, setState] = useState(initialState)

    useEffect(()=>{
        const items = JSON.parse(localStorage.getItem(key))
        if(items.length > 0) setState(items)
    },[])

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state))
    }, [state])
    

    return [state, setState]

}
