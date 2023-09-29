import React, { useRef } from 'react';
import { observer } from 'mobx-react';

import FullscreenStore from '../../Stores/FullscreenStore';
import { IFullscreen } from './types';
import './styles.scss';
const fullscreenStore= new FullscreenStore();

export const Fullscreen: IFullscreen = observer(() => {
  const ref = useRef<HTMLIFrameElement>(null);

  const {showSwipeUp}=fullscreenStore;

   const src='https://de-cgm.svmsrv.com/slots/1/?cashierUrl=&allowDesktopFullscreen=true&allowMobileFullscreen=true&enableRefresh=true&behavior=0&bridgeUrl=&gameToken=aoc&language=en&operatorToken=654be709f71140f7aa65dcd8cede80d4&playerToken=sx7axjha3292s8xws&host=https://de-se.svmsrv.com';

  const resizeIframe = () => {
    let iframe = ref.current;
    window.addEventListener('message', message => {
      if (message.data.type === 'resize' && iframe) {
        iframe.style.height = `${message.data.height}px`;        
      }
    });
  };

  return (
    <>
      <div  className="invisible-treadmill"  />   
      <div className='fullscreen-page text-center position-relative m-auto h-100 w-100'> 
        {
            <section className='w-100 h-100'>  
              <div className="h-100 fullscreen-content">
                <iframe
                  className={ `h-100 w-100 ${showSwipeUp ? 'no-swipe' : ''}` }
                  ref={ ref }
                  src={ src}
                  title={ '7mojos' }
                  onLoad={ resizeIframe }
                  allowFullScreen
                />
              </div>
              <div
                className={ showSwipeUp ? 'swipe-up show' : 'swipe-up' } 
              >
                <span>swipe up</span>
              </div>
            </section>
        }
      </div>
    </>
  );
});
