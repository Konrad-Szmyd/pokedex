import { Outlet,Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "./context/UserContext"

const PrivateRoutes = () => {

    const {isLogged} = useContext(UserContext)
  return (
    isLogged? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes
