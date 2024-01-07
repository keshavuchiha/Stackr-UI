/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { baseURL } from '../../constants/auth';
import {
	getCookie,
	isCookiePresent,
	removeCookie,
	setCookie,
} from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../store/reducers/ApplicationReducer';

const sendGenericErrorToast = async (dispatch: any) => {
	await dispatch(
		setToastMessage({
			toastMessage: 'Something went wrong, please try again',
			toastType: 'error',
		})
	);
};

const apiClient = axios.create({ baseURL });

const AxiosInterceptor = ({ children }: any) => {
	const dispatch = useDispatch();
	apiClient.interceptors.request.use(
		(config) => {
			if (isCookiePresent('token')) {
				config.headers.Authorization = getCookie('token');
			}
			return config;
		},
		async () => {
			await sendGenericErrorToast(dispatch);
		}
	);

	apiClient.interceptors.response.use(
		async (response) => {
			if (!response) return response;
			const authorization: string = response?.headers?.authorization;
			if (authorization) {
				setCookie('token', authorization);
				setCookie('username', response?.data?.data?.username);
			}
			if (response?.data?.error?.code === 401) {
				removeCookie('token');
				removeCookie('username');
			}
			if (response.data?.error?.message) {
				await dispatch(
					setToastMessage({
						toastMessage: response?.data?.error?.message,
						toastType: 'error',
					})
				);
			}
			return response;
		},
		async () => {
			await sendGenericErrorToast(dispatch);
		}
	);

	return children;
};

export { AxiosInterceptor };
export default apiClient;
