'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Github,
	MessageSquare,
	Code2,
	Globe,
	Users2,
	Heart,
	ExternalLink,
} from 'lucide-react';

const communityStats = [
	{ label: 'Community Members', value: '12k+', icon: <Users2 size={20} /> },
	{ label: 'OSS Contributors', value: '450+', icon: <Code2 size={20} /> },
	{ label: 'GitHub Stars', value: '8.2k', icon: <Github size={20} /> },
];

const channels = [
	{
		title: 'Discord Server',
		description:
			'Get real-time support from the core team and chat with other developers building on CollabDocs.',
		icon: <MessageSquare className="text-indigo-500" />,
		stats: '4,203 online',
		link: '#',
	},
	{
		title: 'GitHub Discussions',
		description:
			'Submit feature requests, report bugs, and contribute to our RFCs (Request for Comments).',
		icon: <Github className="text-slate-900 dark:text-white" />,
		stats: '12 active RFCs',
		link: '#',
	},
	{
		title: 'Community Forum',
		description:
			'Search through years of technical deep dives, troubleshooting guides, and project showcases.',
		icon: <Globe className="text-emerald-500" />,
		stats: '20k+ posts',
		link: '#',
	},
];

export default function CommunityContent() {
	return (
		<div className="max-w-6xl mx-auto py-16 px-6">
			{/* Stats Bar */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
				{communityStats.map((stat, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className="flex flex-col items-center p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-center"
					>
						<div className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 mb-4 shadow-sm">
							{stat.icon}
						</div>
						<div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
							{stat.value}
						</div>
						<div className="text-sm text-slate-500 font-medium uppercase tracking-wider">
							{stat.label}
						</div>
					</motion.div>
				))}
			</div>

			{/* Engagement Channels */}
			<div className="grid md:grid-cols-3 gap-8 mb-24">
				{channels.map((channel, i) => (
					<motion.a
						key={i}
						href={channel.link}
						whileHover={{ y: -8 }}
						className="group p-8 rounded-4xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all flex flex-col justify-between"
					>
						<div>
							<div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 w-fit group-hover:bg-indigo-500/10 transition-colors">
								{React.cloneElement(
									channel.icon as React.ReactElement<{ size?: number }>,
									{
										size: 32,
									},
								)}
							</div>
							<h3 className="text-xl font-bold mb-3 dark:text-white">
								{channel.title}
							</h3>
							<p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
								{channel.description}
							</p>
						</div>
						<div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-900">
							<span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter">
								{channel.stats}
							</span>
							<ExternalLink
								size={16}
								className="text-slate-300 group-hover:text-indigo-500"
							/>
						</div>
					</motion.a>
				))}
			</div>

			{/* Community Spotlight placeholder */}
			<div className="bg-indigo-600 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
				<div className="absolute top-0 right-0 p-12 opacity-10">
					<Heart size={200} strokeWidth={1} />
				</div>
				<div className="max-w-2xl relative z-10">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						Built by you, for everyone.
					</h2>
					<p className="text-indigo-100 text-lg mb-8 leading-relaxed">
						CollabDocs is an open-core project. We believe the future of editing
						belongs to the community. Whether you&apos;re writing documentation,
						building a plugin, or fixing a bug—your contribution moves the
						needle.
					</p>
					<button className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors inline-flex items-center gap-2">
						Explore the OSS Repository <Github size={18} />
					</button>
				</div>
			</div>
		</div>
	);
}
