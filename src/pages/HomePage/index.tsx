import {
    Box,
    Typography,
    ListItem,
    ListItemText, Stack, Avatar, ListItemAvatar, List, Fab, Pagination
} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import {useEffect, useState} from "react";
import ArticleCell from "../../components/ArticleCell";
import {Article, HomePageResponse} from '../../../../blog/common/article'
import {Block} from '../../../../blog/common/block'
import {ErrorResponse} from '../../../../blog/common/index'
import MainAppBar from "../../components/MainAppBar";
import axios, {AxiosResponse} from "axios";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {loadBlocks, selectBlocks} from "../../redux/slices/blocksSlice";

const article1: Article = {
    email: "mxr@qq.com",
    blockId: 1,
    header: "Demo header",
    createdTime: "2000-08-05",
    updatedTime: "2000-09-01"
}


const HomePage = () => {
    const drawerWidth = 240;
    const navigate = useNavigate()
    const [articles, setArticles] = useState<Article[]>([article1])
    const blocks = useSelector(selectBlocks)
    const dispatch = useAppDispatch()
    useEffect(() => {
        axios({
            method: 'get',
            url: "/api/article/home"
        })
            .then((resp: AxiosResponse<HomePageResponse>) => {
                console.log(resp.data.data.articles)
                setArticles(resp.data.data.articles)
            })
            .catch((err: ErrorResponse) => {

            })
    }, [])
    useEffect(() => {
        if (blocks.length != 1) {
            return
        }
        axios({
            method: 'get',
            url: '/api/block'
        })
            .then((resp: AxiosResponse<Block[]>) => {
                console.log(resp.data)
                dispatch(loadBlocks(resp.data))
            })
            .catch((err: ErrorResponse) => {
                console.log(err)
            })

    }, [])
    return (
        <Box sx={{flexGrow: 1}}>
            <MainAppBar/>
            <Stack direction={"row"} spacing={2} justifyContent={"center"} marginTop={2}>
                <Box sx={{width: '100%', maxWidth: 240, bgcolor: 'background.paper'}}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <MailIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <MailIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Work" secondary="Jan 7, 2014"/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <MailIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Vacation" secondary="July 20, 2014"/>
                        </ListItem>
                    </List>
                </Box>

                <Box sx={{width: '100%', maxWidth: 720}}>
                    {
                        articles.map((article, index) => <ArticleCell key={index} article={article} />)
                    }
                    <Stack justifyContent={"center"} direction={"row"} sx={{mt: 2}}>
                        <Pagination count={10} color="primary" />
                    </Stack>
                    <Stack direction={"row-reverse"} sx={{m: 2}}>
                        <Fab color="primary" aria-label="add" onClick={() => navigate("/create_article")}>
                            <AddIcon />
                        </Fab>
                    </Stack>
                </Box>
                <Box>
                    <Typography>right</Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export default HomePage