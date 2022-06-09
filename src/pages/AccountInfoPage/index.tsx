import {Box, Divider, Stack, Tab, Tabs} from "@mui/material"
import MainAppBar from "../../components/MainAppBar";
import {SyntheticEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {AccountInfoPageResponse, Account} from '../../../../blog/common/account'
import {Article} from '../../../../blog/common/article'
import {Comment} from '../../../../blog/common/comment'
import ArticleCell from "../../components/ArticleCell";
import CommentCell from "../../components/CommentCell";
import useLocalStorage from "../../hooks/useLocalStorage";

function TabPanel(props: {
    children?: React.ReactNode;
    index: number;
    value: number;
}) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const AccountInfoPage = () => {
    const {email} = useParams<{
        email: string
    }>()
    const [tabIndex, setTabIndex] = useState(0);
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const [articles, setArticles] = useState<Article[]>([])
    const [articleComments, setArticleComments] = useState<{
        article: Article,
        comments: Comment[]
    }[]>([])
    const [account, setAccount] = useState<Account | undefined>(undefined)
    useEffect(() => {
        axios({
            method: 'get',
            url: "/api/account/info/" + email
        })
            .then((resp: AxiosResponse<AccountInfoPageResponse>) => {
                console.log(resp)
                const {account, articles, articleComments} = resp.data.data
                setAccount(account)
                setArticles(articles)
                setArticleComments(articleComments)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <MainAppBar/>
            <Stack direction={"row"} spacing={2} justifyContent={"center"} marginTop={2}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Articles"/>
                        <Tab label="Comments"/>
                        <Tab label="Profile"/>
                    </Tabs>
                </Box>
            </Stack>
            <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                <TabPanel value={tabIndex} index={0}>
                    {
                        articles.map((a, index) => <ArticleCell article={a} key={index}/>)
                    }
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    {
                        articleComments.map((ac, a_index) => (
                            <div key={"a_" + a_index}>
                                <ArticleCell article={ac.article} key={"a_" + a_index}/>
                                {
                                    ac.comments.map((c, c_index) => <Box
                                        key={"c_" + a_index + "_" + c_index}
                                        sx={{ml: 4}}
                                    >
                                        <CommentCell comment={c}
                                        />
                                    </Box>)
                                }
                                <Divider/>
                            </div>
                        ))
                    }
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    {
                    }
                </TabPanel>
            </Stack>

        </Box>
    )
}

export default AccountInfoPage