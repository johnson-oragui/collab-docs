'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe2, Zap, Coffee } from 'lucide-react';

const values = [
	{
		icon: <Cpu className="text-indigo-500" />,
		title: 'Local-First Architecture',
		description:
			'We believe the user should never wait for the network. By prioritizing local state and background sync, we create interfaces that feel instantaneous.',
	},
	{
		icon: <Globe2 className="text-emerald-500" />,
		title: 'Distributed Consistency',
		description:
			'Using CRDTs (Conflict-free Replicated Data Types), we ensure that document state converges perfectly across every peer, globally.',
	},
	{
		icon: <Code2 className="text-purple-500" />,
		title: 'Open Engineering',
		description:
			"CollabDocs is built on open standards like Yjs and WebSockets, ensuring that high-performance collaboration isn't a walled garden.",
	},
];

export default function About() {
	return (
		<div>
			{/* Hero Section */}
			<section className="pt-32 pb-20 px-6 border-b border-slate-100 dark:border-slate-900">
				<div className="container mx-auto max-w-4xl text-center">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6"
					>
						Reimagining how the <br />
						<span className="text-indigo-600">web collaborates.</span>
					</motion.h1>
					<p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
						CollabDocs started as an experiment: Could we build a document
						editor that combined the power of Notion with the resilient,
						offline-first nature of a local app?
					</p>
				</div>
			</section>

			{/* The Mission Section */}
			<section className="py-24 px-6">
				<div className="container mx-auto max-w-5xl">
					<div className="grid md:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-3xl font-bold mb-6 dark:text-white text-slate-900">
								The Problem
							</h2>
							<p className="text-slate-600 dark:text-slate-400 mb-4">
								Most collaborative tools today rely on **Operational
								Transformation (OT)**. While powerful, OT requires a central
								server to mediate every single keystroke. If you lose
								connection, you stop collaborating.
							</p>
							<p className="text-slate-600 dark:text-slate-400">
								We shifted the paradigm to **CRDTs**. By treating the document
								as a distributed database that lives in your browser, we&apos;ve
								removed the server as a single point of failure.
							</p>
						</div>
						<div className="relative p-8 bg-indigo-600 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20">
							<Zap className="text-indigo-300 absolute -bottom-10 -right-10 w-64 h-64 opacity-20" />
							<blockquote className="relative z-10 text-xl font-medium text-white italic">
								&quot;Our mission is to make real-time collaboration so seamless
								and reliable that you forget the network even exists.&quot;
							</blockquote>
							<div className="mt-6 flex items-center gap-3 relative z-10">
								<div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center border border-indigo-300">
									<Coffee size={20} className="text-white" />
								</div>
								<div className="text-indigo-100">
									<p className="font-bold text-sm">The Engineering Team</p>
									<p className="text-xs opacity-80">CollabDocs Core</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Values/Principles Grid */}
			<section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/30">
				<div className="container mx-auto max-w-6xl">
					<h2 className="text-center text-3xl font-bold mb-16 dark:text-white">
						Our Engineering Principles
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{values.map((val, i) => (
							<motion.div
								key={i}
								whileHover={{ y: -5 }}
								className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
							>
								<div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl w-fit">
									{val.icon}
								</div>
								<h3 className="text-xl font-bold mb-3 dark:text-white">
									{val.title}
								</h3>
								<p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
									{val.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-24 px-6 text-center">
				<div className="container mx-auto max-w-2xl">
					<h2 className="text-3xl font-bold mb-6 dark:text-white">
						Ready to see it in action?
					</h2>
					<p className="text-slate-600 dark:text-slate-400 mb-10">
						Join the developers and teams building the next generation of
						documents.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
							Get Started for Free
						</button>
						<button className="px-8 py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all dark:text-white">
							View Source Code
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
