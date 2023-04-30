import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import { useState, useEffect } from "react";

const { REACT_APP_API_URL } = process.env;

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: -1,
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // to get the server running if it is idle
    fetch(`${REACT_APP_API_URL}/`);
  }, []);

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined,
    });
  };

  const calculateFacesLocations = (data) => {
    return data.outputs[0].data.regions.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById("inputImage");
      const width = Number(image.width); // total width of the image, for example: 100px
      const height = Number(image.height); // total height of the image, for example: 100px
      return {
        // clarifaiFace.left_col is a percentage from the left of the image, so the left column starts
        // at 0.22 * 100px = 22px
        leftCol: clarifaiFace.left_col * width,
        // clarifaiFace.top_row is a percentage from the top of the image, so the top row starts
        // at 0.10 * 100px = 10px
        topRow: clarifaiFace.top_row * height,
        // clarifaiFace.right_col is a percentage from the right of the image, this changes a little
        // bit our math because we have to consider the (0,0) as the top left of the image so
        // the right column starts at 100px - 0.30 * 100px = 70px from the left
        rightCol: width - clarifaiFace.right_col * width,
        // clarifaiFace.bottom_row is a percentage from the bottom of the image, this changes a little
        // bit our math because we have to consider the (0,0) as the top left of the image so
        // the bottom row starts at 100px - 0.2 * 100px = 80px from the top
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  };

  const displayFacesBoxes = (boxes) => {
    setBoxes(boxes);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    setIsLoading(true);
    fetch(`${REACT_APP_API_URL}/imageUrl`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          fetch(`${REACT_APP_API_URL}/image`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser({ ...user, entries: count });
              setIsLoading(false);
            })
            .catch((err) => console.log(err));
          displayFacesBoxes(calculateFacesLocations(data));
        }
      })
      .catch((err) => console.log(err));
  };

  const setStateToDefaultValues = () => {
    setIsSignedIn(false);
    setInput("");
    setImageUrl("");
    setBoxes([]);
    setUser({
      id: -1,
      name: "",
      email: "",
      password: "",
      entries: 0,
      joined: "",
    });
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setStateToDefaultValues();
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className='App'>
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "50%",
          }}
        >
          <Rank
            userName={user.name}
            userEntries={user.entries}
            isLoading={isLoading}
          />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceDetection imageUrl={imageUrl} boxes={boxes} user={user} />
        </div>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
};

export default App;
