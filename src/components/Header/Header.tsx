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
	ExitToApp,
	BookmarksOutlined,
	SaveOutlined,
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
	authenticatedSettings,
	LOGOUT,
} from '../../constants/navbar';
import Logo from '../../resources/logo.png';
import AppStyles from '../../styles/App.module.scss';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { isCookiePresent, removeCookie } from '../../utils/auth';
import { setToastMessage } from '../../store/reducers/ApplicationReducer';
import { useDispatch } from 'react-redux';
import NavbarDrawer from './NavbarDrawer';

const renderSettingsIcon = (iconName: string) => {
	switch (iconName) {
		case 'Person':
			return <Person />;
		case 'PersonAdd':
			return <PersonAdd />;
		case 'ExitToApp':
			return <ExitToApp />;
		case 'AccountCircleOutlined':
			return <AccountCircleOutlined />;
		case 'BookmarksOutlined':
			return <BookmarksOutlined />;
		case 'SaveOutlined':
			return <SaveOutlined />;
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

function Header(props: Readonly<Props>) {
	const { theme, toggleColorMode } = props;
	const navigate = useNavigate();
	const [navbarAnchor, setNavbarAnchor] = useState<boolean>(false);
	const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(
		null
	);
	const [auth, setAuth] = useState<AuthMenuProps>({
		enabled: false,
		type: LOGIN,
	});
	const dispatch = useDispatch();

	const logoutUser = () => {
		removeCookie('token');
		removeCookie('username');
		dispatch(
			setToastMessage({
				toastMessage: 'You have successfully logged out',
				toastType: 'success',
			})
		);
	};

	const renderComponent = (component: string) => {
		switch (component) {
			case LOGIN:
			case REGISTER:
				return setAuth({ enabled: true, type: component });
			case LOGOUT:
				return logoutUser();
			default:
				return;
		}
	};

	const openMenu = (
		menuName: 'Settings' | 'Navbar',
		event: React.MouseEvent<HTMLElement>
	) => {
		if (menuName === SETTINGS) setSettingsAnchor(event.currentTarget);
		else setNavbarAnchor(true);
	};

	const closeMenu = (menuName: string) => {
		if (menuName === SETTINGS) setSettingsAnchor(null);
		else setNavbarAnchor(false);
	};

	const handleSettingsMenuClick = (props: SettingItemProps) => {
		closeMenu(SETTINGS);
		renderComponent(props.component);
	};

	const handleAuthModalClose = () => {
		setAuth({ ...auth, enabled: false });
	};

	const getNavbarSettingsArray = () =>
		isCookiePresent('token') ? authenticatedSettings : settings;

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
							<NavbarDrawer open={navbarAnchor} setOpen={setNavbarAnchor} />
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
								{getNavbarSettingsArray().map((setting) => (
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
				onClose={handleAuthModalClose}
			>
				<DialogTitle className={clsx('text-center', styles.AuthDialogTitle)}>
					{auth.type}
				</DialogTitle>
				<DialogContent>
					{auth.type === LOGIN ? (
						<Login
							theme={theme}
							closeDialog={handleAuthModalClose}
							logoutUser={logoutUser}
						/>
					) : (
						<Register
							theme={theme}
							closeDialog={handleAuthModalClose}
							logoutUser={logoutUser}
						/>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}
export default Header;
