import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import SignUp from "./components/SignUp";
import Expenses from "./components/Expenses";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Expenses />} /> 
                    
                </Route>
                <Route path="sign-up" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;