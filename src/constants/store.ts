export interface StateProps {
	application: {
		isApplicationLoading: boolean;
		toastMessage: string;
		toastType: 'info' | 'success' | 'warning' | 'error' | undefined | null;
	};
}
