/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './features/Home/Home';
import './App.css';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);
	return (
		<BrowserRouter>
			<Header
				theme={theme.palette.mode}
				toggleColorMode={colorMode.toggleColorMode}
			/>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
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
