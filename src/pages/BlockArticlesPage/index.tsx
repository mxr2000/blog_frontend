import {
    Box, Container, Grid,
} from "@mui/material"
import MainAppBar from "../../components/MainAppBar";
import ArticleCell from "../../components/ArticleCell";
import {useEffect, useState} from "react";
import {Article, BlockArticleResponse} from '../../../../blog/common/article'
import {ErrorResponse} from '../../../../blog/common/index'
import {useParams} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import ArticleListPagination from "../../components/ArticleListPagination";


const BlockArticlesPage = () => {
    const [articles, setArticles] = useState<Article[]>([])
    const [articleCount, setArticleCount] = useState(1)
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
            <Container sx={{mt: 2}}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={9}>
                        {
                            articles.map((article, index) => <ArticleCell key={index} article={article}/>)
                        }
                        <ArticleListPagination articleCount={articleCount} baseUrl={`/articles/${blockId}/`}
                                               pageIndex={parseInt(pageIndex ?? "0")}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default BlockArticlesPage