import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Button } from "../components/Button";
import Page from "../components/Page";
import { store } from "../lib/store";
import styles from "../styles/Pages/Profile.module.css";

export default function Profile(params) {
  const { state, dispatch } = useContext(store);
  const [user, setUser] = useState({
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    sex: state.user.sex,
    age: state.user.age,
  });
  const [save, setSave] = useState("Save");
  const router=useRouter()

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
      setTimeout(()=>{

      router.push('/')
      },2000)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Page title="Profile">
      <div className={styles.profile}>
        <div className={styles.goback}>
          <Button title="Go back to home" inverted link="/" width="100px">
            Back
          </Button>
        </div>
        <img
          width="150px"
          height="150px"
          src={`data:image/png;base64,${state.user.picture}`}
          alt=""
        />
        <input type="file" title="Change photo" onChange={SaveImage} />
        <div className={styles.profilename}>
          <input
            title="First name"
            type="text"
            id="firstname"
            placeholder="First name"
            value={user.firstname || state.user.firstname}
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          />
          <input
            title="Last name"
            type="text"
            id="lastname"
            placeholder="Last name"
            value={user.lastname || state.user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          />
        </div>
        <select
          name="sex"
          id="sex"
          value={user.sex || state.user.sex}
          onChange={(e) => setUser({ ...user, sex: e.target.value })}
          title="Select gender"
        >
          <option value="Male" title="Select this">
            Male
          </option>
          <option value="Female" title="Select this">
            Female
          </option>
        </select>
        <input
          title="Change age"
          type="number"
          min={0}
          max={120}
          id="age"
          placeholder="Age"
          value={user.age || state.user.age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
        />
        <Button title="Save details" onClick={Save} width="150px">
          {save}
        </Button>
      </div>
    </Page>
  );
}
