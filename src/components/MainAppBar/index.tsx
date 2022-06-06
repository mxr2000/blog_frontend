import {AppBar, Badge, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {useState} from "react";
import {Link} from "react-router-dom";


const MainAppBar = () => {
    const [open, setOpen] = useState(false)
    return (
        <AppBar position={"static"}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                    onClick={() => setOpen(true)}
                >
                    <MenuIcon/>
                </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <a href={"/home"} style={{textDecoration: 'none', color: 'white'}}>
                            LEGAL FORUM
                        </a>

                    </Typography>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default MainAppBar