import {Account} from '../../../../blog/common/account'
import {Avatar} from "@mui/material";
import {Link} from "react-router-dom";

const colors = [
    "#f72585",
    "#b5179e",
    "#7209b7",
    "#560bad",
    "#480ca8",
    "#3a0ca3",
    "#3f37c9",
    "#4361ee",
    "#4895ef",
    "#4cc9f0"
]

const UserAvatar = (props: {
    account: Account
}) => {
    const {email} = props.account
    const firstChar = email.charCodeAt(0)
    const color = colors[firstChar % colors.length]
    return (
        <Link to={"/account/" + email} style={{textDecoration: 'none'}}>
            <Avatar sx={{backgroundColor: color, color: "white"}}>{email.charAt(0).toUpperCase()}</Avatar>
        </Link>
    )
}

export {UserAvatar}