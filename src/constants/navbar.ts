export const navlinks = [
	{
		index: 1,
		tabName: 'Explore',
		location: '/',
		component: '-',
		icon: 'ExploreOutlined',
	},
	{
		index: 2,
		tabName: 'Problems',
		location: '/problems',
		component: '-',
		icon: 'ListAltRounded',
	},
	{
		index: 3,
		tabName: 'Contest',
		location: '/contest',
		component: '-',
		icon: 'LeaderboardOutlined',
	},
	{
		index: 4,
		tabName: 'Discuss',
		location: '/discuss',
		component: '-',
		icon: 'MessageOutlined',
	},
];

export const authenticatedSettings = [
	{
		index: 1,
		tabName: 'Profile',
		location: '/users',
		component: '-',
		icon: 'AccountCircleOutlined',
	},
	{
		index: 2,
		tabName: 'Bookmarks',
		location: '/users/bookmarks',
		component: '-',
		icon: 'BookmarksOutlined',
	},
	{
		index: 3,
		tabName: 'Submissions',
		location: '/users/submissions',
		component: '-',
		icon: 'SaveOutlined',
	},
	{
		index: 4,
		tabName: 'Logout',
		location: '-',
		component: 'Logout',
		icon: 'ExitToApp',
	},
];

export const settings = [
	{
		index: 1,
		tabName: 'Login',
		location: '-',
		component: 'Login',
		icon: 'Person',
	},
	{
		index: 2,
		tabName: 'Sign up',
		location: '-',
		component: 'Register',
		icon: 'PersonAdd',
	},
];

export const SETTINGS = 'Settings';
export const NAVBAR = 'Navbar';
export const LOGIN = 'Login';
export const REGISTER = 'Register';
export const LOGOUT = 'Logout';
