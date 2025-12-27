'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MoreVertical, Clock, Users, Plus } from 'lucide-react';

const DUMMY_DOCS = [
	{
		id: '1',
		title: 'Q1 Project Roadmap',
		updated: '2 hours ago',
		contributors: 3,
	},
	{
		id: '2',
		title: 'Marketing Branding Guidelines',
		updated: 'Yesterday',
		contributors: 5,
	},
	{
		id: '3',
		title: 'System Architecture Design',
		updated: '3 days ago',
		contributors: 2,
	},
	{
		id: '4',
		title: 'Client Feedback - Phase 2',
		updated: '1 week ago',
		contributors: 8,
	},
];

export default function DocGrid() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{/* Create New Card */}
			<button className="group border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all min-h-40">
				<div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
					<Plus size={24} />
				</div>
				<span className="font-semibold text-slate-700 dark:text-slate-300">
					New Document
				</span>
			</button>

			{/* Doc Cards */}
			{DUMMY_DOCS.map((doc, i) => (
				<a href={`dashboard/editor/${doc.id}`} key={i}>
					<motion.div
						key={doc.id}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.05 }}
						className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-lg transition-all group"
					>
						<div className="flex justify-between items-start mb-4">
							<div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
								<FileText size={20} />
							</div>
							<button className="p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
								<MoreVertical size={16} />
							</button>
						</div>

						<h3 className="font-bold text-slate-900 dark:text-white mb-4 line-clamp-1 group-hover:text-indigo-600 transition-colors">
							{doc.title}
						</h3>

						<div className="flex items-center justify-between mt-auto">
							<div className="flex items-center gap-1.5 text-xs text-slate-500">
								<Clock size={14} />
								{doc.updated}
							</div>
							<div className="flex items-center gap-1.5 text-xs text-slate-500">
								<Users size={14} />
								{doc.contributors}
							</div>
						</div>
					</motion.div>
				</a>
			))}
		</div>
	);
}
