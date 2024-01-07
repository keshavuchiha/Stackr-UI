import { toast } from 'react-toastify';

interface Props {
	message: string;
	type: 'info' | 'success' | 'warning' | 'error' | undefined | null;
}

export default function sendToast(props: Props) {
	if (!props.type) {
		toast(props.message, {
			position: 'bottom-left',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	} else {
		toast[props.type](props.message, {
			position: 'bottom-left',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}
}
