'use client';

import Link from 'next/link';
import { Menu, FileText, Bell } from 'lucide-react';
import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { ProfileMenu } from './ProfileMenu';
import { MobileMenu } from './MobileMenu';
import { UserT } from '@/types/users.types';

export default function Header({ user }: { user?: UserT }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const isSignedIn = !!user;

	return (
		<header className="sticky top-0 z-40 bg-white border-b">
			<div className="h-16 px-4 flex items-center justify-between gap-4">
				{/* Left */}
				<div className="flex items-center gap-3">
					<button
						className="lg:hidden"
						aria-label="Open menu"
						onClick={() => setMenuOpen(true)}
					>
						<Menu />
					</button>

					<Link href="/dashboard" className="flex items-center gap-2">
						<FileText />
						<span className="font-bold hidden sm:block">CollabDocs</span>
					</Link>
				</div>

				{/* Center */}
				<SearchBar />

				{/* Right */}
				<div className="hidden md:flex items-center gap-3">
					{isSignedIn && <Bell />}
					{isSignedIn ? (
						<ProfileMenu user={user} />
					) : (
						<Link href="/auth/signin">Sign in</Link>
					)}
				</div>
			</div>

			{/* Mobile Menu */}
			<MobileMenu
				open={menuOpen}
				onClose={() => setMenuOpen(false)}
				user={user}
			/>
		</header>
	);
}
