import {ArticleFile} from '../../../../blog/common/file'
import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {getFileFormat, getFileUrl} from "../../utils/file";
import PhotoIcon from '@mui/icons-material/Photo';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import CodeIcon from '@mui/icons-material/Code';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Link from "@mui/material/Link";

const imageFormats = ['jpg', 'png', 'jpeg']
const pdfFormats = ['pdf']
const codeFormats = ['c', 'cpp', 'java', 'py', 'js', 'tx', 'cs', 'go']
const videoFormats = ['avi', 'mp4', 'wmv']
const compressFormats = ['rar', 'zip']


const ArticleFileCell = (props: {
    file: ArticleFile
}) => {
    const {id, name} = props.file.file
    const format = getFileFormat(name)

    const icon = format ? (
        imageFormats.includes(format) ? <PhotoIcon/> : (
            pdfFormats.includes(format) ? <PictureAsPdfIcon/> : (
                codeFormats.includes(format) ? <CodeIcon/> : (
                    videoFormats.includes(format) ? <VideoFileIcon/> : (
                        compressFormats.includes(format) ? <FolderZipIcon/> : <AttachFileIcon/>
                    )
                )
            )
        )
    ) : <AttachFileIcon/>

    return (
        <ListItem>
            <ListItemIcon>
                {
                    icon
                }
            </ListItemIcon>
            <Link href={getFileUrl(id ?? 0, name)}>
                <ListItemText primary={name ?? ""} />
            </Link>
        </ListItem>
    )
}

export default ArticleFileCell