import {Block} from '../../../../blog/common/block'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface BlocksState {
    blocks: Block[]
}

const initialState: BlocksState = {
    blocks: [
        {
            id: 1,
            name: "default"
        }
    ]
}

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState,
    reducers: {
        loadBlocks: (state, action: PayloadAction<Block[]>) => {
            state.blocks = action.payload
        }
    }
})


export default blocksSlice.reducer
export const {loadBlocks} = blocksSlice.actions
export const selectBlocks = (state: RootState) => state.blocks.blocks
