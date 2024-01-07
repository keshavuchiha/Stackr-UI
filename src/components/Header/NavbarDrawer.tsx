import React from 'react';
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import {
	ExploreOutlined,
	LeaderboardOutlined,
	ListAltRounded,
	MessageOutlined,
} from '@mui/icons-material';
import { navlinks } from '../../constants/navbar';
import { useNavigate } from 'react-router-dom';

const renderSettingsIcon = (iconName: string) => {
	switch (iconName) {
		case 'ExploreOutlined':
			return <ExploreOutlined />;
		case 'ListAltRounded':
			return <ListAltRounded />;
		case 'MessageOutlined':
			return <MessageOutlined />;
		case 'LeaderboardOutlined':
			return <LeaderboardOutlined />;
		default:
			return null;
	}
};

interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavbarDrawer(props: Props) {
	const { open, setOpen } = props;
	const navigate = useNavigate();

	const toggleDrawer = (
		open: boolean,
		event: React.KeyboardEvent | React.MouseEvent | null
	) => {
		if (
			event?.type === 'keydown' &&
			((event as React.KeyboardEvent)?.key === 'Tab' ||
				(event as React.KeyboardEvent)?.key === 'Shift')
		) {
			return;
		}
		setOpen(open);
	};

	return (
		<Drawer
			anchor={'bottom'}
			open={open}
			onClose={() => toggleDrawer(false, null)}
		>
			<Box
				sx={{ width: 'auto' }}
				role="presentation"
				onClick={(e) => toggleDrawer(false, e)}
				onKeyDown={(e) => toggleDrawer(false, e)}
			>
				<List>
					{navlinks.map((link) => (
						<ListItem key={link.index.toString()} disablePadding>
							<ListItemButton onClick={() => navigate(link.location)}>
								<ListItemIcon>{renderSettingsIcon(link.icon)}</ListItemIcon>
								<ListItemText primary={link.tabName} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	);
}

export default NavbarDrawer;
