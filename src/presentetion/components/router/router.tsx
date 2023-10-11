import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Login} from '@/presentetion/pages'
import "../../styles/global-styles.scss"
const Router: React.FC = () => {
    return (
        <BrowserRouter>
         <Routes>
            <Route path="/login" Component={Login}/>
         </Routes>

        </BrowserRouter>
    )
}
export default Router