export const navlinks = [
	{ index: 1, tabName: 'Explore', location: '/', component: '-' },
	{ index: 2, tabName: 'Problems', location: '/problems', component: '-' },
	{ index: 3, tabName: 'Contest', location: '/contest', component: '-' },
	{ index: 4, tabName: 'Discuss', location: '/discuss', component: '-' },
];

export const authenticatedSettings = [
	{ index: 1, tabName: 'Profile', location: '/users', component: '-' },
	{
		index: 2,
		tabName: 'Bookmarks',
		location: '/users/bookmarks',
		component: '-',
	},
	{
		index: 3,
		tabName: 'Submissions',
		location: '/users/submissions',
		component: '-',
	},
	{ index: 4, tabName: 'Logout', location: '-', component: 'Logout' },
];

export const settings = [
	{ index: 1, tabName: 'Login', location: '-', component: 'Login' },
	{ index: 2, tabName: 'Sign up', location: '-', component: 'SignUp' },
];
