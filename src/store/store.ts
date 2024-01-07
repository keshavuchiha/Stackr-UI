import { configureStore } from '@reduxjs/toolkit';
import ApplicationReducer from './reducers/ApplicationReducer';

export const store = configureStore({
	reducer: {
		application: ApplicationReducer,
	},
});
