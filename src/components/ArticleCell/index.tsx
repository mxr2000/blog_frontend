import {Avatar, Card, Divider, Typography} from "@mui/material";
import styles from './index.module.css'
import {Article} from '../../../../blog/common/article'
import {Link} from "react-router-dom";
import {ThumbDown, ThumbUp} from "@mui/icons-material";

const ArticleCell = (props: {
    article: Article
}) => {
    const {id, header, updatedTime, createdTime, username, email, positiveLikesCount, negativeLikesCount} = props.article
    return (
        <div className={styles.container}>
            <Avatar>H</Avatar>

            <div>
                <div className={styles.username}>
                    {username ?? email}
                    <span
                    className={styles.time}>created({createdTime}) updated({updatedTime})
                    </span>
                </div>
                <Link to={"/article/" + id} className={styles.header}>
                    <Typography variant={"h5"}>{header}</Typography>
                </Link>
                <Divider/>

            </div>
            {
                positiveLikesCount ? (
                    <div>
                        <div className={styles.thumbContainer}>
                            <ThumbUp/>
                            <div>{positiveLikesCount}</div>
                        </div>
                        <div className={styles.thumbContainer}>
                            <ThumbDown/>
                            <div>{negativeLikesCount}</div>
                        </div>
                    </div>
                ) : <></>
            }
        </div>
    )
}

export default ArticleCell