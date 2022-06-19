import {AppBar, Avatar, Badge, Box, Button, Drawer, IconButton, List, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import {Account} from '../../../../blog/common/account'
import {useAppSelector} from "../../redux/hooks";
import {selectBlocks} from "../../redux/slices/blocksSlice";
import BlockCell from "../BlockCell";
import HomeIcon from '@mui/icons-material/Home';
import {UserAvatar} from "../UserAvatar";

const MainAppBar = () => {
    const [open, setOpen] = useState(false)
    const [account, setAccount] = useLocalStorage<Account | undefined>('account', undefined)
    const [token, setToken] = useLocalStorage<string | undefined>('token', undefined)
    const navigate = useNavigate()
    const blocks = useAppSelector(selectBlocks)

    const logOut = () => {
        setAccount(undefined)
        setToken(undefined)
        navigate("/")
    }
    return (
        <AppBar position={"static"}>
            <Drawer
                onClose={() => setOpen(false)}
                open={open}

            >
                <Box
                    sx={{width: 250}}>
                    <Typography>
                        <List>
                            {
                                blocks.map((block, index) => <BlockCell block={block} key={index}/>)
                            }
                        </List>
                    </Typography>
                </Box>

            </Drawer>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: {sx: 0, sm: 0, md: 2}}}
                    onClick={() => setOpen(true)}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}>
                    <Link to={"/home"} style={{textDecoration: 'none', color: 'white'}}>
                        LEGAL FORUM
                    </Link>
                </Typography>
                <Link to={"/home"} style={{textDecoration: 'none', color: 'white'}}>
                    <IconButton size={"large"} color="inherit">
                        <HomeIcon/>
                    </IconButton>
                </Link>
                <Box component="div" sx={{flexGrow: 1}}/>
                {
                    account ? (
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={() => navigate("/account/" + account.email)}
                        >
                            <UserAvatar account={account}/>
                        </IconButton>
                    ) : <></>
                }
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <Button color="inherit" onClick={() => {
                    if (account) {
                        logOut()
                    } else {
                        navigate("/")
                    }
                }}>
                    {
                        account ? "Log out" : "Log in"
                    }
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default MainAppBar