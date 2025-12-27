'use client';

import React, { useState } from 'react';
import {
	LayoutDashboard,
	FileText,
	Users,
	Settings,
	Search,
	Bell,
	Menu,
	LogOut,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardShell({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const navItems = [
		{
			icon: <LayoutDashboard size={20} />,
			label: 'Overview',
			href: '/dashboard',
			active: true,
		},
		{
			icon: <FileText size={20} />,
			label: 'My Documents',
			href: '/dashboard',
		},
		{
			icon: <Users size={20} />,
			label: 'Shared with me',
			href: '/dashboard/shared',
		},
		{
			icon: <Settings size={20} />,
			label: 'Settings',
			href: '/dashboard/settings',
		},
	];

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
			{/* Mobile Sidebar Overlay */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
        transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
			>
				<div className="h-full flex flex-col p-6">
					<a href="/dashboard">
						<div className="flex items-center gap-3 mb-10 px-2">
							<div className="bg-indigo-600 p-1.5 rounded-lg text-white">
								<Image
									alt="Logo"
									src={'/collabDocs-logo-main.png'}
									width={189}
									height={90}
								/>
							</div>
							<span className="font-bold text-xl dark:text-white">
								CollabDocs
							</span>
						</div>
					</a>

					<nav className="flex-1 space-y-1">
						{navItems.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
									item.active
										? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
										: 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
								}`}
							>
								{item.icon}
								{item.label}
							</Link>
						))}
					</nav>

					<div className="pt-6 border-t border-slate-100 dark:border-slate-800">
						<button className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors">
							<LogOut size={20} />
							Sign Out
						</button>
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 flex flex-col min-w-0 overflow-hidden">
				{/* Top Header */}
				<header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8">
					<button
						className="md:hidden p-2 text-slate-600"
						onClick={() => setSidebarOpen(true)}
					>
						<Menu size={24} />
					</button>

					<div className="flex-1 max-w-xl mx-4 hidden sm:block">
						<div className="relative">
							<Search
								className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
								size={18}
							/>
							<input
								type="text"
								placeholder="Quick search documents..."
								className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
							/>
						</div>
					</div>

					<div className="flex items-center gap-2 md:gap-4">
						<button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
							<Bell size={20} />
							<span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
						</button>
						<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
							JD
						</div>
					</div>
				</header>

				{/* Content Area */}
				<div className="flex-1 overflow-y-auto p-4 md:p-8">{children}</div>
			</main>
		</div>
	);
}
