import React from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Avatar,
	Button,
	Tooltip,
	MenuItem,
	PaletteMode,
} from '@mui/material';
import {
	Menu as MenuIcon,
	Brightness4,
	Brightness7,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { navlinks } from '../../constants/navbar';
import Logo from '../../resources/logo.png';
import AppStyles from '../../styles/App.module.scss';
import styles from './Header.module.scss';
import clsx from 'clsx';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface Props {
	theme: PaletteMode;
	toggleColorMode: () => void;
}

function ResponsiveAppBar(props: Props) {
	const { theme, toggleColorMode } = props;
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
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
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{navlinks.map((navlink) => (
								<MenuItem
									key={navlink?.index?.toString()}
									onClick={handleCloseNavMenu}
								>
									<Typography
										className={clsx(theme === 'light' && AppStyles.PrimaryText)}
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
								onClick={() => navigate('/abcd')}
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
							<IconButton onClick={toggleColorMode}>
								{theme === 'light' ? <Brightness4 /> : <Brightness7 />}
							</IconButton>
						</Tooltip>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography
										className={clsx(theme === 'light' && AppStyles.PrimaryText)}
										textAlign="center"
									>
										{setting}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
