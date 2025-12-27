'use client';

import React, { useState } from 'react';
import {
	Mail,
	Lock,
	Eye,
	EyeOff,
	Chrome,
	LogIn,
	ArrowRight,
	Sparkles,
	Check,
} from 'lucide-react';
import Link from 'next/link';

export default function Signin() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		rememberMe: false,
	});

	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		// Simulate api delay
		setTimeout(() => setIsLoading(false), 1500);
	};

	return (
		<div className="w-full max-w-md mx-auto p-6 md:p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl">
			<div className="text-center mb-10">
				<div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-indigo-600 mb-6 shadow-lg shadow-indigo-600/20">
					<LogIn className="text-white" size={32} />
				</div>
				<h1 className="text-3xl font-black text-slate-900 dark:text-white">
					Welcome Back
				</h1>
				<p className="text-slate-500 mt-2">
					Enter your credentials to access your docs.
				</p>
			</div>

			<form onSubmit={handleLogin} className="space-y-6">
				{/* Email Field */}
				<div className="space-y-2">
					<div className="flex justify-between items-center ml-1">
						<label className="text-sm font-bold dark:text-slate-300">
							Email Address
						</label>
						<Link
							href="#"
							className="text-xs text-indigo-600 font-bold hover:underline"
						>
							Magic link login?
						</Link>
					</div>
					<div className="relative group">
						<Mail
							className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
							size={18}
						/>
						<input
							type="email"
							required
							className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl py-4 pl-12 pr-4 transition-all outline-none text-sm dark:text-white"
							placeholder="john@example.com"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
						/>
					</div>
				</div>

				{/* Password Field */}
				<div className="space-y-2">
					<div className="flex justify-between items-center ml-1">
						<label className="text-sm font-bold dark:text-slate-300">
							Password
						</label>
						<Link
							href="#"
							className="text-xs text-slate-500 hover:text-indigo-600 transition-colors"
						>
							Forgot password?
						</Link>
					</div>
					<div className="relative group">
						<Lock
							className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
							size={18}
						/>
						<input
							type={showPassword ? 'text' : 'password'}
							required
							className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl py-4 pl-12 pr-12 transition-all outline-none text-sm dark:text-white"
							placeholder="••••••••"
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
				</div>

				{/* Remember Me */}
				<label className="flex items-center gap-3 cursor-pointer group w-fit">
					<div className="relative flex items-center">
						<input
							type="checkbox"
							className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 dark:border-slate-700 checked:bg-indigo-600 checked:border-indigo-600 transition-all"
							checked={formData.rememberMe}
							onChange={(e) =>
								setFormData({ ...formData, rememberMe: e.target.checked })
							}
						/>
						<Check
							size={14}
							className="absolute left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
							strokeWidth={4}
						/>
					</div>
					<span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
						Keep me signed in
					</span>
				</label>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 group"
				>
					{isLoading ? (
						<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
					) : (
						<>
							Sign In{' '}
							<ArrowRight
								size={18}
								className="group-hover:translate-x-1 transition-transform"
							/>
						</>
					)}
				</button>

				{/* Divider */}
				<div className="relative py-4">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-bold tracking-widest">
							Or Securely
						</span>
					</div>
				</div>

				{/* Social Login */}
				<button
					type="button"
					className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold py-4 rounded-2xl hover:border-indigo-500/50 transition-all flex items-center justify-center gap-3"
				>
					<Chrome size={20} className="text-indigo-600" /> Continue with Google
				</button>
			</form>

			<div className="mt-10 text-center">
				<p className="text-sm text-slate-500">
					New to CollabDocs?{' '}
					<Link
						href="/auth/signup"
						className="text-indigo-600 font-black hover:underline inline-flex items-center gap-1"
					>
						Create Account <Sparkles size={14} />
					</Link>
				</p>
			</div>
		</div>
	);
}
