'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Search, FileText } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { useClickOutside } from '@/hooks/useClickOutside';

function SearchBar() {
	const [query, setQuery] = useState('');
	const { results, isLoading } = useSearch(query);
	const ref = useRef<HTMLDivElement | null>(null);

	useClickOutside(ref, () => setQuery(''));

	return (
		<div ref={ref} className="relative w-full max-w-md hidden md:block">
			<Search
				size={18}
				className={`absolute left-3 top-2.5 ${
					isLoading ? 'animate-spin text-indigo-500' : 'text-slate-400'
				}`}
			/>
			<input
				type="text"
				placeholder="Search documents or collaborators..."
				className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
			/>

			{query && (
				<div className="absolute mt-2 w-full bg-white border rounded-xl shadow-xl max-h-96 overflow-y-auto z-50">
					{results.docs.length === 0 &&
						results.collaborators.length === 0 &&
						!isLoading && (
							<p className="px-4 py-3 text-sm text-slate-500">
								No results found
							</p>
						)}

					{results.docs.length > 0 && (
						<>
							<p className="px-4 pt-3 pb-1 text-xs font-bold text-slate-400 uppercase">
								Documents
							</p>
							{results.docs.map((doc) => (
								<Link
									key={doc.id}
									href={`/dashboard/documents/${doc.id}`}
									className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-50"
								>
									<FileText size={16} />
									<span className="text-sm">{doc.name}</span>
								</Link>
							))}
						</>
					)}

					{results.collaborators.length > 0 && (
						<>
							<p className="px-4 pt-3 pb-1 text-xs font-bold text-slate-400 uppercase">
								Collaborators
							</p>
							{results.collaborators.map((user) => (
								<div key={user.id} className="px-4 py-2 text-sm text-slate-700">
									{user.name}
								</div>
							))}
						</>
					)}
				</div>
			)}
		</div>
	);
}

function MobileSearchBar() {
	const [query, setQuery] = useState('');
	const { results, isLoading } = useSearch(query);
	const ref = useRef<HTMLDivElement | null>(null);

	useClickOutside(ref, () => setQuery(''));

	return (
		<div ref={ref} className="relative">
			<Search
				size={18}
				className={`absolute left-3 top-2.5 ${
					isLoading ? 'animate-spin text-indigo-500' : 'text-slate-400'
				}`}
			/>
			<input
				type="text"
				placeholder="Search documents or people..."
				className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 text-sm"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
			/>

			{query && (
				<div className="absolute mt-2 w-full bg-white border rounded-xl shadow-xl max-h-96 overflow-y-auto z-50">
					{results.docs.length === 0 &&
						results.collaborators.length === 0 &&
						!isLoading && (
							<p className="px-4 py-3 text-sm text-slate-500">
								No results found
							</p>
						)}

					{results.docs.length > 0 && (
						<>
							<p className="px-4 pt-3 pb-1 text-xs font-bold text-slate-400 uppercase">
								Documents
							</p>
							{results.docs.map((doc) => (
								<Link
									key={doc.id}
									href={`/dashboard/documents/${doc.id}`}
									className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-50"
								>
									<FileText size={16} />
									<span className="text-sm">{doc.name}</span>
								</Link>
							))}
						</>
					)}

					{results.collaborators.length > 0 && (
						<>
							<p className="px-4 pt-3 pb-1 text-xs font-bold text-slate-400 uppercase">
								Collaborators
							</p>
							{results.collaborators.map((user) => (
								<div key={user.id} className="px-4 py-2 text-sm text-slate-700">
									{user.name}
								</div>
							))}
						</>
					)}
				</div>
			)}
		</div>
	);
}

export { MobileSearchBar, SearchBar };
