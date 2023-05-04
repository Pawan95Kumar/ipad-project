import React from 'react';
//todo: import css file
import '../css/App.css';
//todo: Import iPod body file
import Case from './Case.jsx';
import KnowMore from "./KnowMore.jsx"
//todo: Import songs
import song1 from "../static/songs/Fly Fly Away.mp3"
import song2 from "../static/songs/Ghode Pe Sawar.mp3"
import song3 from "../static/songs/Love You So Much.mp3"
import song4 from "../static/songs/Piya Re Darshan Raval.mp3"
import song5 from "../static/songs/Sona Lagda - Sukriti Kakar.mp3"

//todo: Import song cover images
import song1Img from "../static/Fly Fly Away.jpg";
import song2Img from "../static/Ghodey Pe Sawar.jpg";
import song3Img from "../static/Love You So Much.jpg";
import song4Img from "../static/Piya Re.jpg";
import song5Img from "../static/sohna lagda.jpg";

//todo: Import wallpapers
import Wallpaper1 from "../static/wallpaper1.jpg"
import Wallpaper2 from "../static/wallpaper2.jpg"
import Wallpaper3 from "../static/wallpaper3.jpg"



class App extends React.Component {
  constructor() {
    super();
    this.state = {
       //todo:Active list item
       active: 0, 
        //todo:menu Items
       menuItems: ["Now Playing", "Music", "Games", "Settings"],
       //todo:Items in music
      musicItems: ["All Songs", "Artist", "Albums"], 
      //todo:songs list
      songItemsUrl: [song1, song2, song3,song4,song5,],  
      //todo:song images list
      songImgItemsUrl: [song1Img, song2Img, song3Img,song4Img,song5Img,],  
       //todo:wallpapers
       songItems: ["Fly Fly Away", "Ghodey Pe Sawar", "Love You So Much","Piya Re","sohna lagda"],   
        //todo:song names
      wallpaperItems: [Wallpaper1, Wallpaper2, Wallpaper3],
       //todo:current song
      songIndex: 0,
       //todo:length of a particular menu
      lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3 ,10:2}, 
      //todo:which menu can be rendered by key menu
      menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] }, 
      //todo:current menu which is lockscreen initially
      currentMenu: -2, 
      //todo:Used for navigation forward and backward
      navigationStack: [], 
      //todo:current song url
      songUrl: song1, 
      playing: false, //todo: playing or not
      //todo: current body theme
      theme: "rgb(210, 210, 210)",
      //todo: current audio file
      audio: new Audio(song1), 
      //todo: current song img for now playing
      songImgUrl: song1Img, 
      //todo: current wheel color
      wheelColor: "white", 
      //todo: current wallpaper
      wallpaper: 0, 
      //todo:  has to show notification or not
      noty:false, 
      notifyText:"Wallpaper Changed", //todo: notification text
    }
  }

  //todo:  FUNCTION FOR : ON LONG PRESS OF FORWARD BUTTON TRACKS ARE SEEKED FORWARD
  seekSongForward = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === this.state.songItemsUrl.length - 1) {
        songIndex = 0;
      } else {
        songIndex++;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState({ songIndex: songIndex, songImgUrl: songImgUrl, songUrl: songUrl, audio: new Audio(songUrl) }, () => {
        this.state.audio.play();
      });
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState)=>{
        prevState.audio.currentTime += interval; 
        return prevState;
      })
    }
  }

  // todo: FUNCTION FOR : ON LONG PRESS OF FORWARD BUTTON TRACKS ARE SEEKED BACKWARD
  seekSongReverse = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    console.log(e.detail.interval);
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === 0) {
        songIndex = this.state.songItemsUrl.length - 1;
      } else {
        songIndex--;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState({ songIndex: songIndex, songImgUrl: songImgUrl, songUrl: songUrl, audio: new Audio(songUrl) }, () => {
        this.state.audio.play();
      });
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState)=>{
        prevState.audio.currentTime -= interval;
        return prevState;
      })
    }
  }

  // todo: FUNCTION FOR : TOGGLE SONG PLAY AND PAUSE
  togglePlayPause = () => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === true) {
      this.setState({ playing: false });
      this.state.audio.pause();
    }
    else {
      this.setState({ playing: true });
      this.state.audio.play();
    }
  }

  //todo:  FUNCTION FOR : UPDATE ACTIVE MENU WHILE ROTATING ON THE TRACK-WHEEL
  updateActiveMenu = (direction, menu) => {

    if (menu !== -1 && menu !== 1 && menu !== 4 && menu !== 8 && menu !== 3 && menu !== 9 && menu !== 10) {
      return;
    }
    let min = 0;
    let max = 0;

    max = this.state.lengthMenuKey[menu];

    if (direction === 1) {
      if (this.state.active >= max) {
        this.setState({ active: min })
      } else {
        this.setState({ active: this.state.active + 1 })
      }
    } else {
      if (this.state.active <= min) {
        this.setState({ active: max })
      } else {
        this.setState({ active: this.state.active - 1 })
      }
    }
  }


  //todo:  FUNCTION FOR : CHANGE THE THEME OF iPod BODY
  setTheme = (id) => {
    let theme ="";
    if (id === 0) {
      theme= "#f0f0f0";
    }
    else if (id === 1) {
      theme= "#555d50" //todo: black
    } else if (id === 2) {
      theme= "#ffcc00";
    } else if (id === 3) {
      theme="#D1CDDA";

    } else if (id === 4) {
      theme="#c4aead"
    }
    this.setState({ theme:theme , noty:true, notifyText:"Theme Changed"}) //todo: Notification
    return;
  }


  //todo:  FUNCTION FOR : CHANGE COLOR OF WHEEL
  setWheelColor = (id) => {
    let wheelColor ="";
    if (id === 0) {
      wheelColor= "#212121";
    }
    else if (id === 1) {
      wheelColor= "white";
    } else if (id === 2) {
      wheelColor = "#3E2723";
    } else if (id === 3) {
      wheelColor= "#3D5AFE";
    }
    this.setState({ wheelColor: wheelColor, noty:true, notifyText:"Wheel Color Changed"})
    return;
  }

  //todo:  FUNCTION FOR : SET WALLPAPER OF iPod Body
  setWallpaper = (id) => {
    this.setState({ wallpaper: id , noty:true, notifyText:"Wallpaper Changed"});
    return;
  }

  //todo:  FUNCTION FOR : CHANGE PLAYING MUSIC
  chagePlayingSongFromMusicMenu = (id, navigationStack) => {
    const songUrl = this.state.songItemsUrl[id];
    const songImgUrl = this.state.songImgItemsUrl[id];
    this.state.audio.pause();
    this.setState({ currentMenu: 7, songUrl: songUrl, navigationStack: navigationStack, active: 0, playing: true, songIndex: id, audio: new Audio(songUrl), songImgUrl: songImgUrl }, () => {
      this.state.audio.play();
    });
    return;
  }

  //todo:  FUNCTION FOR : CHANGE MENU BACKWARDS on PRESS OF CENTER BUTTON
  changeMenuBackward = () => {

    const navigationStack = this.state.navigationStack.slice();
    if (this.state.currentMenu === -2) {
      return;
    }
    else {
      const prevId = navigationStack.pop();
      this.setState({ currentMenu: prevId, navigationStack: navigationStack, active: 0 });
      return;
    }

  }

  //todo:  FUNCTION FOR : CHANGE MENU FORWARD on PRESS OF CENTER BUTTON using NAVIGATION STACK
  changeMenuForward = (id, fromMenu) => {

    const navigationStack = this.state.navigationStack.slice();

    if (fromMenu !== -2 && fromMenu !== -1 && fromMenu !== 1 && fromMenu !== 4 && fromMenu !== 3 && fromMenu !== 8 && fromMenu !== 9 && fromMenu !== 0 && fromMenu !== 7 &&fromMenu !== 10) {
      return;
    }

    if (fromMenu === -2) {
      navigationStack.push(this.state.currentMenu);
      this.setState({ currentMenu: -1, navigationStack: navigationStack, active: 0 });
      return;
    }

    if (fromMenu === -1) {
      navigationStack.push(this.state.currentMenu);
      this.setState({ currentMenu: id, navigationStack: navigationStack, active: 0 });
      return;
    }

    if (fromMenu === 7 || fromMenu === 0) {
      this.togglePlayPause();
      return;
    }

    if (fromMenu === 8) {
      this.setTheme(id);
      return;
    }


    if (fromMenu === 9) {
      this.setWheelColor(id)
      return;
    }

    if (fromMenu === 10) {
      this.setWallpaper(id)
      return;
    }

    navigationStack.push(this.state.currentMenu);

    if (fromMenu === 4) {
      this.chagePlayingSongFromMusicMenu(id, navigationStack, fromMenu);
      return;
    }

    const currentMenuID = this.state.menuMapping[fromMenu][id];
    this.setState({ currentMenu: currentMenuID, navigationStack: navigationStack, active: 0 });

  }

  //todo:  FUNCTION FOR : SET NOTIFICATION AS FALSE AFTER SENDING NOTIFICATION
  setNoty=()=>{
    this.setState({noty:false});
    return;
  }


  //todo:  FUNCTION FOR : RENDERING APP
  render() {
    const { audio, active, currentMenu, menuItems, musicItems, songItems, playing, songIndex, theme, songUrl, songImgUrl, wheelColor, wallpaper, wallpaperItems, noty, notifyText } = this.state;
    return (
      <div className="App">
        <KnowMore/>
        <Case songIndex={songIndex} active={active} menuItems={menuItems} musicItems={musicItems} currentMenu={currentMenu} changeMenuForward={this.changeMenuForward} changeMenuBackward={this.changeMenuBackward} updateActiveMenu={this.updateActiveMenu} togglePlayPause={this.togglePlayPause} songItems={songItems} playing={playing} theme={theme} audio={audio} songUrl={songUrl} songImgUrl={songImgUrl} seekSongForward={this.seekSongForward} seekSongReverse={this.seekSongReverse} wheelColor={wheelColor} wallpaper={wallpaper} wallpaperItems={wallpaperItems} noty={noty} setNoty={this.setNoty} notifyText={notifyText}/>
      </div>
    );
  }
}

export default App;
