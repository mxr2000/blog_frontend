import {ArticleImage} from '../../../../blog/common/file'
import {Box, Button, Card, CardMedia, Stack} from "@mui/material";
import {getFileUrl} from "../../utils/file";

const ImageEditCell = (props: {
    articleImage: ArticleImage,
    remove: () => void
}) => {
    const {articleImage, remove} = props
    const {id, name} = articleImage.file
    return (
        <Box sx={{
            p: 1,
            display: 'flex'
        }}>
            <Box sx={{flexGrow: 1}}>
                <Card>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={getFileUrl(id ?? 0, name)}
                        height={"140"}
                    />
                </Card>
            </Box>
            <Box>
                <Button color="error" onClick={remove}>remove</Button>
            </Box>
        </Box>
    )
}

export default ImageEditCell