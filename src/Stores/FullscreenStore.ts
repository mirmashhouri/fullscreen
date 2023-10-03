
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
    window.scrollTo(0,window.innerHeight/2);
  }

  @action
   setShowSwipeUp(show: boolean) {
    this.showSwipeUp=show;
  }

   @action
    onCheckSwipeUp = () => {
     const wInnerHeight=window.innerHeight;
     const wInnerWidth=window.innerWidth;
     const isPortrait=wInnerHeight>wInnerWidth;
     const maxHeight=isPortrait?this.maxPortraitHeight:this.maxLandscapeHeight;

      if(wInnerHeight>=maxHeight-40)
      {
        if(isPortrait){
          this.maxPortraitHeight=Math.max(wInnerHeight,this.maxPortraitHeight);
          this.maxLandscapeHeight=Math.max(wInnerWidth,this.maxLandscapeHeight);
        }
        else{
          this.maxLandscapeHeight=Math.max(wInnerHeight,this.maxLandscapeHeight);
          this.maxPortraitHeight=Math.max(wInnerWidth,this.maxPortraitHeight);
        }
        this.setShowSwipeUp(false);
      }
      else{
     
         this.setShowSwipeUp(true);
         this.scrollToTop();
      }
  };
}


