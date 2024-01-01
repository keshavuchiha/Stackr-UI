import React from 'react';
import { Backdrop, CircularProgress, Paper } from '@mui/material';
import styles from './LoadingPage.module.scss';

interface Props {
	open: boolean;
}

function LoadingPage(props: Props) {
	const { open } = props;
	return (
		<Backdrop open={open} sx={{ zIndex: 1301 }}>
			<Paper elevation={0} className={styles.PageWrapper}>
				<CircularProgress thickness={7} />
				<div className={styles.Header}>
					This will take a few more seconds...
				</div>
				<div className={styles.Caption}>
					Please wait as we load the page for you.
				</div>
			</Paper>
		</Backdrop>
	);
}

export default LoadingPage;
