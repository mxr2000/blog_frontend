import MainAppBar from "../../components/MainAppBar";
import {Box} from "@mui/material";
import {useState} from "react";


const ArticleEditPage = () => {
    const [content, setContent] = useState('')
    const [header, setHeader] = useState('')

    return (
        <Box sx={{flexGrow: 1}}>
            <MainAppBar/>

        </Box>

    )
}

export default ArticleEditPage