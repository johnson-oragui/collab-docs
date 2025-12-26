'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Rocket, Milestone } from 'lucide-react';

const roadmapItems = [
	{
		phase: 'Phase 1: Foundation (Live)',
		title: 'Core Sync Engine',
		description:
			'Deployment of Yjs CRDT implementation, WebSocket gateway via NestJS, and responsive block editor.',
		status: 'completed',
		icon: <CheckCircle2 className="text-emerald-500" size={24} />,
	},
	{
		phase: 'Phase 2: Reliability (Live)',
		title: 'Offline-First Persistence',
		description:
			'IndexedDB integration for local caching and automatic rehydration logic on reconnection.',
		status: 'completed',
		icon: <CheckCircle2 className="text-emerald-500" size={24} />,
	},
	{
		phase: 'Phase 3: Collaboration (In Progress)',
		title: 'Presence & Awareness',
		description:
			'Fine-grained cursor tracking, typing indicators, and live avatar stacks for active collaborators.',
		status: 'current',
		icon: <Clock className="text-indigo-500 animate-pulse" size={24} />,
	},
	{
		phase: 'Phase 4: Intelligence (Upcoming)',
		title: 'Version History & Snapshots',
		description:
			'Point-in-time recovery and document diffing to track changes across multiple authors.',
		status: 'upcoming',
		icon: <Circle className="text-slate-400" size={24} />,
	},
	{
		phase: 'Phase 5: Enterprise (Planned)',
		title: 'E2E Encryption & RBAC',
		description:
			'Client-side encryption keys and advanced Role-Based Access Control for secure team management.',
		status: 'upcoming',
		icon: <Milestone className="text-slate-400" size={24} />,
	},
];

export default function Roadmap() {
	return (
		<section id="roadmap" className="py-24 bg-slate-50 dark:bg-slate-700">
			<div className="container mx-auto px-6">
				{/* Header */}
				<div className="text-center max-w-3xl mx-auto mb-20">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4"
					>
						<Rocket size={14} /> Our Journey
					</motion.div>
					<h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
						Building the Future of Collaboration
					</h2>
					<p className="text-lg text-slate-600 dark:text-slate-400">
						Our roadmap focuses on scaling distributed state management while
						maintaining zero-latency user experiences.
					</p>
				</div>

				{/* Timeline Component */}
				<div className="relative max-w-4xl mx-auto">
					{/* Vertical Line */}
					<div className="absolute left-4.5 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 md:-translate-x-1/2" />

					<div className="space-y-12 ">
						{roadmapItems.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className={`relative flex items-center justify-between md:justify-normal gap-8 md:gap-0 ${
									index % 2 === 0 ? 'md:flex-row-reverse' : ''
								}`}
							>
								{/* Timeline Dot */}
								<div className="absolute left-0 md:left-1/2 w-9 h-9 rounded-full bg-white dark:bg-slate-950 border-4 border-slate-50 dark:border-slate-900 shadow-sm z-10 flex items-center justify-center md:-translate-x-1/2">
									{item.icon}
								</div>

								{/* Content Card */}
								<div className="w-full md:w-[45%] pl-12 md:pl-0">
									<div
										className={`p-6 rounded-2xl border transition-all ${
											item.status === 'current'
												? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800 shadow-xl shadow-indigo-500/5'
												: 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
										}`}
									>
										<span
											className={`text-xs font-bold uppercase tracking-widest ${
												item.status === 'completed'
													? 'text-emerald-500'
													: item.status === 'current'
													? 'text-indigo-600'
													: 'text-slate-400'
											}`}
										>
											{item.phase}
										</span>
										<h4 className="text-xl font-bold mt-1 mb-2 text-slate-900 dark:text-white">
											{item.title}
										</h4>
										<p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
											{item.description}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
