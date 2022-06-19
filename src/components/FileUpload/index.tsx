import {ChangeEvent, ChangeEventHandler, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {PostMultipleFileResponse} from '../../../../blog/common/file'
import {Button, Stack} from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStorage";
import {getAuthorizationHeader} from "../../utils/auth";

const FileUpload = (props: {
    onAccepted: (files: {
        name: string,
        id: number
    }[]) => void,
    onError: () => void
}) => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | undefined>(undefined)
    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | undefined) => {
        if (!event || !event.target.files) {
            return
        }
        const newSelectedFiles = event.target.files
        setSelectedFiles(newSelectedFiles)
    }
    const [token] = useLocalStorage<string | undefined>('token', undefined)
    const submit = async () => {
        if (!selectedFiles) {
            return
        }
        if (!token) {
            props.onError()
            return
        }
        const formData = new FormData()
        console.log(selectedFiles)
        for (let i = 0; i < selectedFiles.length; i++) {
            const f = selectedFiles.item(i)
            if (f != null) {
                formData.append("file", f)
            }
        }
        axios({
            method: 'post',
            url: "/api/file/multiple",
            headers: {
                "Content-Type": "multipart/form-data",
                ...getAuthorizationHeader(token)
            },
            data: formData
        })
            .then((result: AxiosResponse<PostMultipleFileResponse>) => {
                const f = formData.get("file")
                if (f == null || typeof f == 'string') {
                    return
                }
                props.onAccepted(result.data.data.files)
            })
            .catch((err) => {
                console.log(err)
                props.onError()
            })
    }
    return (
        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
            <input type="file" name="upload_file" onChange={handleInputChange} multiple/>
            <Button onClick={submit}>upload</Button>
        </Stack>
    )
}

export default FileUpload