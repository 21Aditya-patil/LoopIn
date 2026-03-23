import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SearchApi from "../API/SearchRequest";

export const searchData = createAsyncThunk(
    "search/fetch",
    async (query) => {
        const data = await SearchApi.searchUsersPosts(query);
        return data;
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState: {
        results: [],
        loading: false,
        error: false,
    },

    reducers: {
        clearSearch: (state) => {
            state.results = [];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(searchData.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchData.fulfilled, (state, action) => {
                state.loading = false;

                if (Array.isArray(action.payload)) {
                    state.results = action.payload;
                } else {
                    state.results = [action.payload];
                }
            })
            .addCase(searchData.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;