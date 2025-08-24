import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import SignUp from "./components/SignUp";
import Expenses from "./components/Expenses";
import LogIn from "./components/Login";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Expenses />} /> 
                </Route>
                <Route path="sign-up" element={<SignUp />} />
                <Route path="login" element={<LogIn />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;