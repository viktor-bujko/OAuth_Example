import '../App.css';
import SignIn from '../signing_components/SignIn';
import ShowCalendarEvents from "../components/ShowCalendarEvents";
import AuthHandler from "../components/AuthHandler";
import { 
  createBrowserRouter,
  RouterProvider,
  useRouteError
} from 'react-router-dom';

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: <ErrorPage msg={"default page"} />
  },
  {
    path: "/auth",
    element: <AuthHandler />,
    errorElement: <ErrorPage msg={"auth page"} />
  },
  {
    path: "/calendar/events",
    element: <ShowCalendarEvents />,
    errorElement: <ErrorPage msg={"calendar page"} />
  }
]);

const App = () => <RouterProvider router={router}/>;

export default App;
