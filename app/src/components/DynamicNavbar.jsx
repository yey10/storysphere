import React from 'react'
import {useAuth} from '../context/AuthContext.jsx'
import Navbar from './Navbar.jsx'
import NavbarUsuario from './NavbarUsuario.jsx'

function DynamicNavbar() {

    const {isAuthenticated} = useAuth() //obtener el estado de autenticación

  return isAuthenticated ? <NavbarUsuario /> : <Navbar />
}

export default DynamicNavbar