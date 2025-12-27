'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Scale,
	FileText,
	AlertCircle,
	Ban,
	ShieldAlert,
	Gavel,
} from 'lucide-react';

const highlights = [
	{
		title: 'Content Ownership',
		icon: <FileText className="text-indigo-500" />,
		text: 'You retain full ownership and copyright of any content you create. We claim no rights to your data.',
	},
	{
		title: 'Acceptable Use',
		icon: <Ban className="text-red-500" />,
		text: 'Reverse engineering our CRDT engine or abusing WebSocket connections for load testing is prohibited.',
	},
	{
		title: 'Service Reliability',
		icon: <AlertCircle className="text-amber-500" />,
		text: 'While we strive for 99.9% uptime, we are not liable for data loss due to client-side hardware failure.',
	},
];

export default function TermsContent() {
	return (
		<div className="max-w-4xl mx-auto py-16 px-6">
			{/* Overview Cards */}
			<div className="grid md:grid-cols-3 gap-6 mb-16">
				{highlights.map((item, idx) => (
					<motion.div
						key={idx}
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
					>
						<div className="mb-3">{item.icon}</div>
						<h4 className="font-bold mb-2 dark:text-white text-sm">
							{item.title}
						</h4>
						<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
							{item.text}
						</p>
					</motion.div>
				))}
			</div>

			{/* Legal Text */}
			<div className="prose prose-slate dark:prose-invert max-w-none text-white">
				<h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
				<p className="text-slate-500 text-sm mb-8">
					Effective Date: December 24, 2025
				</p>

				<section className="mb-8">
					<h3 className="flex items-center gap-2 text-xl font-semibold mb-4">
						<Scale size={20} className="text-indigo-600" />
						1. Acceptance of Terms
					</h3>
					<p>
						By accessing CollabDocs, you agree to be bound by these Terms. Our
						service provides real-time collaborative editing powered by
						distributed systems technology. If you disagree with any part of
						these terms, you may not access the service.
					</p>
				</section>

				<section className="mb-8">
					<h3 className="flex items-center gap-2 text-xl font-semibold mb-4">
						<Gavel size={20} className="text-indigo-600" />
						2. User Accounts & Security
					</h3>
					<p>
						You are responsible for maintaining the confidentiality of your
						account credentials. Because CollabDocs utilizes{' '}
						<strong>Local-First Persistence</strong>, clearing your browser
						cache (IndexedDB) before a full sync is completed may result in data
						loss. We are not responsible for data lost due to user-side cache
						management.
					</p>
				</section>

				<section className="mb-8">
					<h3 className="flex items-center gap-2 text-xl font-semibold mb-4">
						<ShieldAlert size={20} className="text-indigo-600" />
						3. Intellectual Property
					</h3>
					<p>
						The CollabDocs brand, logos, and proprietary synchronization
						algorithms are the exclusive property of CollabDocs Inc. Your
						document content remains yours; however, you grant us a limited
						license to host and transmit your data binary fragments solely to
						facilitate real-time collaboration between you and your invited
						peers.
					</p>
				</section>

				<div className="p-6 rounded-2xl bg-slate-900 text-slate-300 text-sm border border-slate-800 italic">
					<strong>Note on Beta Software:</strong> CollabDocs is currently in
					active development. While our CRDT engine is designed for high
					reliability, users are encouraged to maintain backups of critical
					information.
				</div>
			</div>
		</div>
	);
}
