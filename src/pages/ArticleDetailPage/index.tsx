import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ArticleDetailResponse} from '../../../../blog/common/article'
import {Comment} from '../../../../blog/common/comment'
import {ErrorResponse} from '../../../../blog/common/index'
import {Account} from '../../../../blog/common/account'
import {Box, Divider, Stack, TextField, Typography} from "@mui/material";
import MainAppBar from "../../components/MainAppBar";
import CommentCell from "../../components/CommentCell";
import Button from "@mui/material/Button";
import useLocalStorage from "../../hooks/useLocalStorage";


const ArticleDetailPage = () => {
    const {articleId} = useParams<{
        articleId: string
    }>()
    useEffect(() => {
        axios({
            url: "/api/article/detail/" + articleId,
            method: 'get'
        })
            .then((resp: AxiosResponse<ArticleDetailResponse>) => {
                console.log(resp)
                const {article, comments} = resp.data.data
                setContent(article.content ?? "no content")
                setHeader(article.header)
                setComments(comments)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const [header, setHeader] = useState('')
    const [content, setContent] = useState('')
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState('')

    const [account] = useLocalStorage<Account | undefined>('account', undefined)
    const [token] = useLocalStorage<string | undefined>('token', undefined)

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

        })
            .then((result) => {
                const newComments: Comment[] = [...comments, data]
                setComments(newComments)
        })
            .catch((err: ErrorResponse) => {
                console.log(err)
            })
    }


    return (
        <Box sx={{flexGrow: 1}}>
            <MainAppBar/>
            <Stack direction={"row"} spacing={2} justifyContent={"center"} marginTop={2}>
                <Box sx={{width: '100%', maxWidth: 720, bgcolor: 'background.paper'}}>
                    <Typography variant={"h4"}>
                        {header}
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{mt: 2}}>
                        {content}
                    </Typography>
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

                <Box sx={{width: '100%', maxWidth: 240, bgcolor: 'gray'}}>
                    {
                    }
                </Box>
            </Stack>
        </Box>
    )
}

export default ArticleDetailPage