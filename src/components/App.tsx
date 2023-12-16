import '../App.css';
import SignIn from '../signing_components/SignIn';
import ShowCalendarEvents from "../components/ShowCalendarEvents";
import AuthHandler from "../components/AuthHandler";
import TokenPage from './TokenPage';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError
} from 'react-router-dom';
import { useState } from 'react';
import { Token } from '../google_oauth/interfaces';

function ErrorPage({ msg }: { msg: string }) {
  const error = useRouteError();
  console.error(error, msg);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}

const App = () => {
  const tokenState  = useState({} as Token);
  const [accessToken, _] = tokenState;
  return <RouterProvider
    router={createBrowserRouter([
      {
        path: "/",
        element: <SignIn />,
        errorElement: <ErrorPage msg={"default page"} />
      },
      {
        path: "/auth",
        element: <AuthHandler tokenState={tokenState}/>,
        errorElement: <ErrorPage msg={"auth page"} />
      },
      {
        path: "/token",
        element: <TokenPage />,
        errorElement: <ErrorPage msg={"token page"} />
      },
      {
        path: "/calendar/events",
        element: <ShowCalendarEvents token={accessToken} />,
        errorElement: <ErrorPage msg={"calendar page"} />
      }
    ])}
  />
};

export default App;
