import {Pagination, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";


const ArticleListPagination = (props: {
    articleCount: number,
    baseUrl: string,
    pageIndex: number
}) => {
    const {articleCount, baseUrl, pageIndex} = props
    const navigate = useNavigate()
    return (
        <Stack justifyContent={"center"} direction={"row"} sx={{mt: 2}}>
            <Pagination
                onChange={(e, cnt) => navigate(baseUrl + (cnt - 1))}
                count={Math.floor(articleCount / 10) + (articleCount % 10 == 0 ? 0 : 1)}
                page={pageIndex + 1}
                color="primary"/>
        </Stack>
    )
}

export default ArticleListPagination