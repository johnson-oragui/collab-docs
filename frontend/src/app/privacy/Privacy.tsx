'use client';

import React from 'react';
import { Lock, EyeOff, Server, HardDrive, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const sections = [
	{
		title: 'Data Sovereignty',
		icon: <HardDrive className="text-indigo-500" size={24} />,
		content:
			"With our local-first architecture, your primary data lives in your browser's IndexedDB. We only sync binary fragments (updates) to our servers to facilitate real-time collaboration with your peers.",
	},
	{
		title: 'End-to-End Encryption',
		icon: <Lock className="text-emerald-500" size={24} />,
		content:
			'All WebSocket traffic is encrypted via TLS 1.3. Document updates are transmitted as binary delta-encoded fragments, ensuring that your content is protected from interception during the synchronization process.',
	},
	{
		title: 'No Content Mining',
		icon: <EyeOff className="text-purple-500" size={24} />,
		content:
			'We do not read, scan, or sell your document content. Our business model is based on infrastructure and productivity tools, not on data monetization or advertising.',
	},
	{
		title: 'Infrastructure Security',
		icon: <Server className="text-blue-500" size={24} />,
		content:
			'Our NestJS backend and PostgreSQL databases are hosted in SOC 2 Type II compliant environments with automated snapshots and point-in-time recovery to ensure data durability.',
	},
];

export default function PrivacyContent() {
	return (
		<div className="max-w-4xl mx-auto py-16 px-6">
			{/* Summary Cards */}
			<div className="grid md:grid-cols-2 gap-6 mb-16">
				{sections.map((section, idx) => (
					<motion.div
						key={idx}
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: idx * 0.1 }}
						className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30"
					>
						<div className="mb-4">{section.icon}</div>
						<h3 className="text-lg font-bold mb-2 dark:text-white">
							{section.title}
						</h3>
						<p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
							{section.content}
						</p>
					</motion.div>
				))}
			</div>

			{/* Detailed Legal Text */}
			<div className="prose prose-slate dark:prose-invert max-w-none text-white ">
				<h2 className="text-white  text-2xl font-bold mb-4">Privacy Policy</h2>
				<p className="text-white text-sm mb-8 italic">
					Last Updated: December 24, 2025
				</p>

				<h3 className="text-xl font-semibold mt-8 mb-4">
					1. Information We Collect
				</h3>
				<p>
					To provide a seamless collaborative experience, we collect account
					information (email, name) and technical metadata (IP addresses, device
					identifiers). Document content is stored as
					<strong> Conflict-free Replicated Data Types (CRDTs)</strong>.
				</p>

				<h3 className="text-xl font-semibold mt-8 mb-4">2. How We Use Data</h3>
				<p>Your data is used exclusively to:</p>
				<ul className="list-disc pl-6 space-y-2">
					<li>
						Facilitate real-time synchronization between active collaborators.
					</li>
					<li>
						Maintain version history and point-in-time document restoration.
					</li>
					<li>
						Monitor system health and prevent unauthorized access to your
						documents.
					</li>
				</ul>

				<h3 className="text-xl font-semibold mt-8 mb-4">3. Data Retention</h3>
				<p>
					We retain your document data as long as your account is active. Upon
					document deletion, all associated binary fragments are purged from our
					primary database within 30 days. Local browser data (IndexedDB) can be
					cleared by the user at any time.
				</p>

				<div className="mt-12 p-6 rounded-xl bg-indigo-600/5 border border-indigo-600/10">
					<div className="flex items-center gap-3 mb-3">
						<Share2 className="text-indigo-600" size={20} />
						<h4 className="font-bold text-indigo-900 dark:text-indigo-300">
							Third-Party Disclosure
						</h4>
					</div>
					<p className="text-sm text-indigo-800/80 dark:text-indigo-300/80">
						We do not sell your personal information. We only share data with
						service providers (like our hosting platform) who are essential to
						running the CollabDocs service and who adhere to strict data
						processing agreements.
					</p>
				</div>
			</div>
		</div>
	);
}
