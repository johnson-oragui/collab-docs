import Header from '@/components/header/Header';
import Signin from './Signin';
import Footer from '@/components/footer/Footer';

export default async function SigninPage() {
	return (
		<>
			<Header />
			<div className="dark:bg-slate-950 ">
				<Signin />
			</div>
			<Footer />
		</>
	);
}
