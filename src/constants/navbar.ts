export const navlinks = [
	{ index: 1, tabName: 'Explore', location: '/', component: '-', icon: '-' },
	{
		index: 2,
		tabName: 'Problems',
		location: '/problems',
		component: '-',
		icon: '-',
	},
	{
		index: 3,
		tabName: 'Contest',
		location: '/contest',
		component: '-',
		icon: '-',
	},
	{
		index: 4,
		tabName: 'Discuss',
		location: '/discuss',
		component: '-',
		icon: '-',
	},
];

export const authenticatedSettings = [
	{
		index: 1,
		tabName: 'Profile',
		location: '/users',
		component: '-',
		icon: '-',
	},
	{
		index: 2,
		tabName: 'Bookmarks',
		location: '/users/bookmarks',
		component: '-',
		icon: '-',
	},
	{
		index: 3,
		tabName: 'Submissions',
		location: '/users/submissions',
		component: '-',
		icon: '-',
	},
	{
		index: 4,
		tabName: 'Logout',
		location: '-',
		component: 'Logout',
		icon: '-',
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
