
import {
  makeObservable, observable, action
} from 'mobx';

export default class FullscreenStore {
  @observable maxPortraitHeight: number = 0;
  @observable maxLandscapeHeight: number = 0;
  @observable showSwipeUp: boolean=true;
  @observable isPortrait: boolean=true;
  constructor() {
    makeObservable(this);
    this.attachListeners()
  }

  attachListeners =() =>{
    window.addEventListener('resize', this.onCheckSwipeUp);

   document.addEventListener('touchend',()=>{
    if(this.showSwipeUp)
    this.onCheckSwipeUp();
   } 
   ,true);
  }

  private scrollToTop = ()=>{
    window.scrollTo(0,0);
  }

  @action
   setShowSwipeUp(show: boolean) {
    this.showSwipeUp=show;
  }

   @action
    onCheckSwipeUp = () => {
     let isPortrait= window.matchMedia("(orientation: portrait)").matches;

     if(isPortrait !== this.isPortrait){
      this.setShowSwipeUp(true);
      this.scrollToTop();
      this.isPortrait=isPortrait;
      this.maxLandscapeHeight=0;
      this.maxPortraitHeight=0;
     }
     else{
      const wInner=window.innerHeight;
      const maxHeight=isPortrait?this.maxPortraitHeight:this.maxLandscapeHeight;
      if(wInner>=maxHeight)
      {
        if(isPortrait){
          this.maxPortraitHeight=wInner;
        }
        else{
          this.maxLandscapeHeight=wInner;
        }
        this.setShowSwipeUp(false);
      }
      else{
     
         this.setShowSwipeUp(true);
         this.scrollToTop();
      }
     }
  };
}


