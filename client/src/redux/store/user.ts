
import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        team: [],
        error: null,
        isLogged: false, 
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLogged = !!action.payload;
        },
        setisLogged: (state, action) => {
            state.isLogged = action.payload;

        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setTeam: (state, action) => {
            state.team = action.payload;
        },
    },
});


export const { setLoading, setUser, setError, setisLogged, setTeam } = userSlice.actions;
export default userSlice.reducer;
