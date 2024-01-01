import React, { useState } from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Button,
	Tooltip,
	MenuItem,
	PaletteMode,
	ListItemIcon,
	ListItemText,
	Dialog,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import {
	Menu as MenuIcon,
	Brightness4,
	Brightness7,
	AccountCircleOutlined,
	Person,
	PersonAdd,
} from '@mui/icons-material';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import { useNavigate } from 'react-router-dom';
import {
	LOGIN,
	NAVBAR,
	REGISTER,
	SETTINGS,
	navlinks,
	settings,
} from '../../constants/navbar';
import Logo from '../../resources/logo.png';
import AppStyles from '../../styles/App.module.scss';
import styles from './Header.module.scss';
import clsx from 'clsx';

const renderSettingsIcon = (iconName: string) => {
	switch (iconName) {
		case 'Person':
			return <Person />;
		case 'PersonAdd':
			return <PersonAdd />;
		default:
			return null;
	}
};

interface Props {
	theme: PaletteMode;
	toggleColorMode: () => void;
}

interface SettingItemProps {
	index: number;
	tabName: string;
	location: string;
	component: string;
	icon: string;
}

interface AuthMenuProps {
	enabled: boolean;
	type: 'Login' | 'Register';
}

function Header(props: Props) {
	const { theme, toggleColorMode } = props;
	const navigate = useNavigate();
	const [navbarAnchor, setNavbarAnchor] = useState<null | HTMLElement>(null);
	const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(
		null
	);
	const [auth, setAuth] = useState<AuthMenuProps>({
		enabled: false,
		type: LOGIN,
	});

	const renderComponent = (component: string) => {
		switch (component) {
			case LOGIN:
			case REGISTER:
				return setAuth({ enabled: true, type: component });
			default:
				return;
		}
	};

	const openMenu = (
		menuName: 'Settings' | 'Navbar',
		event: React.MouseEvent<HTMLElement>
	) => {
		if (menuName === SETTINGS) setSettingsAnchor(event.currentTarget);
		else setNavbarAnchor(event.currentTarget);
	};

	const closeMenu = (menuName: string) => {
		if (menuName === SETTINGS) setSettingsAnchor(null);
		else setNavbarAnchor(null);
	};

	const handleSettingsMenuClick = (props: SettingItemProps) => {
		renderComponent(props.component);
		closeMenu(SETTINGS);
	};

	return (
		<>
			<AppBar color="default" position="static" elevation={0}>
				<Container maxWidth="xl">
					<Toolbar
						disableGutters
						sx={{
							display: { xs: 'flex', md: '' },
							justifyContent: 'space-between',
						}}
					>
						<IconButton
							onClick={() => navigate('/')}
							sx={{ display: { xs: 'none', md: 'flex' } }}
							disableRipple
						>
							<img className="w-52" src={Logo} alt="logo" />
						</IconButton>
						<Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={(event) => openMenu(NAVBAR, event)}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={navbarAnchor}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(navbarAnchor)}
								onClose={() => closeMenu(NAVBAR)}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								{navlinks.map((navlink) => (
									<MenuItem
										key={navlink?.index?.toString()}
										onClick={() => closeMenu(NAVBAR)}
									>
										<Typography
											className={clsx(
												theme === 'light' && AppStyles.PrimaryText
											)}
											textAlign="center"
										>
											{navlink?.tabName}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<IconButton
							sx={{ display: { xs: 'flex', md: 'none' } }}
							disableRipple
						>
							<img className="w-52" src={Logo} alt="logo" />
						</IconButton>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							{navlinks.map((navlink) => (
								<Button
									className={clsx(
										theme === 'light' && AppStyles.PrimaryText,
										styles.NavLinks
									)}
									key={navlink?.index?.toString()}
									onClick={() => navigate(navlink?.location)}
									sx={{ my: 2, display: 'block' }}
								>
									{navlink?.tabName}
								</Button>
							))}
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip
								title={`Toggle to ${theme === 'light' ? 'dark' : 'light'} mode`}
							>
								<IconButton size="large" onClick={toggleColorMode}>
									{theme === 'light' ? <Brightness4 /> : <Brightness7 />}
								</IconButton>
							</Tooltip>
							<Tooltip title="Open settings">
								<IconButton onClick={(event) => openMenu(SETTINGS, event)}>
									<AccountCircleOutlined className={styles.UserIcon} />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={settingsAnchor}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(settingsAnchor)}
								onClose={() => closeMenu(SETTINGS)}
							>
								{settings.map((setting) => (
									<MenuItem
										className={styles.SettingsMenu}
										key={setting?.index?.toString()}
										onClick={() => handleSettingsMenuClick(setting)}
									>
										<ListItemIcon>
											{renderSettingsIcon(setting?.icon)}
										</ListItemIcon>
										<ListItemText
											className={clsx(
												theme === 'light' && AppStyles.PrimaryText
											)}
										>
											{setting?.tabName}
										</ListItemText>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<Dialog
				sx={{
					'& .MuiPaper-root': {
						padding: '20px',
					},
				}}
				fullWidth
				maxWidth="sm"
				open={auth.enabled}
				onClose={() => setAuth({ ...auth, enabled: false })}
			>
				<DialogTitle className={clsx('text-center', styles.AuthDialogTitle)}>
					{auth.type}
				</DialogTitle>
				<DialogContent>
					{auth.type === LOGIN ? (
						<Login theme={theme} />
					) : (
						<Register theme={theme} />
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}
export default Header;
