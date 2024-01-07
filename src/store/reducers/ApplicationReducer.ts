import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isApplicationLoading: false,
	toastMessage: '',
	toastType: '',
};

const applicationSlice = createSlice({
	name: 'application',
	initialState,
	reducers: {
		setApplicationLoading: (state, action) => {
			state.isApplicationLoading = action.payload;
		},
		setToastMessage: (state, action) => {
			state.toastMessage = action.payload.toastMessage;
			state.toastType = action.payload.toastType;
		},
	},
});

export const { setApplicationLoading, setToastMessage } =
	applicationSlice.actions;

export default applicationSlice.reducer;
