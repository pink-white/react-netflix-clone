import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./Routes/Home";
import Movies from "./Routes/Movies";
import Series from "./Routes/Series";
import Detail from "./Components/Detail";
import Search from "./Routes/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "movie/:id",
            element: <Detail />,
          },
          {
            path: "tv/:id",
            element: <Detail />,
          },
        ],
      },
      {
        path: "movies",
        element: <Movies />,
        children: [
          {
            path: "movie/:id",
            element: <Detail />,
          },
          {
            path: "tv/:id",
            element: <Detail />,
          },
        ],
      },
      {
        path: "series",
        element: <Series />,
        children: [
          {
            path: "movie/:id",
            element: <Detail />,
          },
          {
            path: "tv/:id",
            element: <Detail />,
          },
        ],
      },
      {
        path: "search",
        element: <Search />,
        children: [
          {
            path: "/search/movie/:id",
            element: <Detail />,
          },
          {
            path: "/search/tv/:id",
            element: <Detail />,
          },
        ],
      },
    ],
  },
]);

export default router;

{
  /* <Router>
<Header />
<Switch>
  <Route path="/series/tv/:id">
    <Series />
    <Detail />
  </Route>
  <Route path="/movies/movie/:id">
    <Movie />
    <Detail />
  </Route>
  <Route path={["/search/tv/:id", "/search/movie/:id"]}>
    <Search />
    <Detail />
  </Route>
  <Route path={["/movie/:id", "/tv/:id"]}>
    <Home />
    <Detail />
  </Route>
  <Route path="/series">
    <Series />
  </Route>
  <Route path="/movies">
    <Movie />
  </Route>
  <Route path="/search">
    <Search />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Switch>
<Footer />
</Router> */
}
