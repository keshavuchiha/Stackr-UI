/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './features/Home/Home';
import './App.css';
import { useSelector } from 'react-redux';
import LoadingPage from './components/LoadingPage/LoadingPage';
import { StateProps } from './constants/store';
import { ToastContainer } from 'react-toastify';
import sendToast from './features/Toast/Toast';
import 'react-toastify/dist/ReactToastify.css';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);
	const isApplicationLoading: boolean = useSelector(
		(state: StateProps) => state.application.isApplicationLoading
	);
	const toastMessage: string = useSelector(
		(state: StateProps) => state.application.toastMessage
	);
	const toastType = useSelector(
		(state: StateProps) => state.application.toastType
	);

	useEffect(() => {
		if (toastMessage.length > 0) {
			sendToast({ message: toastMessage, type: toastType });
		}
	}, [toastMessage, toastType]);

	return (
		<BrowserRouter>
			<Header
				theme={theme.palette.mode}
				toggleColorMode={colorMode.toggleColorMode}
			/>
			<ToastContainer
				position="bottom-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={theme.palette.mode}
			/>
			{isApplicationLoading === true ? (
				<LoadingPage open={isApplicationLoading} />
			) : (
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			)}
		</BrowserRouter>
	);
}

function AppRouter() {
	const [mode, setMode] = useState<'light' | 'dark'>('light');
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[]
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default AppRouter;
