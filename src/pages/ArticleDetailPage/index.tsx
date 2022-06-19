import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ArticleDetailResponse, ArticleLike} from '../../../../blog/common/article'
import {Comment} from '../../../../blog/common/comment'
import {ErrorResponse} from '../../../../blog/common/index'
import {Account} from '../../../../blog/common/account'
import {
    Box,
    Container,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography,
    Alert,
    Breadcrumbs,
    Link,
    List
} from "@mui/material";
import MainAppBar from "../../components/MainAppBar";
import CommentCell from "../../components/CommentCell";
import Button from "@mui/material/Button";
import useLocalStorage from "../../hooks/useLocalStorage";
import {ArticleImage, ArticleFile} from '../../../../blog/common/file'
import ArticleImageCell from "../../components/ArticleImageCell";
import AccountInfoColumn from "../../components/AccountInfoColumn";
import {ThumbDown, ThumbUp} from "@mui/icons-material";
import {getAuthorizationHeader} from "../../utils/auth";
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ArticleFileCell from "../../components/ArticleFileCell";
import InvalidAccountDialog from "../../components/InvalidAccountDialog";


const ArticleDetailPage = () => {
    const {articleId} = useParams<{
        articleId: string
    }>()
    useEffect(() => {
        axios({
            url: "/api/article/detail/" + articleId,
            method: 'get',
            headers: token ? getAuthorizationHeader(token) : {}
        })
            .then((resp: AxiosResponse<ArticleDetailResponse>) => {
                console.log(resp)
                const {article, comments, likeArticle} = resp.data.data
                setContent(article.content ?? "no content")
                setHeader(article.header)
                setCreatedTime(article.createdTime ?? "")
                setUserLike(likeArticle)
                setBlockId(article.blockId)
                setBlockName(article.blockName ?? "default")
                setFiles(article.files ?? [])
                if (article.positiveLikesCount) {
                    setPositiveLikesCount(article.positiveLikesCount)
                }
                if (article.negativeLikesCount) {
                    setNegativeLikesCount(article.negativeLikesCount)
                }
                if (article.images) {
                    setImages(article.images)
                }
                setComments(comments)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const [header, setHeader] = useState('')
    const [content, setContent] = useState('')
    const [createdTime, setCreatedTime] = useState('')
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState('')
    const [images, setImages] = useState<ArticleImage[]>([])
    const [positiveLikesCount, setPositiveLikesCount] = useState(0)
    const [negativeLikesCount, setNegativeLikesCount] = useState(0)
    const [userLike, setUserLike] = useState<boolean | undefined>(undefined)
    const [account, setAccount] = useLocalStorage<Account | undefined>('account', undefined)
    const [token, setToken] = useLocalStorage<string | undefined>('token', undefined)
    const [blockId, setBlockId] = useState(0)
    const [blockName, setBlockName] = useState('')
    const [files, setFiles] = useState<ArticleFile[]>([])

    const [openDialog, setOpenDialog] = useState(false)

    const postComment = () => {
        console.log(account)
        console.log(token)
        if (!account || !token) {
            return
        }
        const data: Comment = {
            account: account,
            content: newComment,
            articleId: parseInt(articleId ?? "")
        }
        axios({
            method: 'post',
            url: "/api/comment",
            data: data,
            headers: getAuthorizationHeader(token)
        })
            .then((result) => {
                const newComments: Comment[] = [...comments, data]
                setComments(newComments)
        })
            .catch((err: ErrorResponse) => {
                console.log(err)
                clearAndShowError()
            })
    }

    const likeArticle = (positive: boolean) => {
        if (!account) {
            clearAndShowError()
            return
        }
        const data: ArticleLike = {
            articleId: parseInt(articleId ?? ""),
            email: account.email,
            positive: positive
        }
        axios({
            method: 'post',
            url: "/api/like",
            data: data
        }).then(() => {
            if (positive) {
                setUserLike(true)
                setPositiveLikesCount(positiveLikesCount + 1)
            } else {
                setUserLike(false)
                setNegativeLikesCount(negativeLikesCount + 1)
            }
        }).catch(err => {
            console.log(err)
            clearAndShowError()
        })
    }

    const unlikeArticle = () => {
        if (!account || userLike == undefined) {
            clearAndShowError()
            return
        }
        const data: ArticleLike = {
            articleId: parseInt(articleId ?? ""),
            email: account.email,
            positive: true
        }
        axios({
            method: 'delete',
            url: '/api/like',
            data: data
        })
            .then(() => {
                if (userLike) {
                    setPositiveLikesCount(positiveLikesCount - 1)
                } else {
                    setNegativeLikesCount(negativeLikesCount - 1)
                }
                setUserLike(undefined)
            })
            .catch(err => {
                console.log(err)
                clearAndShowError()
            })
    }

    const clearAndShowError = () => {
        setAccount(undefined)
        setToken(undefined)
        setOpenDialog(true)
    }


    return (
        <Box sx={{flexGrow: 1}}>
            <MainAppBar/>
            <Container sx={{mt:2}}>
                <Grid container>
                    <Grid item xs={12} sm={8} md={9}>

                        <Box sx={{width: '100%', maxWidth: 720, bgcolor: 'background.paper'}}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link underline="hover" color="inherit" href={`/articles/${blockId}/0`}>
                                    {blockName}
                                </Link>
                                <Typography color="text.primary">{header}</Typography>
                            </Breadcrumbs>
                            {/*<Alert sx={{ width: '100%' }} severity="error" >This is an error alert — check it out!</Alert>*/}
                            <Typography variant={"h4"}>
                                {header}
                            </Typography>
                            <Typography variant="body1" gutterBottom sx={{mt: 2}}>
                                {content}
                            </Typography>
                            {
                                images.length != 0 ?
                                    <Box sx={{m: 2}}>
                                        <Divider>
                                            <Typography variant={"h5"}>
                                                Images
                                            </Typography>
                                        </Divider>
                                        {
                                            images.map((image, index) => <ArticleImageCell articleImage={image} key={index}/>)
                                        }
                                    </Box> : <></>
                            }
                            {
                                files.length != 0 ?
                                    <Box sx={{m: 2}}>
                                        <Divider>
                                            <Typography variant={"h5"}>
                                                Files
                                            </Typography>
                                        </Divider>
                                        <List>
                                            {
                                                files.map((file, index) => <ArticleFileCell file={file} key={index}/>)
                                            }
                                        </List>
                                    </Box> : <></>
                            }
                            <Box>
                                <Typography color={"darkgray"}>created at {createdTime}</Typography>
                            </Box>
                            <Stack direction={"row-reverse"} spacing={1} alignItems={"center"}>
                                {
                                    userLike == true ? <ThumbUp onClick={unlikeArticle}/> : <ThumbUpAltOutlinedIcon onClick={() => likeArticle(true)}/>
                                }<div>{positiveLikesCount}</div>
                                {
                                    userLike == false ? <ThumbDown onClick={unlikeArticle}/> : <ThumbDownAltOutlinedIcon onClick={() => likeArticle(false)}/>
                                }<div>{negativeLikesCount}</div>
                            </Stack>
                            <Divider>
                                <Typography variant={"h5"}>
                                    Comments
                                </Typography>
                            </Divider>
                            {
                                comments.map((comment, index) => <CommentCell comment={comment} key={index}/>)
                            }

                            <TextField
                                multiline
                                rows={4}
                                variant={"outlined"}
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                fullWidth
                                sx={{mt: 2}}
                            />
                            <Button
                                sx={{mt: 2}}
                                fullWidth
                                disabled={!account}
                                onClick={postComment}
                            >
                                {
                                    account ? "post a comment" : "log in to post a comment"
                                }
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        {
                            account? <AccountInfoColumn account={account}/> : <></>
                        }

                    </Grid>
                </Grid>
            </Container>

            <Stack direction={"row"} spacing={2} justifyContent={"center"} marginTop={2}>
            <InvalidAccountDialog open={openDialog} setOpen={setOpenDialog}/>

            </Stack>
        </Box>
    )
}

export default ArticleDetailPage