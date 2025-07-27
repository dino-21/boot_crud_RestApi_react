import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberList from "./components/MemberList";
import NewMemberForm from "./components/NewMemberForm";
import UpdateMemberForm from "./components/UpdateMemberForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MemberList />} />
        <Route path="/new" element={<NewMemberForm />} />
        <Route path="/edit/:id" element={<UpdateMemberForm />} />
      </Routes>
    </Router>
  );
}

export default App;
