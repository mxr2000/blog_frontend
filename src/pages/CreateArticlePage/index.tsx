import MainAppBar from "../../components/MainAppBar";
import {
    Box,
    Grid,
    TextField,
    Container,
    MenuItem,
    Select,
    FormControl,
    InputLabel, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import {useEffect, useState} from "react";
import {Article} from '../../../../blog/common/article'
import {Block} from '../../../../blog/common/block'
import {ErrorResponse} from '../../../../blog/common/index'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAccount, selectToken} from "../../redux/slices/accountSlice";
import {selectBlocks} from "../../redux/slices/blocksSlice";


const CreateArticlePage = () => {
    const [header, setHeader] = useState('')
    const [content, setContent] = useState('')
    const blocks = useSelector(selectBlocks)
    const [blockId, setBlockId] = useState<number>(blocks[0].id)
    const account = useSelector(selectAccount)
    const token = useSelector(selectToken)
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
        axios({
            method: 'post',
            data: article,
            url: "/api/article",
            headers: {
                "authorization": "Bearer " + token
            }
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
                            <Button fullWidth={true} onClick={submitArticle}>submit</Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    Network error
                                </DialogTitle>
                                {/*<DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Let Google help apps determine location. This means sending anonymous
                                        location data to Google, even when no apps are running.
                                    </DialogContentText>
                                </DialogContent>*/}
                                <DialogActions>
                                    <Button autoFocus onClick={handleClose}>
                                        close
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

export default CreateArticlePage