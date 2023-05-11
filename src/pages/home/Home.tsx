import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Home.module.css";

const Home = () => {
  const [firstName, setFirstName] = useState<string | null>("");
  const [lastName, setLastName] = useState<string | null>("");

  const navigate = useNavigate();

  useEffect(() => {
    const userFirstName = sessionStorage.getItem("firstName");
    const userLastName = sessionStorage.getItem("lastName");

    if (userFirstName && userLastName) {
      setFirstName(userFirstName);
      setLastName(userLastName);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className={classes.wrapper}>
      <h1>
        Wellcome {firstName} {lastName}
      </h1>
      <button className={classes.logoutButton} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
