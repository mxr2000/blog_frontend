import React from 'react';
import logo from './logo.svg';
import './App.css';
import LogInPage from "./pages/LogInPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<LogInPage/>}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
