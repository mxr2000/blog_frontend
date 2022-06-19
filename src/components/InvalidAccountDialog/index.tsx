import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import {Account} from '../../../../blog/common/account'


const InvalidAccountDialog = (props: {
    open: boolean,
    setOpen: (open: boolean) => void
}) => {
    const {open, setOpen} = props
    const navigate = useNavigate()
    const [account, setAccount] = useLocalStorage<Account | undefined>('account', undefined)
    const [token, setToken] = useLocalStorage<string | undefined>('token', undefined)
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Error
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Haven't logged in, or your token is expired
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => setOpen(false)}>
                    close
                </Button>
                <Button autoFocus onClick={() => {
                    setAccount(undefined)
                    setToken(undefined)
                    navigate("/")
                }}>
                    log in
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InvalidAccountDialog