
import {
  makeObservable, observable, action
} from 'mobx';

export default class FullscreenStore {

  @observable maxPortraitHeight: number = 0;
  @observable maxLandscapeHeight: number = 0;

  @observable showSwipeUp: boolean=true;


  constructor() {
    makeObservable(this);
    let portrait = window.matchMedia("(orientation: portrait)")
    window.addEventListener('resize', this.onCheckSwipeUp);
    //  window.addEventListener("scroll", this.onCheckSwipeUp);

    portrait.addEventListener("change",(e)=>{
      this.setInitialValue();
    } );
  }

  @action
  setInitialValue =()=>{
    window.scrollTo(0, 0);
    const element = document.getElementById("swipe-up");
    element?.scrollIntoView({ block: "end" });
     this.onCheckSwipeUp();
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
      window.scrollTo(0, 0);

       this.setShowSwipeUp(true);
      const element = document.getElementById("swipe-up");
      element?.scrollIntoView({ block: "end" });
    }
  };
}

