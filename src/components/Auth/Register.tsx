import React from 'react';
import { Button, TextField, PaletteMode } from '@mui/material';
import { PASSWORD_RULES } from '../../constants/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import styles from '../Header/Header.module.scss';
import { useDispatch } from 'react-redux';
import {
	setApplicationLoading,
	setToastMessage,
} from '../../store/reducers/ApplicationReducer';
import { registerUser } from '../../store/actions/AuthActions';
import { useNavigate } from 'react-router-dom';

interface Props {
	theme: PaletteMode;
	closeDialog: () => void;
	logoutUser: () => void;
}

function Register(props: Readonly<Props>) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const textColor =
		props.theme === 'light' ? 'text-[#1976D2]' : 'text-[#90CAF9]';
	const formik = useFormik({
		initialValues: {
			Name: '',
			Email: '',
			Password: '',
			ConfirmPassword: '',
		},
		validationSchema: Yup.object({
			Name: Yup.string()
				.min(5, 'Must be greater than 5 characters.')
				.max(50, 'Must be less than 50 characters.')
				.required('No name provided.'),
			Email: Yup.string()
				.email('Invalid email address.')
				.required('No email provided.'),
			Password: Yup.string()
				.matches(PASSWORD_RULES, {
					message:
						'Please create a stronger password. ' +
						'Password must contain min 5 characters, ' +
						'1 uppercase character, 1 lowercase character ' +
						'and 1 numeric digit',
				})
				.required('No password provided.'),
			ConfirmPassword: Yup.string().oneOf(
				[Yup.ref('Password'), ''],
				'Passwords must match.'
			),
		}),
		onSubmit: (values) => {
			props.logoutUser();
			const body = {
				username: values.Name,
				email: values.Email,
				password: values.Password,
			};
			props.closeDialog();
			dispatch(setApplicationLoading(true));
			registerUser(body)
				.then((res) => {
					if (res?.data?.data) {
						dispatch(
							setToastMessage({
								toastMessage:
									'The account has been created successfully, welcome to Stackr',
								toastType: 'success',
							})
						);
						navigate('/');
					}
				})
				.finally(() => dispatch(setApplicationLoading(false)));
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} id="login-form">
			<div className="my-4">
				<TextField
					fullWidth
					id="Name"
					label="Name"
					variant="standard"
					{...formik.getFieldProps('Name')}
					error={!!(formik.touched.Name && formik.errors.Name)}
					helperText={
						formik.touched.Name && formik.errors.Name
							? formik.errors.Name
							: null
					}
				/>
			</div>
			<div className="my-4">
				<TextField
					fullWidth
					id="Email"
					label="Email"
					type="email"
					variant="standard"
					{...formik.getFieldProps('Email')}
					error={!!(formik.touched.Email && formik.errors.Email)}
					helperText={
						formik.touched.Email && formik.errors.Email
							? formik.errors.Email
							: null
					}
				/>
			</div>
			<div className="my-4">
				<TextField
					fullWidth
					id="Password"
					label="Password"
					type="password"
					variant="standard"
					{...formik.getFieldProps('Password')}
					error={!!(formik.touched.Password && formik.errors.Password)}
					helperText={
						formik.touched.Password && formik.errors.Password
							? formik.errors.Password
							: null
					}
				/>
			</div>
			<div className="my-4">
				<TextField
					fullWidth
					id="ConfirmPassword"
					label="Confirm Password"
					type="password"
					variant="standard"
					{...formik.getFieldProps('ConfirmPassword')}
					error={
						!!(formik.touched.ConfirmPassword && formik.errors.ConfirmPassword)
					}
					helperText={
						formik.touched.ConfirmPassword && formik.errors.ConfirmPassword
							? formik.errors.ConfirmPassword
							: null
					}
				/>
			</div>
			<div className="mt-6">
				Already have an account?{' '}
				<span
					className={clsx(textColor, 'cursor-pointer', styles['Font-Medium'])}
				>
					Login
				</span>{' '}
				here
			</div>
			<div className="my-4">
				<Button
					className="w-full"
					size="large"
					variant="contained"
					type="submit"
				>
					Submit
				</Button>
			</div>
		</form>
	);
}

export default Register;
