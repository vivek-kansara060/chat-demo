import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return (
        <div id='error-page'>
            <h1>Oops!</h1>
            <p>Sorry, The page you have requested is</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
