
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Componentes
import Home from "./containers/home/home";
import Header from "./components/header/header";
import SearchResults from "./containers/searchResults/searchResults";
import LoginC from "./containers/loginC/loginC";
import LoginE from "./containers/loginE/loginE";
import ProfileC from "./containers/profileC/profileC";
import ProfileE from "./containers/profileE/profileE";
import Curriculum from "./containers/curriculum/curriculum";
import Candidaturas from "./containers/candidaturas/candidaturas";
import Ofertas from "./containers/ofertas/ofertas";
import OfertaDetail from "./containers/ofertaDetail/ofertaDetail";
import addOferta from "./containers/addOferta/addOferta";
import RegisterC from "./containers/registerC/registerC";
import RegisterE from "./containers/registerE/registerE";
import PasswordRecovery from "./containers/passwordRecovery/passwordRecovery";
import Footer from "./components/footer/footer";

// CSS
import "./global.css";
import "./App.css";

export default function App() {
	return (
		<div>
			<Router>
				
				<Header/>
				
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/loginC" exact component={LoginC} />
					<Route path="/loginE" exact component={LoginE} />
					<Route path="/registerC" exact component={RegisterC} />
					<Route path="/registerE" exact component={RegisterE} />
					<Route path="/profileC" exact component={ProfileC} />
					<Route path="/profileE" exact component={ProfileE} />
					<Route path="/curriculum" exact component={Curriculum} />
					<Route path="/candidaturas" exact component={Candidaturas} />
					<Route path="/ofertas" exact component={Ofertas} />
					<Route path="/ofertaDetail" exact component={OfertaDetail} />
					<Route path="/addOferta" exact component={addOferta}/>
					<Route path="/passwordRecovery" exact component={PasswordRecovery} />
					<Route path="/searchResults" exact component={SearchResults} />
				</Switch>
				<Footer/>
			</Router>
		</div>
	);
}



