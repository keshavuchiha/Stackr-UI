import React from 'react';
import { Button, PaletteMode, TextField } from '@mui/material';
import axios from 'axios';
import { SERVER } from '../../constants/auth';
import Cookies from 'universal-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import styles from '../Header/Header.module.scss';

interface Props {
	theme: PaletteMode;
}

function Login(props: Props) {
	const textColor =
		props.theme === 'light' ? 'text-[#1976D2]' : 'text-[#90CAF9]';
	const formik = useFormik({
		initialValues: {
			Email: '',
			Password: '',
		},
		validationSchema: Yup.object({
			Email: Yup.string()
				.email('Invalid email address.')
				.required('No email provided.'),
			Password: Yup.string().required('No password provided.'),
		}),
		onSubmit: (values) => {
			console.log(JSON.stringify(values, null, 2));
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} id="login-form">
			<div className="my-4">
				<TextField
					fullWidth
					id="Email"
					label="Email"
					variant="standard"
					{...formik.getFieldProps('Email')}
					error={formik.touched.Email && formik.errors.Email ? true : false}
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
					variant="standard"
					{...formik.getFieldProps('Password')}
					error={
						formik.touched.Password && formik.errors.Password ? true : false
					}
					helperText={
						formik.touched.Password && formik.errors.Password
							? formik.errors.Password
							: null
					}
				/>
			</div>
			<div className="mt-6">
				New to Stackr?{' '}
				<span
					className={clsx(textColor, 'cursor-pointer', styles['Font-Medium'])}
				>
					Create
				</span>{' '}
				an account here
			</div>
			<div className="mt-1">
				Don't remember your password?{' '}
				<span
					className={clsx(textColor, 'cursor-pointer', styles['Font-Medium'])}
				>
					Reset
				</span>{' '}
				it here
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

export default Login;
