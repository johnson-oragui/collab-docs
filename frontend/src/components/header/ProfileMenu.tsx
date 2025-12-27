'use client';

import { useRef, useState } from 'react';
import { ChevronDown, Settings, LogOut } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { ProfileMenuProps } from '@/types/headers.types';

export function ProfileMenu({ user }: ProfileMenuProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside(ref, () => setOpen(false));

	return (
		<div ref={ref} className="relative">
			<button
				onClick={() => setOpen(!open)}
				aria-expanded={open}
				aria-haspopup="menu"
				className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100"
			>
				<div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center font-medium">
					{user.name.charAt(0)}
				</div>
				<ChevronDown
					size={14}
					className={`transition-transform ${open ? 'rotate-180' : ''}`}
				/>
			</button>

			{open && (
				<div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-xl py-2 z-50">
					<div className="px-4 py-2 border-b">
						<p className="text-sm font-semibold truncate">{user.name}</p>
						<p className="text-xs text-slate-500 truncate">{user.email}</p>
					</div>
					<button className="menu-item">
						<Settings size={16} /> Settings
					</button>
					<button className="menu-item text-red-600">
						<LogOut size={16} /> Sign Out
					</button>
				</div>
			)}
		</div>
	);
}
