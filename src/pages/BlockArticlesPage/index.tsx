import {
    Avatar,
    Box,
    Fab,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Pagination,
    Stack,
    Typography
} from "@mui/material"
import MainAppBar from "../../components/MainAppBar";
import ArticleCell from "../../components/ArticleCell";
import {useEffect, useState} from "react";
import {Article, BlockArticleResponse} from '../../../../blog/common/article'
import {ErrorResponse} from '../../../../blog/common/index'
import {useNavigate, useParams} from "react-router-dom";
import axios, {AxiosResponse} from "axios";


const BlockArticlesPage = () => {
    const [articles, setArticles] = useState<Article[]>([])
    const [articleCount, setArticleCount] = useState(1)
    const navigate = useNavigate()
    const {blockId, pageIndex} = useParams<{
        blockId: string,
        pageIndex: string
    }>()
    useEffect(() => {
        axios({
            method: 'get',
            url: "/api/article/block/" + blockId + "/" + pageIndex,
        })
            .then((resp: AxiosResponse<BlockArticleResponse>) => {
                setArticles(resp.data.data.articles)
                setArticleCount(resp.data.data.articleCount)
            })
            .catch((err: ErrorResponse) => {

            })
    }, [blockId, pageIndex])
    return (
        <Box sx={{flexGrow: 1}}>
            <MainAppBar/>
            <Stack direction={"row"} spacing={2} justifyContent={"center"} marginTop={2}>
                <Box sx={{width: '100%', maxWidth: 720}}>
                    {
                        articles.map((article, index) => <ArticleCell key={index} article={article}/>)
                    }
                    <Stack justifyContent={"center"} direction={"row"} sx={{mt: 2}}>
                        <Pagination
                            onChange={(e, cnt) => navigate("/articles/" + blockId + "/" + (cnt - 1))}
                            count={Math.floor(articleCount / 10) + (articleCount % 10 == 0 ? 0 : 1)}
                            page={parseInt(pageIndex ?? "0") + 1}
                            color="primary"/>
                    </Stack>
                </Box>
                <Box>
                    <Typography>right</Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export default BlockArticlesPage