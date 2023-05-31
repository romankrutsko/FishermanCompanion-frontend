import { useSelector } from "react-redux"
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { selectCurrentAuthState } from '../../lib/store/slices/auth'

export default function RequireAuth() {
    const isAuth = useSelector(selectCurrentAuthState)
    const location = useLocation()

    return isAuth ? <Outlet /> : <Navigate to='/authenticate' state={{ from: location }} replace />
}