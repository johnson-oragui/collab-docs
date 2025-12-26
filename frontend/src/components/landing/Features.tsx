'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, WifiOff, Users, History, Cpu } from 'lucide-react';

const features = [
	{
		title: 'Real-Time Collaboration',
		description:
			'Experience sub-50ms latency with live cursors and typing indicators. Built on high-performance WebSockets.',
		icon: <Users className="text-indigo-500" size={24} />,
		className: 'md:col-span-2',
		bg: 'bg-indigo-500/5',
	},
	{
		title: 'Offline-First',
		description:
			"Keep editing even without an internet connection. Changes sync automatically when you're back.",
		icon: <WifiOff className="text-amber-500" size={24} />,
		className: 'md:col-span-1',
		bg: 'bg-amber-500/5',
	},
	{
		title: 'Conflict-Free Sync',
		description:
			'Powered by Yjs CRDTs to ensure your data never conflicts, no matter how many people are editing.',
		icon: <Cpu className="text-emerald-500" size={24} />,
		className: 'md:col-span-1',
		bg: 'bg-emerald-500/5',
	},
	{
		title: 'Version History',
		description:
			'Travel back in time. View every change and restore previous versions with a single click.',
		icon: <History className="text-purple-500" size={24} />,
		className: 'md:col-span-2',
		bg: 'bg-purple-500/5',
	},
];

export default function Features() {
	return (
		<section id="features" className="py-24 bg-white dark:bg-slate-800">
			<div className="container mx-auto px-6">
				{/* Header Logic */}
				<div className="text-center max-w-3xl mx-auto mb-16">
					<h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-3">
						Powerful Infrastructure
					</h2>
					<p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
						Engineered for the Modern Team
					</p>
					<p className="text-lg text-slate-600 dark:text-slate-400">
						Most editors struggle with sync. We built ours from the ground up
						using distributed systems principles to ensure your work is always
						safe and synchronized.
					</p>
				</div>

				{/* Bento Grid Layout */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className={`group p-8 rounded-3xl border border-slate-200 dark:border-slate-800 transition-all hover:shadow-xl hover:-translate-y-1 ${feature.className} ${feature.bg}`}
						>
							<div className="mb-4 inline-block p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
								{feature.icon}
							</div>
							<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
								{feature.title}
							</h3>
							<p className="text-slate-600 dark:text-slate-400 leading-relaxed">
								{feature.description}
							</p>

							{/* Animated Detail for "Senior" feel */}
							<div className="mt-6 flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
								Learn how it works <Zap size={14} />
							</div>
						</motion.div>
					))}
				</div>

				{/* Technical Callout */}
				<div className="mt-16 p-8 rounded-3xl bg-slate-900 text-center">
					<div className="flex flex-wrap justify-center gap-8 md:gap-16">
						<div className="flex flex-col items-center">
							<span className="text-3xl font-bold text-white mb-1">99.9%</span>
							<span className="text-slate-400 text-sm">Uptime</span>
						</div>
						<div className="flex flex-col items-center">
							<span className="text-3xl font-bold text-white mb-1">
								&lt;50ms
							</span>
							<span className="text-slate-400 text-sm">Sync Latency</span>
						</div>
						<div className="flex flex-col items-center">
							<span className="text-3xl font-bold text-white mb-1">0</span>
							<span className="text-slate-400 text-sm">Merge Conflicts</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
