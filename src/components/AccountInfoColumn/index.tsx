import {Account} from '../../../../blog/common/account'
import {Box, Card, CardMedia, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import {getFileUrl} from "../../utils/file";

const AccountInfoColumn = (props: {
    account: Account
}) => {
    const {email, username} = props.account
    return (
        <Box>
            <Card>
                <CardMedia
                    component="img"
                    image={getFileUrl(1, "5A7C53FD-D667-4E50-9F63-B4D0CDC9779D.png")}
                />
            </Card>
            <List >
                <ListItem>
                    <ListItemIcon>
                        <EmailIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary={email}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={username}
                    />
                </ListItem>
            </List>
        </Box>
    )
}

export default AccountInfoColumn
