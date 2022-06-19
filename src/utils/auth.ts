

const getAuthorizationHeader = (token: string) => {
    return {
        "authorization": "Bearer " + token
    }
}

export {getAuthorizationHeader}

