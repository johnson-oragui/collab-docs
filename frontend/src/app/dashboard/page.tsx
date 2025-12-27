import DocGrid from './DocGrid';
import DashboardShell from './DashboardShell';

export default async function DashboardPage() {
	return (
		<DashboardShell>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-slate-900 dark:text-white">
					Recent Documents
				</h1>
				<p className="text-slate-500 text-sm">
					Welcome back! Here is what&apos;s happening with your workspace.
				</p>
			</div>

			<DocGrid />
		</DashboardShell>
	);
}
