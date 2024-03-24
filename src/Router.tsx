import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./Routes/Home";
import Movies from "./Routes/Movies";
import Series from "./Routes/Series";
import Detail from "./Components/Detail";
import Search from "./Routes/Search";

const router = createBrowserRouter(
  [
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
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

export default router;
