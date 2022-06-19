import {Account, PostAvatarRequest} from '../../../../blog/common/account'
import {Alert, Box, Button, Card, CardMedia, Divider, FormControl, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import FileUpload from "../FileUpload";
import {getFileFormat, getFileUrl} from "../../utils/file";
import InvalidAccountDialog from "../InvalidAccountDialog";

const AccountEdit = (props: {
    account: Account,
    setAccount: (a: Account) => void
}) => {
    const {email} = props.account
    const [username, setUsername] = useState(props.account.username ?? "")
    const [isUpdateSuccessful, setIsUpdateSuccessful] = useState<boolean | undefined>(undefined)
    const [imageIdNamePair, setImageIdNamePair] = useState<{
        id: number,
        name: string
    } | undefined>(undefined)

    const [open, setOpen] = useState(false)

    const updateUserInfo = () => {
        const data: Account = {
            username, email
        }
        axios({
            url: "/api/account",
            method: "put",
            data: data
        })
            .then((result) => {
                setIsUpdateSuccessful(true)
                props.setAccount(data)
            })
            .catch((err) => {
                setIsUpdateSuccessful(false)
            })
    }

    const updateUserAvatar = () => {
        if (imageIdNamePair == undefined) {
            return
        }
        const data: PostAvatarRequest = {
            email: email,
            format: getFileFormat(imageIdNamePair.name) ?? ""
        }
        axios({
            url: "/api/acount/avatar",
            method: 'put',
            data: data
        })
            .then((result) => {

            })
            .catch((err) => {

            })
    }


    return (
        <Box sx={{maxWidth: "480"}}>
            {
                isUpdateSuccessful == undefined ? <></> :
                    (
                        <Alert sx={{width: "100%"}} severity={isUpdateSuccessful ? "success" : "error"}>
                            {isUpdateSuccessful ? "Update success!" : "Update fails"}
                        </Alert>
                    )
            }
            {
                props.account.avatar ? (
                    <Card>
                        <CardMedia
                            component={"image"}
                            image={axios.defaults.baseURL + "static/image/" + props.account.avatar}
                        >
                        </CardMedia>
                    </Card>
                ) : <></>
            }
            <FormControl variant="standard" fullWidth={true}>
                <Divider>Avatar</Divider>
                <FileUpload onAccepted={results => {
                    setImageIdNamePair(results[0])
                }} onError={() => setOpen(true)}/>
            </FormControl>
            <Button
                fullWidth
                onClick={updateUserAvatar}
            >update avatar</Button>
            <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                value={email}
                disabled
            />

            <TextField
                margin="normal"
                fullWidth
                label="Username"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <Button
                fullWidth
                onClick={updateUserInfo}
            >update</Button>
            <InvalidAccountDialog open={open} setOpen={setOpen}/>
        </Box>
    )
}

export default AccountEdit