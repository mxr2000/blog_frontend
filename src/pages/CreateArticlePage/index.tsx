import MainAppBar from "../../components/MainAppBar";
import {
    Box,
    Grid,
    TextField,
    Container,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CardMedia,
    Card,
    Divider,
    List
} from "@mui/material";
import {useEffect, useState} from "react";
import {Article, PostArticleRequest} from '../../../../blog/common/article'
import {Account} from '../../../../blog/common/account'
import {ErrorResponse} from '../../../../blog/common/index'
import {Block} from '../../../../blog/common/block'
import axios, {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import FileUpload from "../../components/FileUpload";
import {getFileUrl} from "../../utils/file";
import InvalidAccountDialog from "../../components/InvalidAccountDialog";
import {getAuthorizationHeader} from "../../utils/auth";
import ArticleFileCell from "../../components/ArticleFileCell";


const CreateArticlePage = () => {
    const [imageIdNamePairs, setImageIdNamePairs] = useState<{
        id: number,
        name: string
    }[]>([])
    const [fileIdNamePairs, setFileIdNamePairs] = useState<{
        id: number,
        name: string
    }[]>([])
    const [header, setHeader] = useState('')
    const [content, setContent] = useState('')
    const [blocks, setBlocks] = useState<Block[]>([{
        id: 1,
        name: "default"
    }])
    const [blockId, setBlockId] = useState<number>(blocks[0].id)
    const [account] = useLocalStorage<Account | undefined>('account', undefined)
    const [token] = useLocalStorage<string | undefined>('token', undefined)

    const navigate = useNavigate()

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitArticle = () => {
        console.log(blockId)
        if (!account || !token) {
            setOpen(true)
            return
        }
        const article: Article = {
            email: account.email,
            blockId: blockId,
            header: header,
            content: content
        }
        const data: PostArticleRequest = {
            article: article,
            imageIds: imageIdNamePairs.map(p => p.id),
            fileIds: fileIdNamePairs.map(p => p.id)
        }
        axios({
            method: 'post',
            data: data,
            url: "/api/article",
            headers: getAuthorizationHeader(token)
        })
            .then((result) => {
                console.log(result)
                navigate("/home")
            })
            .catch((err: ErrorResponse) => {
                console.log(err)
                setOpen(true)
            })
    }

    useEffect(() => {
        if (!account) {
            navigate("/")
        } else {
            axios({
                method: 'get',
                url: "/api/block"
            })
                .then((resp: AxiosResponse<Block[]>) => {
                    setBlocks(resp.data)
                })
                .catch((err: ErrorResponse) => {

                })
        }
    }, [])


    return (
        <Box sx={{flexGrow: 1}}>
            <MainAppBar/>
            <Container>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Grid container spacing={3} md={6} xs={12}>
                        <Grid item xs={12} md={12}>
                            <FormControl variant="standard" fullWidth={true}>
                                <InputLabel>Block</InputLabel>
                                <Select
                                    label="Block"
                                    fullWidth={true}
                                    onChange={e => setBlockId(e.target.value as number)}
                                    defaultValue={blocks[0].id}
                                >
                                    {
                                        blocks.map((block, index) => <MenuItem value={block.id}
                                                                               key={index}>{block.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                label="Header"
                                fullWidth
                                variant="standard"
                                value={header}
                                onChange={e => setHeader(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                label="Content"
                                fullWidth
                                variant="standard"
                                multiline={true}
                                rows={4}
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FormControl variant="standard" fullWidth={true}>
                                <Divider>Images</Divider>
                                <FileUpload onAccepted={result => {
                                    const newList = [...imageIdNamePairs, ...result]
                                    setImageIdNamePairs(newList)
                                }}
                                onError={() => setOpen(true)}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FormControl variant="standard" fullWidth={true}>
                                <Divider>Files</Divider>
                                <FileUpload onAccepted={result => {
                                    const newList = [...fileIdNamePairs, ...result]
                                    setFileIdNamePairs(newList)
                                }}
                                            onError={() => setOpen(true)}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            {
                                imageIdNamePairs.map((p, index) => (
                                    <Card sx={{maxWidth: '300'}} key={index}>
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            image={getFileUrl(p.id, p.name)}
                                        />
                                    </Card>
                                ))
                            }
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <List>
                                {
                                    fileIdNamePairs.map((p, index) => (
                                        <ArticleFileCell file={{articleId: 0, file: {id: p.id, name: p.name, email: ""}}} key={index}/>
                                    ))
                                }
                            </List>

                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Button fullWidth={true} variant="contained" onClick={submitArticle}>submit</Button>
                            <InvalidAccountDialog open={open} setOpen={setOpen}/>
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

export default CreateArticlePage