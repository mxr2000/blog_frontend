import {Account, LogInSuccessResponse} from '../../../../blog/common/account'
import {ErrorResponse} from '../../../../blog/common/index'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import {RootState} from "../store";

interface AccountState {
    account?: Account
    token?: string
}

const initialState: AccountState = {

}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<{
            account: Account,
            token: string
        }>) => {
            const {account, token} = action.payload
            state.account = account
            state.token = token
        },
        logOut: state => {
            state.account = undefined
            state.token = undefined
        }
    }
})


export default accountSlice.reducer
export const {logIn, logOut} = accountSlice.actions
export const selectAccount = (state: RootState) => state.account.account
export const selectToken = (state: RootState) => state.account.token