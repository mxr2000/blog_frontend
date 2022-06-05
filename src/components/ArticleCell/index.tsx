import {Avatar, Card, Typography} from "@mui/material";
import styles from './index.module.css'
import {Article} from '../../../../blog/common/article'
import {Link} from "react-router-dom";
const ArticleCell = (props: {
    article: Article
}) => {
    const {header, updatedTime, createdTime} = props.article
    return (
        <div className={styles.container}>
            <Avatar>H</Avatar>
            <div className={styles.username}>mxr</div>
            <Link to={"#"} className={styles.header}>
                <Typography variant={"h4"}>{header}</Typography>
            </Link>
            <div className={styles.bottomInfoContainer}>
                <span>
                    created({createdTime}) updated({updatedTime})
                </span>

            </div>
        </div>
    )
}

export default ArticleCell