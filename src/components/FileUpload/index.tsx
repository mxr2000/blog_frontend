import {ChangeEvent, ChangeEventHandler, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {PostFileResponse} from '../../../../blog/common/file'
import {rejects} from "assert";
import {Button, Stack} from "@mui/material";

const FileUpload = (props: {
    onAccepted: (name: string, id: number) => void
}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | undefined) => {
        if (!event || !event.target.files) {
            return
        }
        const newSelectedFiles = [...selectedFiles, event.target.files[0]]
        setSelectedFiles(newSelectedFiles)
    }
    const submit = async () => {
        if (!selectedFiles) {
            return
        }
        const formData = new FormData()
        selectedFiles.forEach(f => formData.append("file", f))
        axios({
            method: 'post',
            url: "/api/file",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: formData
        })
            .then((result: AxiosResponse<PostFileResponse>) => {
                const f = formData.get("file")
                if (f == null || typeof f == 'string') {
                    return
                }
                props.onAccepted(f.name, result.data.data.fileId)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
            <input type="file" name="upload_file" onChange={handleInputChange}/>
            <Button onClick={submit}>upload</Button>
        </Stack>
    )
}

export default FileUpload