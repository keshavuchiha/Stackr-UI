import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: '',
	isAuthenticated: false,
	profile: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthenticated: (
			state,
			action: {
				payload: boolean;
				type: string;
			}
		) => {
			state.isAuthenticated = action.payload;
		},
	},
});

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
