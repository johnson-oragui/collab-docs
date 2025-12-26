'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Github, Twitter, Linkedin, Mail, Globe } from 'lucide-react';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	const footerSections = [
		{
			title: 'Product',
			links: [
				{ label: 'Features', href: '#features' },
				{ label: 'Security', href: '#security' },
				{ label: 'Roadmap', href: '#roadmap' },
			],
		},
		{
			title: 'Resources',
			links: [{ label: 'Community', href: '/community' }],
		},
		{
			title: 'Company',
			links: [
				{ label: 'About Us', href: '/about' },
				{ label: 'Careers', href: '/careers' },
				{ label: 'Privacy Policy', href: '/privacy' },
				{ label: 'Terms of Service', href: '/terms' },
			],
		},
	];

	return (
		<footer className="bg-white border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800">
			<div className="container mx-auto px-6 pt-16 pb-8">
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
					{/* Brand Column */}
					<div className="col-span-2">
						<Link href="/" className="flex items-center gap-2 mb-4 group">
							<div className="bg-indigo-600 p-1.5 rounded-lg">
								<FileText className="text-white" size={20} />
							</div>
							<span className="font-bold text-xl tracking-tight dark:text-white">
								CollabDocs
							</span>
						</Link>
						<p className="text-slate-500 dark:text-slate-400 max-w-xs mb-6 text-sm leading-relaxed">
							The next-generation collaborative editor. Built for speed, offline
							reliability, and seamless team synchronization.
						</p>
						<div className="flex gap-4">
							<a
								href="#"
								className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors"
							>
								<Github size={18} />
							</a>
							<a
								href="#"
								className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors"
							>
								<Twitter size={18} />
							</a>
							<a
								href="#"
								className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors"
							>
								<Linkedin size={18} />
							</a>
						</div>
					</div>

					{/* Nav Sections */}
					{footerSections.map((section) => (
						<div key={section.title} className="col-span-1">
							<h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
								{section.title}
							</h3>
							<ul className="space-y-3">
								{section.links.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-slate-100 dark:border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
					<div className="flex items-center gap-6">
						<p className="text-xs text-slate-500 dark:text-slate-500">
							© {currentYear} CollabDocs Inc. All rights reserved.
						</p>
						<div className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer hover:text-indigo-600">
							<Globe size={14} />
							<span>English (US)</span>
						</div>
					</div>

					<div className="flex items-center gap-6">
						<div className="flex items-center gap-1 text-xs text-slate-400">
							<div className="w-2 h-2 rounded-full bg-green-500" />
							All Systems Operational
						</div>
						<a
							href="mailto:support@collabdocs.com"
							className="flex items-center gap-2 text-xs text-slate-500 hover:text-indigo-600"
						>
							<Mail size={14} />
							Support
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
