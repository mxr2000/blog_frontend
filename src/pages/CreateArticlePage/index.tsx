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
import {useState} from "react";
import {Article} from '../../../../blog/common/article'
import {ErrorResponse} from '../../../../blog/common/index'
import axios from "axios";
import {useNavigate} from "react-router-dom";


const CreateArticlePage = () => {
    const [header, setHeader] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitArticle = () => {
        const article: Article = {
            email: "",
            blockId: 0,
            header: header,
            content: content
        }
        axios({
            method: 'get',
            data: article,
        })
            .then((result) => {

            })
            .catch((err: ErrorResponse) => {

            })


    }


    return (
        <Box sx={{ flexGrow: 1 }}>
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
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
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
                            <Button fullWidth={true} onClick={handleClickOpen}>submit</Button>
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