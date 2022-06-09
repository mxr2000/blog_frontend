import {Block} from '../../../../blog/common/block'
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import {Link} from "react-router-dom";


const BlockCell = (props: {block: Block}) => {
    const {name, id} = props.block
    return (
        <Link to={"/articles/" + id + "/0"} style={{textDecoration: 'none', color: 'black'}}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <MailIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary="Jan 9, 2014"/>
            </ListItem>
        </Link>

    )
}

export default BlockCell