import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';




function App() {
  const [url, setUrl] = useState('')
  const [videourl, setVideourl] = useState('')
  const [filters, setfilters] = useState('')
  const buffer = []
  const aa = async() => {
    let streams = await navigator.mediaDevices.getDisplayMedia({video: true})
    document.querySelector('#Rtc').srcObject = streams
    document.querySelector('#Rtc').play()
    const options =  {
      mimeType: 'video/webm;codecs=vp8'
    }
    let mediaRecorder
    // 判断浏览器是否支持录制
    if(!MediaRecorder.isTypeSupported(options.mimeType)){
      console.error(`${options.mimeType} is not supported!`);
      return;
    
    }
    try{
      // 创建录制对象
      mediaRecorder = new MediaRecorder(streams, options);
    }catch(e){
      console.error('Failed to create MediaRecorder:', e);
      return;
    }
    mediaRecorder.ondataavailable = e => {
      if(e && e.data && e.data.size > 0){
        buffer.push(e.data);
      }
    }
    mediaRecorder.start(10)
  }
  const bb = () => {
    let stream = document.querySelector('#Rtc').captureStream();
    document.querySelector('#Rtc1').srcObject = stream;

  }
  const cc = () => {
    var blob = new Blob(buffer, {type: 'video/webm'});
    const recvideo = document.querySelector('#Rtc2')
    recvideo.src = window.URL.createObjectURL(blob);
    setVideourl(window.URL.createObjectURL(blob))
    recvideo.srcObject = null;
    recvideo.controls = true;
    recvideo.play();
  }

  const changeCss = e => {
    setfilters(e.target.value)
    setTimeout(() => {
      const realPicture = document.querySelector('canvas#realPicture')
      const picture = document.querySelector('canvas#picture');
      realPicture.width = 640;
      realPicture.height = 480;
      realPicture.getContext('2d').drawImage(picture, 0, 0, realPicture.width, realPicture.height);
      setUrl(realPicture.toDataURL("image/jpeg", 1.0))
    },1000)
    
  }
  const takePicture = () => {
    const videoplay = document.querySelector('#Rtc')
    const picture = document.querySelector('canvas#picture');
    picture.width = 640;
    picture.height = 480;
    picture.getContext('2d').drawImage(videoplay, 0, 0, picture.width, picture.height);
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
        <canvas id="picture" className={filters}></canvas>
        <canvas id="realPicture"></canvas>
        <button onClick={takePicture}>拍照</button>
        <a download="photo" href={url}>下载照片</a>
        <a download="aaa.webm" href={videourl}>下载录像</a>
        <select id="filter" onChange={changeCss}>
          <option value="none">None</option>
          <option value="blur">blur</option>
          <option value="grayscale">Grayscale</option>
          <option value="invert">Invert</option>
          <option value="sepia">sepia</option>
        </select>
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
