import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';




function App() {
  const [url, setUrl] = useState('')
  const aa = async() => {
    let streams = await navigator.mediaDevices.getDisplayMedia({video: true})
    document.querySelector('#Rtc').srcObject = streams
    document.querySelector('#Rtc').play()
    // setInterval(() =>takePicture(), 100 )

  }
  const bb = () => {
    let stream = document.querySelector('#Rtc').captureStream();
    document.querySelector('#Rtc1').srcObject = stream;

  }
  const  cc = () => {
    let stream = document.querySelector('#Rtc1').captureStream();
    document.querySelector('#Rtc2').srcObject = stream;

  }
  const takePicture = () => {
    const videoplay = document.querySelector('#Rtc')
    const picture = document.querySelector('canvas#picture');
    picture.width = 640;
    picture.height = 480;
    picture.getContext('2d').drawImage(videoplay, 0, 0, picture.width, picture.height);
    setUrl(picture.toDataURL("image/jpeg"))
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div
          className="App-link"
          onClick={aa}
        >
          开始显示
        </div>
        <div
          className="App-link"
          onClick={bb}
        >
          第二个显示
        </div>
        <div
          className="App-link"
          onClick={cc}
        >
          第三个显示
        </div>
        <canvas id="picture"></canvas>
        <button onClick={takePicture}>拍照</button>
        <a download="photo" href={url}>下载</a>
         <div style={{display: "flex"}}>
         <video  playsInline id="Rtc" width="400px" height="200px" ></video>
          <video autoPlay playsInline id="Rtc1" width="400px" height="200px" ></video>
          <video autoPlay playsInline id="Rtc2" width="400px" height="200px" ></video>
         </div>
      </header>
    </div>
  );
}

export default App;
