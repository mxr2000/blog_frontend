import {
    Box,
    Typography,
    ListItem,
    ListItemText, Stack, List, Fab, Pagination, Container, Grid
} from "@mui/material";
import {useEffect, useState} from "react";
import ArticleCell from "../../components/ArticleCell";
import {Article, HomePageResponse} from '../../../../blog/common/article'
import {ErrorResponse} from '../../../../blog/common/index'
import MainAppBar from "../../components/MainAppBar";
import axios, {AxiosResponse} from "axios";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {loadBlocks, selectBlocks} from "../../redux/slices/blocksSlice";
import BlockCell from "../../components/BlockCell";
import ArticleListPagination from "../../components/ArticleListPagination";


const HomePage = () => {
    const navigate = useNavigate()
    const [articles, setArticles] = useState<Article[]>([])
    const [articleCount, setArticleCount] = useState(0)
    const blocks = useAppSelector(selectBlocks)
    const dispatch = useAppDispatch()
    const {pageIndex} = useParams<{
        pageIndex: string
    }>()
    useEffect(() => {
        axios({
            method: 'get',
            url: "/api/article/home/" + (pageIndex ?? "0")
        })
            .then((resp: AxiosResponse<HomePageResponse>) => {
                console.log(resp.data.data)
                setArticles(resp.data.data.articles)
                setArticleCount(resp.data.data.articleCount)
                dispatch(loadBlocks(resp.data.data.blocks))
            })
            .catch((err: ErrorResponse) => {

            })
    }, [pageIndex])

    return (
        <Box sx={{flexGrow: 1}}>
            <MainAppBar/>
            <Container sx={{mt:2}}>
                <Grid container>
                    <Grid item sx={{display: {xs: 'none', sm: 'none', md: 'block'}}} md={3}>
                        <List>
                            {
                                blocks.map((block, index) => <BlockCell block={block} key={index}/>)
                            }
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={9} md={6}>
                        {
                            articles.map((article, index) => <ArticleCell key={index} article={article} />)
                        }
                        <ArticleListPagination articleCount={articleCount} baseUrl={"/home/"} pageIndex={parseInt(pageIndex ?? "0")}/>
                        <Stack direction={"row-reverse"} sx={{m: 2}}>
                            <Fab color="primary" aria-label="add" onClick={() => navigate("/create_article")}>
                                <AddIcon />
                            </Fab>
                        </Stack>
                    </Grid>
                    <Grid xs={12} sm={12} md={3}>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default HomePage