import { useContext, useState } from "react";
import { Button } from "../components/Button";
import Page from "../components/Page";
import { store } from "../lib/store";

export default function Profile(params) {
  const { state, dispatch } = useContext(store);
  const [user, setUser] = useState({
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    sex: state.user.sex,
    age: state.user.age,
  });
  const [save, setSave] = useState("Save");

  const SaveImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // convert file to base64 String
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");

      // store file
      dispatch({
        type: "user",
        payload: { ...state.user, picture: base64String },
      });
      try {
        localStorage.setItem("picture", base64String);
      } catch (e) {
        console.log(e);
      }
    };
    reader.readAsDataURL(file);
  };
  const Save = () => {
    setSave("Saved!");
    const payload = {
      firstname: user.firstname != "" ? user.firstname : state.user.firstname,
      lastname: user.lastname != "" ? user.lastname : state.user.lastname,
      sex: user.sex != "" ? user.sex : state.user.sex,
      age: user.age != "" ? user.age : state.user.age,
      picture: state.user.picture,
    };
    setTimeout(() => setSave("Save"), 2000);
    dispatch({
      type: "user",
      payload: payload,
    });
    try {
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstname: payload.firstname,
          lastname: payload.lastname,
          sex: payload.sex,
          age: payload.age,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Page title="Profile">
      <div className="goback"><Button link="/" inverted>Cancel</Button></div>
      <div className="profile">
          <img width="150px" height="150px"  src={`data:image/png;base64,${state.user.picture}`} alt="" />
        <input type="file" onChange={SaveImage} />
        <div className="profile-name">
          <input
            type="text"
            id="firstname"
            placeholder="First name"
            value={user.firstname}
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          />
          <input
            type="text"
            id="lastname"
            placeholder="Last name"
            value={user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          />
        </div>
        <select name="sex" id="sex" defaultValue={user.sex}>
          <option
            value="Male"
            onClick={(e) => setUser({ ...user, sex: e.target.value })}
          >
            Male
          </option>
          <option
            value="Female"
            onClick={(e) => setUser({ ...user, sex: e.target.value })}
          >
            Female
          </option>
        </select>
        <input
          type="number"
          min={0}
          max={120}
          id="age"
          placeholder="Age"
          value={user.age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
        />
        <Button onClick={Save}>{save}</Button>
      </div>
    </Page>
  );
}
