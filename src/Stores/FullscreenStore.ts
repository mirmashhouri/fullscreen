
import {
  makeObservable, observable, action
} from 'mobx';

export default class FullscreenStore {
  @observable maxPortraitHeight: number = 0;
  @observable maxLandscapeHeight: number = 0;
  @observable showSwipeUp: boolean=true;

  constructor() {
    makeObservable(this);
    this.attachListeners()
  }

  attachListeners =() =>{
    window.addEventListener('resize', this.onCheckSwipeUp);
    let portrait = window.matchMedia("(orientation: portrait)")
    portrait.addEventListener("change",this.setInitialValue);
  }

  @action
  setInitialValue =()=>{
   this.scrollToTop();
   this.onCheckSwipeUp();
  }

  private scrollToTop = ()=>{
    const element = document.getElementsByClassName("empty-top-span")[0];
    element?.scrollIntoView({ block: "end" });
  }

  @action
   setShowSwipeUp(show: boolean) {
    this.showSwipeUp=show;
  }

   @action
    onCheckSwipeUp = () => {
    const screenHeight = Math.min(window.screen.width, window.screen.height);
    const wInner=window.innerHeight;
    const show = screenHeight - wInner > 40;
    let isPortrait = window.matchMedia("(orientation: portrait)").matches
    const maxHeight=isPortrait?this.maxPortraitHeight:this.maxLandscapeHeight;
    if(wInner>=maxHeight)
    {
      if(isPortrait){
        this.maxPortraitHeight=wInner;
      }
      else{
        this.maxLandscapeHeight=wInner;
      }
      this.setShowSwipeUp(show);
    }
    else{
       this.setShowSwipeUp(true);
       this.scrollToTop();
    }
  };
}


