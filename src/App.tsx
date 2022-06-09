import React from 'react';
import './App.css';
import LogInPage from "./pages/LogInPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CreateArticlePage from "./pages/CreateArticlePage";
import BlockArticlesPage from "./pages/BlockArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import AccountInfoPage from "./pages/AccountInfoPage";
import {Provider} from "react-redux";
import store from './redux/store'
import CounterPage from "./pages/CounterPage";
import axios from "axios";

function App() {
    //axios.defaults.baseURL = "http://localhost:8000/"
    axios.defaults.baseURL = "http://34.67.235.141:8000/"
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<LogInPage/>}/>
                    <Route path={"/register"} element={<RegisterPage/>}/>
                    <Route path={"/home"} element={<HomePage/>}/>
                    <Route path={"/create_article"} element={<CreateArticlePage/>}/>
                    <Route path={"/articles/:blockId/:pageIndex"} element={<BlockArticlesPage/>}/>
                    <Route path={"/article/:articleId"} element={<ArticleDetailPage/>}/>
                    <Route path={"/account/:email"} element={<AccountInfoPage/>}/>
                    <Route path={"/counter"} element={<CounterPage/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>

    );
}

export default App;
