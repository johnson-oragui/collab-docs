import { useState, useEffect } from 'react';

const DUMMY_DOCS = [
	{ id: '1', name: 'Project Roadmap 2025', owner: 'Alice' },
	{ id: '2', name: 'Design System Specs', owner: 'Bob' },
	{ id: '3', name: 'Marketing Strategy', owner: 'Alice' },
];

const DUMMY_USERS = [
	{ id: 'u1', name: 'Alice Johnson', email: 'alice@example.com' },
	{ id: 'u2', name: 'Bob Smith', email: 'bob@example.com' },
];

export function useSearch(query: string) {
	const [results, setResults] = useState({
		docs: [] as typeof DUMMY_DOCS,
		collaborators: [] as typeof DUMMY_USERS,
	});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (query.trim() === '') {
			setResults({ docs: [], collaborators: [] });
			return;
		}

		setIsLoading(true);

		const timer = setTimeout(() => {
			const q = query.toLowerCase();

			const filteredDocs = DUMMY_DOCS.filter((d) =>
				d.name.toLowerCase().includes(q),
			);

			const docsFromUsers = DUMMY_DOCS.filter((d) =>
				d.owner.toLowerCase().includes(q),
			);

			const collaborators = DUMMY_USERS.filter((u) =>
				u.name.toLowerCase().includes(q),
			);

			const docs = Array.from(
				new Map(
					[...filteredDocs, ...docsFromUsers].map((d) => [d.id, d]),
				).values(),
			);

			setResults({ docs, collaborators });
			setIsLoading(false);
		}, 300);

		return () => clearTimeout(timer);
	}, [query]);

	return { results, isLoading };
}
