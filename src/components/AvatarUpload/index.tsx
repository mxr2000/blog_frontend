import Dropzone from "react-dropzone-uploader";
import * as React from "react";
import 'react-dropzone-uploader/dist/styles.css'
import axios from "axios";


const AvatarUpload = () => {
    return (
        <Dropzone
            getUploadParams={() => {
                return {
                    url: axios.defaults.baseURL + "api/file"
                }
            }}
            onSubmit={(files, allFiles) => {
                console.log(files.map(f => f.meta))
                allFiles.forEach(f => f.remove())
            }}
            onChangeStatus={({ meta }, status) => {
                console.log(status, meta)
            }}

            maxFiles={1}
            multiple={false}
            canCancel={false}
            inputContent="Drop your avatar"
        />
    )
}

export default AvatarUpload