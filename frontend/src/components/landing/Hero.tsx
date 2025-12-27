'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
	ChevronRight,
	Sparkles,
	ShieldCheck,
	Zap,
	MousePointer2,
} from 'lucide-react';

export default function Hero() {
	return (
		<section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 z-0">
				<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />
				<div
					className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"
					style={{ animationDelay: '2s' }}
				/>
				{/* Grid Overlay */}
				<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]" />
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="text-center max-w-4xl mx-auto">
					{/* Badge Animation */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8"
					>
						<Sparkles size={14} />
						<span>Now with Offline-First CRDT Sync</span>
					</motion.div>

					{/* Main Title with Gradient Text */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6"
					>
						Collaborate without <br />
						<span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
							the Conflict.
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
					>
						The real-time editor that keeps your team in sync, even when the
						Wi-Fi isn&apos;t. Experience Google Docs speed with Notion-style
						blocks.
					</motion.p>

					{/* CTA Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="flex flex-col sm:flex-row items-center justify-center gap-4"
					>
						<Link
							href="/dashboard"
							className="group relative px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold transition-all hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2"
						>
							Start Building
							<ChevronRight
								size={18}
								className="group-hover:translate-x-1 transition-transform"
							/>
						</Link>
						<Link
							href="#demo"
							className="px-8 py-4 bg-slate-900 text-slate-300 border border-slate-800 rounded-xl font-semibold hover:bg-slate-800 transition-all"
						>
							Watch Demo
						</Link>
					</motion.div>

					{/* Feature Pills */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, delay: 0.5 }}
						className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-slate-800/50 pt-12"
					>
						<div className="flex flex-col items-center gap-2">
							<div className="p-2 rounded-lg bg-slate-900 text-indigo-400 border border-slate-800">
								<Zap size={20} />
							</div>
							<span className="text-sm font-medium text-slate-300">
								Instant Sync
							</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<div className="p-2 rounded-lg bg-slate-900 text-purple-400 border border-slate-800">
								<ShieldCheck size={20} />
							</div>
							<span className="text-sm font-medium text-slate-300">
								E2E Encrypted
							</span>
						</div>
						<div className="flex flex-col items-center gap-3 md:gap-2 col-span-2 md:col-span-1">
							<div className="p-2 rounded-lg bg-slate-900 text-pink-400 border border-slate-800 inline-block mx-auto">
								<MousePointer2 size={20} />
							</div>
							<span className="text-sm font-medium text-slate-300">
								Live Presence
							</span>
						</div>
					</motion.div>
				</div>
			</div>

			{/* A Floating Cursor Demo */}
			<motion.div
				animate={{
					x: [100, 250, 150, 100],
					y: [50, 150, 80, 50],
				}}
				transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
				className="absolute xl:flex items-center gap-2 pointer-events-none z-20"
			>
				<MousePointer2 className="text-yellow-400 fill-yellow-400" size={24} />
				<div className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-xl">
					Sarah is typing...
				</div>
			</motion.div>
		</section>
	);
}
