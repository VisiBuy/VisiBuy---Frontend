import { useRouteError } from "react-router-dom";

export default function PageNotFound() {
	const error = useRouteError();
	console.error(error);

	return (
		<>
			<div>Page Not Found</div>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</>
	);
}


