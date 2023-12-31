import React, { createContext, useContext } from 'react';
import './App.css';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Footer from './components/Footer';
const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);
	return (
		<>
			<Header
				theme={theme.palette.mode}
				toggleColorMode={colorMode.toggleColorMode}
			/>
			<Footer />
		</>
	);
}

export default function ToggleColorMode() {
	const [mode, setMode] = React.useState<'light' | 'dark'>('light');
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[]
	);

	const theme = React.useMemo(
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
