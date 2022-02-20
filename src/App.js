import LoginPage from "./components/LoginPage";
import AdminPage from "./pages/AdminPage";
import SalesMan from "./pages/SalesMan";
import React from "react";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Get value from localStorage or use default
      state: localStorage.getItem("state") || "login",
    };
    // Listen to storage event
    window.addEventListener("storage", (e) => this.storageChanged(e));
    // Bind this to storageChanged()
    this.storageChanged = this.storageChanged.bind(this);
  }

  storageChanged(e) {
    console.log(e.key);
    if (e.key === "state") {
      this.setState({ state: e.newValue });
    }
  }
  render() {
    return (
      <>
        {this.state.state === "login" ? (
          <LoginPage state={this.state.state} />
        ) : null}
        {this.state.state === "admin" ? (
          <AdminPage state={this.state.state} />
        ) : null}
        {this.state.state === "sales" ? (
          <SalesMan state={this.state.state} />
        ) : null}
      </>
    );
  }
}

export default App;

// function App() {
//    const [state, setState] = useState("login");
//   useEffect(()=>{
//     setState(localStorage.state?localStorage.state:'login');
//   },[]);
//   return (
//     <>
//       {state === "login" ? (
//         <LoginPage state={state} setState={setState} />
//       ) : null}
//       {state === "admin" ? (
//         <AdminPage state={state} setState={setState} />
//       ) : null}
//       {state === "sales" ? (
//         <SalesMan state={state} setState={setState} />
//       ) : null}
//     </>
//   );
// }

// export default App;
