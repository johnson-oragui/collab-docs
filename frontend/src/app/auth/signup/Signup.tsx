'use client';

import React, { useState } from 'react';
import {
	Mail,
	Lock,
	Eye,
	EyeOff,
	Check,
	X,
	Chrome,
	ArrowRight,
	ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

const ValidationItem = ({ met, label }: { met: boolean; label: string }) => (
	<div
		className={`flex items-center gap-2 text-xs transition-colors ${
			met ? 'text-emerald-500' : 'text-slate-400'
		}`}
	>
		{met ? <Check size={12} /> : <X size={12} />}
		<span>{label}</span>
	</div>
);

export default function Signup() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		agreeToTerms: false,
		rememberMe: false,
	});

	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Validation States
	const validations = {
		length: formData.password.length >= 8,
		upper: /[A-Z]/.test(formData.password),
		lower: /[a-z]/.test(formData.password),
		digit: /\d/.test(formData.password),
		special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
		match:
			formData.confirmPassword === formData.password &&
			formData.confirmPassword !== '',
		email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
	};

	const strengthScore =
		Object.values(validations).filter((v) => v).length -
		(validations.match ? 1 : 0) -
		(validations.email ? 1 : 0);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		// API call here
		setTimeout(() => setIsSubmitting(false), 2000);
		console.log('is submitting...');
	};

	return (
		<div className="w-full max-w-md mx-auto p-6 md:p-8 bg-white dark:bg-slate-900  rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
			<div className="text-center mb-8">
				<h1 className="text-2xl font-bold dark:text-white">Create Account</h1>
				<p className="text-slate-500 text-sm mt-2">
					Join CollabDocs and start syncronizing.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-5">
				{/* Email Field */}
				<div className="space-y-2">
					<label className="text-sm font-medium dark:text-slate-300 ml-1">
						Email
					</label>
					<div className="relative">
						<Mail className="absolute left-3 top-3 text-slate-400" size={18} />
						<input
							type="email"
							required
							className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
							placeholder="name@company.com"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
						/>
					</div>
				</div>

				{/* Password Field */}
				<div className="space-y-2">
					<label className="text-sm font-medium dark:text-slate-300 ml-1">
						Password
					</label>
					<div className="relative">
						<Lock className="absolute left-3 top-3 text-slate-400" size={18} />
						<input
							type={showPassword ? 'text' : 'password'}
							required
							className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 pl-10 pr-12 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
							placeholder="••••••••"
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-3 text-slate-400 hover:text-indigo-500"
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>

					{/* Password Strength Meter */}
					<div className="flex gap-1 h-1 mt-2">
						{[1, 2, 3, 4, 5].map((s) => (
							<div
								key={s}
								className={`h-full flex-1 rounded-full transition-all duration-500 ${
									s <= strengthScore
										? strengthScore <= 2
											? 'bg-red-500'
											: strengthScore <= 4
											? 'bg-amber-500'
											: 'bg-emerald-500'
										: 'bg-slate-200 dark:bg-slate-700'
								}`}
							/>
						))}
					</div>

					{/* Validation Checklist */}
					<div className="grid grid-cols-2 gap-2 pt-2">
						<ValidationItem met={validations.length} label="8+ Characters" />
						<ValidationItem met={validations.upper} label="Uppercase" />
						<ValidationItem met={validations.lower} label="Lowercase" />
						<ValidationItem met={validations.digit} label="Number" />
						<ValidationItem met={validations.special} label="Special Char" />
						<ValidationItem met={validations.match} label="Passwords Match" />
					</div>
				</div>

				{/* Confirm Password */}
				<div className="space-y-2">
					<label className="text-sm font-medium dark:text-slate-300 ml-1">
						Confirm Password
					</label>
					<div className="relative">
						<ShieldCheck
							className="absolute left-3 top-3 text-slate-400"
							size={18}
						/>
						<input
							type="password"
							required
							className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
							placeholder="••••••••"
							value={formData.confirmPassword}
							onChange={(e) =>
								setFormData({ ...formData, confirmPassword: e.target.value })
							}
						/>
					</div>
				</div>

				{/* Options */}
				<div className="space-y-4 pt-2">
					<label className="flex items-center gap-3 cursor-pointer group">
						<input
							type="checkbox"
							className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
							checked={formData.rememberMe}
							onChange={(e) =>
								setFormData({ ...formData, rememberMe: e.target.checked })
							}
						/>
						<span className="text-xs text-slate-600 dark:text-slate-400">
							Remember me on this device
						</span>
					</label>

					<label className="flex items-center gap-3 cursor-pointer group">
						<input
							type="checkbox"
							required
							className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
							checked={formData.agreeToTerms}
							onChange={(e) =>
								setFormData({ ...formData, agreeToTerms: e.target.checked })
							}
						/>
						<span className="text-xs text-slate-600 dark:text-slate-400">
							I agree to the{' '}
							<Link
								href="/terms"
								className="text-indigo-600 font-bold hover:underline"
							>
								Terms
							</Link>{' '}
							and{' '}
							<Link
								href="/privacy"
								className="text-indigo-600 font-bold hover:underline"
							>
								Privacy Policy
							</Link>
						</span>
					</label>
				</div>

				<button
					type="submit"
					disabled={isSubmitting || Object.values(validations).some((v) => !v)}
					className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
				>
					{isSubmitting ? (
						<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
					) : (
						<>
							Create Account <ArrowRight size={18} />
						</>
					)}
				</button>

				<div className="relative my-8">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-white dark:bg-slate-900 px-2 text-slate-500">
							Or continue with
						</span>
					</div>
				</div>

				<button
					type="button"
					className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-750 transition-all flex items-center justify-center gap-3"
				>
					<Chrome size={18} /> Sign up with Google
				</button>
			</form>

			<p className="text-center text-sm text-slate-500 mt-8">
				Already have an account?{' '}
				<Link
					href="/auth/signin"
					className="text-indigo-600 font-bold hover:underline"
				>
					Sign In
				</Link>
			</p>
		</div>
	);
}
