import axios from "axios";

const getFileUrl = (id: number, name: string): string => {
    const nameParts = name.split('.')
    const fileName = "" + id + (nameParts.length == 1 ? "" : `.${nameParts[nameParts.length - 1]}`)
    return axios.defaults.baseURL +  "static/image/" + fileName
}

const getFileFormat = (name: string): string | undefined => {
    const nameParts = name.split('.')
    return nameParts.length == 0 ? undefined : nameParts[nameParts.length - 1]
}

export {getFileUrl, getFileFormat}