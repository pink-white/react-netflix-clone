import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Series from "./Routes/Series";
import Search from "./Routes/Search";
import Header from "./Components/Header";
import Movie from "./Routes/Movie";
import Detail from "./Components/Detail";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
