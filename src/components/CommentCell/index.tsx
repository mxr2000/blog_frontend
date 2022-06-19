import {Comment} from '../../../../blog/common/comment'
import styles from './index.module.css'
import {UserAvatar} from "../UserAvatar";

const CommentCell = (props: {
    comment: Comment
}) => {
    const {account, content, createdTime} = props.comment
    return (
        <div className={styles.container}>
            <UserAvatar account={account}/>
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