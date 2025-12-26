'use client';

import Link from 'next/link';
import { X, FileText, Users, LogOut } from 'lucide-react';
import { useRef } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { MobileMenuProps } from '@/types/headers.types';
import { MobileSearchBar } from './SearchBar';

export function MobileMenu({ open, onClose, user }: MobileMenuProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	useClickOutside(ref, onClose);

	if (!open) return null;

	const handleSignout = async () => {
		console.log('signed out');
	};

	return (
		<div className="fixed inset-0 z-50 lg:hidden">
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/30" />

			{/* Panel */}
			<aside
				ref={ref}
				role="dialog"
				aria-modal="true"
				className="absolute top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-xl p-4 flex flex-col gap-6"
				onKeyDown={(e) => e.key === 'Escape' && onClose()}
				tabIndex={-1}
			>
				{/* Header */}
				<div className="flex items-center justify-between">
					<span className="font-bold text-lg">Menu</span>
					<button onClick={onClose} aria-label="Close menu">
						<X size={20} />
					</button>
				</div>

				{/* Search (mobile) */}
				<MobileSearchBar />

				{/* Navigation */}
				<nav className="flex flex-col gap-2">
					<Link
						href="/dashboard"
						onClick={onClose}
						className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100"
					>
						<FileText size={18} /> My Documents
					</Link>

					<Link
						href="/dashboard/shared"
						onClick={onClose}
						className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100"
					>
						<Users size={18} /> Shared With Me
					</Link>
				</nav>

				<div className="mt-auto border-t pt-4">
					{user ? (
						<button
							className="flex items-center gap-3 text-red-600"
							onClick={handleSignout}
						>
							<LogOut size={18} /> Sign Out
						</button>
					) : (
						<div className="flex flex-col gap-2">
							<Link
								href="/auth/signin"
								onClick={onClose}
								className="text-center p-2 rounded-lg border"
							>
								Sign In
							</Link>
							<Link
								href="/auth/signup"
								onClick={onClose}
								className="text-center p-2 rounded-lg bg-indigo-600 text-white"
							>
								Sign Up
							</Link>
						</div>
					)}
				</div>
			</aside>
		</div>
	);
}
