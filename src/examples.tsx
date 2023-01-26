import ScrollerContainer from "..";
import Img0 from "./assets/movies/0.jpg";
import Img1 from "./assets/movies/1.jpg";
import Img2 from "./assets/movies/2.jpg";
import Img3 from "./assets/movies/3.jpg";
import Img4 from "./assets/movies/4.jpg";
import Img5 from "./assets/movies/5.jpg";
import Img6 from "./assets/movies/6.jpg";
import Img7 from "./assets/movies/7.jpg";
import Gun from "./assets/movies/gun.svg";

const images = [Img0, Img1, Img2, Img3, Img4, Img5, Img6, Img7];

export const ExampleSimple = () => {
  return (
    <>
      <div style={{ padding: "1rem 0" }}></div>
      <p style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}>
        Simple Example
      </p>
      <ScrollerContainer
        itemWidth={200}
        itemHeight={200}
        howManyOnView={3}
        rightButton={<> &gt;</>}
        leftButton={<> &lt;</>}
      >
        {new Array(6).fill(0).map((_, index) => (
          <div
            key={index}
            style={{
              boxShadow: "inset 12px 10px  8px red",
              height: "100%",
              display: "grid",
              placeItems: "center",
              fontSize: "4rem",
            }}
          >
            {index}
          </div>
        ))}
      </ScrollerContainer>
    </>
  );
};

export const ExampleMoviePoster = () => {
  const posterDimensions = {
    height: 500,
    width: 350,
  };

  return (
    <>
      <div style={{ padding: "1rem 0" }}></div>
      <p style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}>
        Example with custom buttons
      </p>
      <ScrollerContainer
        itemWidth={posterDimensions.width}
        itemHeight={posterDimensions.height}
        howManyOnView={4}
        rightButton={<img src={Gun} alt="Gun right" width={50} height={50} />}
        leftButton={
          <img
            src={Gun}
            alt="Gun left"
            width={50}
            height={50}
            style={{
              transform: "rotateY(180deg)",
            }}
          />
        }
        buttonPosition={{
          rightRight: "-100px",
          leftLeft: "-100px",
        }}
      >
        {images.map((movie, index) => (
          <img
            key={index}
            src={movie}
            width={posterDimensions.width}
            height={posterDimensions.height}
          />
        ))}
      </ScrollerContainer>
    </>
  );
};

export const ExampleWithGaps = () => {
  const posterDimensions = {
    height: 500,
    width: 350,
  };
  return (
    <>
      <div style={{ padding: "1rem 0" }}></div>
      <p style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}>
        Example with gaps
      </p>
      <ScrollerContainer
        itemWidth={posterDimensions.width}
        itemHeight={posterDimensions.height}
        howManyOnView={3}
        itemGap={40}
        rightButton={<img src={Gun} alt="Gun right" width={50} height={50} />}
        leftButton={
          <img
            src={Gun}
            alt="Gun left"
            width={50}
            height={50}
            style={{
              transform: "rotateY(180deg)",
            }}
          />
        }
        buttonPosition={{
          rightRight: "-100px",
          leftLeft: "-100px",
        }}
      >
        {images.map((movie, index) => (
          <img
            key={index}
            src={movie}
            width={posterDimensions.width}
            height={posterDimensions.height}
            style={{
              border: "2px solid #3a65be",
              borderRadius: "10px",
              height: "100%",
              padding: "1rem",
              background: "#0000bbb3",
            }}
          />
        ))}
      </ScrollerContainer>
    </>
  );
};

export const ExampleResponsive = () => {
  const posterDimensions = {
    height: 500,
    width: 350,
  };

  return (
    <>
      <div style={{ padding: "1rem 0" }}></div>
      <p style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}>
        Example with responsive
      </p>
      <ScrollerContainer
        itemWidth={posterDimensions.width}
        itemHeight={posterDimensions.height}
        howManyOnView={4}
        rightButton={<img src={Gun} alt="Gun right" width={50} height={50} />}
        leftButton={
          <img
            src={Gun}
            alt="Gun left"
            width={50}
            height={50}
            style={{
              transform: "rotateY(180deg)",
            }}
          />
        }
        buttonPosition={{
          rightRight: "-100px",
          leftLeft: "-100px",
        }}
        responsive
      >
        {images.map((movie, index) => (
          <img
            key={index}
            src={movie}
            width={posterDimensions.width}
            height={posterDimensions.height}
          />
        ))}
      </ScrollerContainer>
      <div style={{ padding: "1rem 0" }}></div>
      <p style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}>
        Size the window!!!
      </p>
    </>
  );
};
