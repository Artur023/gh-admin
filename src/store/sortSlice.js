import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    sortOption: 'updated',
};
const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortOption(state, action) {
            state.sortOption = action.payload;
        },
    },
});
export const { setSortOption } = sortSlice.actions;
export default sortSlice.reducer;
