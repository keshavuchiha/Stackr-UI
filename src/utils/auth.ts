import Cookies from 'universal-cookie';

export const setCookie = (name: string, value: string) => {
	if (!name) return;
	const cookies = new Cookies();
	cookies.set(name, value);
};

export const getCookie = (name: string): string => {
	if (!name) return '';
	const cookies = new Cookies();
	return cookies.get(name);
};

export const isCookiePresent = (name: string): boolean => {
	if (!name) return false;
	const cookies = new Cookies();
	return cookies.get(name)?.length > 0;
};

export const removeCookie = (name: string) => {
	if (!name) return;
	const cookies = new Cookies();
	cookies.remove(name);
};
