import apiClient from '../../features/Auth/apiClient';

interface RegisterProps {
	username: string;
	email: string;
	password: string;
}

interface LoginProps {
	email: string;
	password: string;
}

export const loginUser = (body: LoginProps) =>
	apiClient.post('/v1/login', body);

export const registerUser = (body: RegisterProps) =>
	apiClient.post('/v1/register', body);

export const checkAuth = () => apiClient.get('/v1/auth');
