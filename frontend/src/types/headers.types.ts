import { UserT } from './users.types';

export type MobileMenuProps = {
	open: boolean;
	onClose: () => void;
	user?: UserT | null;
};

export interface ProfileMenuProps {
	user: UserT;
}
