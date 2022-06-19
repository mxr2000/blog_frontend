import {Avatar, Box, Button, Card, Divider, Stack, Typography} from "@mui/material";
import styles from './index.module.css'
import {Article} from '../../../../blog/common/article'
import {Link} from "react-router-dom";
import {ThumbDown, ThumbUp} from "@mui/icons-material";
import {UserAvatar} from "../UserAvatar";

const colors = [
    "#8ecae6",
    "#219ebc",
    "#023047",
    "#ffb703",
    "#fb8500"
]

const ArticleBlockCell = (props: {
    name: string,
    index: number
}) => {
    const {name, index} = props
    const color = colors[index % colors.length]
    return (
        <Box
            sx={{
                borderRadius: 0.5,
                p: 0.3,
                backgroundColor: color,
                display: "inline",
                color: "white",
                fontSize: "small",
                mr: 1
            }}
        >{name}</Box>
    )
}

const ArticleCell = (props: {
    article: Article,
    editable?: boolean
}) => {
    const {
        id,
        header,
        createdTime,
        username,
        email,
        positiveLikesCount,
        negativeLikesCount,
        blockName,
        blockId
    } = props.article
    const {editable} = props
    return (
        <div className={styles.container}>
            <UserAvatar account={{email: email}}/>

            <div>
                <div className={styles.username}>
                    {username ?? email}
                    <span
                        className={styles.time}>{createdTime}
                    </span>
                </div>
                <Stack direction={"row"} alignItems={"center"}>
                    <ArticleBlockCell name={blockName ?? ""}
                                      index={blockId}/>
                    <Link to={"/article/" + id} className={styles.header}>
                        <Typography variant={"h5"}>{header}</Typography>
                    </Link>
                </Stack>

                <Divider/>

            </div>
            {
                positiveLikesCount != undefined ? (
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
            {
                editable != undefined ? (
                    <Button>edit</Button>
                ) : <></>
            }
        </div>
    )
}

export default ArticleCell