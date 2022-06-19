import {ArticleImage} from '../../../../blog/common/file'
import {Card, CardMedia} from "@mui/material";
import axios from "axios";
import {getFileUrl} from "../../utils/file";

const ArticleImageCell = (props: {
    articleImage: ArticleImage
}) => {
    const {id, name} = props.articleImage.file

    return (
        <Card sx={{m: 2}}>
            <CardMedia
                component="img"
                alt="green iguana"
                image={getFileUrl(id ?? 0, name)}
            />
        </Card>
    )
}

export default ArticleImageCell

