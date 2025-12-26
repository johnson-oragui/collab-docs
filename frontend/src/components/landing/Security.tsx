'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Key, UserCheck } from 'lucide-react';

const securityFeatures = [
	{
		title: 'End-to-End Encryption',
		description:
			"Your document fragments are encrypted before they leave your browser. Even our database can't read your content.",
		icon: <Lock className="text-blue-400" size={24} />,
	},
	{
		title: 'Granular Permissions',
		description:
			'Control exactly who can view, edit, or share. Revoke access instantly with real-time WebSocket enforcement.',
		icon: <UserCheck className="text-indigo-400" size={24} />,
	},
	{
		title: 'CRDT Integrity',
		description:
			'Cryptographic hashing ensures that every sync operation is verified, preventing unauthorized state injection.',
		icon: <ShieldCheck className="text-emerald-400" size={24} />,
	},
	{
		title: 'Session Hardening',
		description:
			'JWT-based authentication with automatic rotation and multi-device session management.',
		icon: <Key className="text-amber-400" size={24} />,
	},
];

export default function Security() {
	return (
		<section
			id="security"
			className="py-24 bg-slate-950 text-white overflow-hidden relative"
		>
			{/* Subtle Background Radial Glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

			<div className="container mx-auto px-6 relative z-10">
				<div className="flex flex-col lg:flex-row items-center gap-16">
					{/* Left Side: Text Content */}
					<div className="lg:w-1/2">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
						>
							<h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-3">
								Enterprise-Grade Security
							</h2>
							<h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
								Your data is private. <br />
								<span className="text-slate-500">Always.</span>
							</h3>
							<p className="text-slate-400 text-lg mb-8 leading-relaxed">
								We implement a multi-layered security protocol. From the
								transport layer down to the binary CRDT fragments, every byte is
								protected by industry-standard encryption and rigorous access
								controls.
							</p>

							<div className="space-y-6">
								{securityFeatures.map((f, i) => (
									<div key={i} className="flex gap-4">
										<div className="mt-1 p-2 rounded-lg bg-slate-900 border border-slate-800">
											{f.icon}
										</div>
										<div>
											<h4 className="font-bold text-slate-100">{f.title}</h4>
											<p className="text-slate-500 text-sm">{f.description}</p>
										</div>
									</div>
								))}
							</div>
						</motion.div>
					</div>

					{/* Right Side: Visual Element. The Vault */}
					<div className="lg:w-1/2 relative">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							className="relative p-8 rounded-3xl bg-linear-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-2xl"
						>
							{/* Animated Mockup of an Auth Event Log */}
							<div className="space-y-3 font-mono text-[10px] md:text-xs">
								<div className="flex justify-between p-2 rounded bg-slate-950/50 border border-slate-800">
									<span className="text-emerald-400">[AUTH_SUCCESS]</span>
									<span className="text-slate-500">
										User_829 connected via WSS
									</span>
								</div>
								<div className="flex justify-between p-2 rounded bg-slate-950/50 border border-slate-800">
									<span className="text-indigo-400">[ENCRYPT_FRAG]</span>
									<span className="text-slate-500">
										AES-256 GCM initialized
									</span>
								</div>
								<div className="flex justify-between p-2 rounded bg-red-400/10 border border-red-900/50">
									<span className="text-red-400">[UNAUTHORIZED]</span>
									<span className="text-slate-500">
										Blocked attempt on Doc_ID: 123
									</span>
								</div>
								<div className="flex justify-center py-4 text-slate-600 italic">
									-- Encrypted Sync in Progress --
								</div>
							</div>

							{/* Centered Floating Shield */}
							<motion.div
								animate={{ y: [0, -10, 0] }}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: 'easeInOut',
								}}
								className="absolute -top-10 -right-10 bg-indigo-600 p-6 rounded-2xl shadow-xl shadow-indigo-500/20"
							>
								<ShieldCheck size={48} className="text-white" />
							</motion.div>
						</motion.div>

						{/* Background decorative elements */}
						<div className="absolute -bottom-4 -left-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl" />
					</div>
				</div>
			</div>
		</section>
	);
}
