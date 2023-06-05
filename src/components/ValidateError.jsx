import { useCallback } from "react"
import { useSelector } from "react-redux"


const ValidateError = () => {
    const {error} = useSelector(state => state.auth)

    const errorMessage = useCallback(() => {
        return Object.keys(error).map(name => {
            const msg = error[name].join(", ")
            return `${name} - ${msg}`
        })
    },[error])

    return (
        error !== null && errorMessage().map(error => (
            <div className='alert alert-danger text-start' role='alert' key={error}>
                {error}
            </div>
        )) 
  )
}

export default ValidateError