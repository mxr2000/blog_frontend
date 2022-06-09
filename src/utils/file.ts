import axios from "axios";

const getFileUrl = (id: number, name: string): string => {
    const nameParts = name.split('.')
    const fileName = "" + id + (nameParts.length == 1 ? "" : `.${nameParts[nameParts.length - 1]}`)
    return axios.defaults.baseURL +  "static/image/" + fileName
}

export {getFileUrl}