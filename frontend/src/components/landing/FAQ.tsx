'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, Cpu, Zap } from 'lucide-react';

const faqData = [
	{
		category: 'Technology',
		icon: <Cpu size={18} />,
		questions: [
			{
				q: 'How does the real-time sync actually work?',
				a: "We use CRDTs (Conflict-free Replicated Data Types) via Yjs. Unlike Google Docs' OT approach, our system allows for decentralized merging, meaning conflicts are mathematically impossible even in high-latency environments.",
			},
			{
				q: 'What happens if two people edit the same word simultaneously?',
				a: 'The CRDT engine assigns a unique ID to every character. It uses deterministic merging based on origin timestamps and peer IDs to ensure every client converges to the exact same state instantly.',
			},
		],
	},
	{
		category: 'Offline & Performance',
		icon: <Zap size={18} />,
		questions: [
			{
				q: 'Does it really work without internet?',
				a: "Yes. We use IndexedDB to persist a full copy of the CRDT state vector locally. When you reconnect, our 'Delta Sync' algorithm only sends the missing binary fragments to the server to save bandwidth.",
			},
			{
				q: 'Is there a limit to document size?',
				a: 'We use virtualized rendering in the editor. Only the blocks currently in your viewport are processed by the DOM, allowing for documents with thousands of pages without performance degradation.',
			},
		],
	},
];

export default function FAQ() {
	// Track the active item using a string key "categoryIndex-questionIndex"
	const [activeKey, setActiveKey] = useState<string | null>('0-0');

	const toggleFAQ = (key: string) => {
		setActiveKey(activeKey === key ? null : key);
	};

	return (
		<section id="faq" className="py-24 bg-white dark:bg-slate-950">
			<div className="container mx-auto px-6">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-4">
						<HelpCircle size={14} /> Common Questions
					</div>
					<h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
						Everything you need to know
					</h2>
				</div>

				<div className="max-w-3xl mx-auto space-y-12">
					{faqData.map((section, sIdx) => (
						<div key={sIdx} className="space-y-4">
							<div className="flex items-center gap-2 text-slate-400 mb-6 border-b border-slate-100 dark:border-slate-800 pb-2">
								{section.icon}
								<span className="text-sm font-bold uppercase tracking-widest">
									{section.category}
								</span>
							</div>

							{section.questions.map((item, qIdx) => {
								const key = `${sIdx}-${qIdx}`;
								const isOpen = activeKey === key;

								return (
									<div
										key={key}
										className={`rounded-2xl border transition-all duration-300 ${
											isOpen
												? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-900/10'
												: 'border-slate-200 dark:border-slate-800 bg-transparent'
										}`}
									>
										<button
											onClick={() => toggleFAQ(key)}
											className="w-full flex items-center justify-between p-5 text-left"
										>
											<span
												className={`font-semibold transition-colors ${
													isOpen
														? 'text-indigo-600 dark:text-indigo-400'
														: 'text-slate-700 dark:text-slate-300'
												}`}
											>
												{item.q}
											</span>
											<div
												className={`p-1 rounded-full transition-transform duration-300 ${
													isOpen
														? 'rotate-180 bg-indigo-600 text-white'
														: 'text-slate-400'
												}`}
											>
												{isOpen ? <Minus size={16} /> : <Plus size={16} />}
											</div>
										</button>

										<AnimatePresence>
											{isOpen && (
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: 'auto', opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{ duration: 0.3, ease: 'easeInOut' }}
													className="overflow-hidden"
												>
													<div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
														{item.a}
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
