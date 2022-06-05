import {
    Box,
    Typography,
    ListItem,
    ListItemText, Stack, Avatar, ListItemAvatar, List
} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import {useEffect, useState} from "react";
import ArticleCell from "../../components/ArticleCell";
import {Article, HomePageResponse} from '../../../../blog/common/article'
import {ErrorResponse} from '../../../../blog/common/index'
import MainAppBar from "../../components/MainAppBar";
import axios, {AxiosResponse} from "axios";

const article1: Article = {
    email: "mxr@qq.com",
    blockId: 1,
    header: "Demo header",
    createdTime: "2000-08-05",
    updatedTime: "2000-09-01"
}


const HomePage = () => {
    const drawerWidth = 240;
    const [articles, setArticles] = useState<Article[]>([])
    useEffect(() => {
        axios({
            method: 'get',
            url: "/api/article/home"
        })
            .then((resp: AxiosResponse<HomePageResponse>) => {
                setArticles(resp.data.data.articles)
            })
            .catch((err: ErrorResponse) => {

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

                <Box sx={{width: '100%', maxWidth: 720, bgcolor: 'gray'}}>
                    {
                        articles.map((article, index) => <ArticleCell key={index} article={article} />)
                    }
                </Box>
                <Box>
                    <Typography>right</Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export default HomePage