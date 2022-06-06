import {Comment} from '../../../../blog/common/comment'
import styles from './index.module.css'
import {Avatar} from "@mui/material";

const CommentCell = (props: {
    comment: Comment
}) => {
    const {account, content, createdTime} = props.comment
    return (
        <div className={styles.container}>
            <Avatar>M</Avatar>
            <div>
                <div className={styles.username}>
                    {account.username ?? account.email} <span className={styles.time}>{createdTime}</span>
                </div>
                <div className={styles.content}>
                    {content}
                </div>
            </div>

        </div>
    )
}

export default CommentCell