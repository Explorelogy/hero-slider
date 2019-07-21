// Libraries
import * as React from 'react';

// Dependencies
import {
  EAutoplayButtons,
  IAutoplayButtonProps,
} from '../../typings/definitions';
import { SliderContext } from '../Context';

// CSS
import AutoplayButtonsModuleCss from './AutoplayButtons.module.css';

const { useContext } = React;

const AutoplayButtons = React.memo((props: IAutoplayButtonProps) => {
  const {
    className,
    style,
    position,
    // autoplayHandlerTimeout,
    // setIsManuallyPaused,
    // autoplay,
  } = props;

  const { autoplayButtonProps } = useContext(SliderContext);

  const [buttonType, setButtonType] = React.useState<EAutoplayButtons>(EAutoplayButtons.PAUSE);

  if (!autoplayButtonProps) return null;

  const {
    setIsManuallyPaused,
    autoplayHandlerTimeout,
    autoplay,
  } = autoplayButtonProps;

  const autoplayInstance = autoplay && autoplay.current;

  if (!autoplayInstance) return null;

  const playPath = 'M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z';
  const pausePath = 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z';

  const playHandler = () => {
    autoplayInstance.resume();
    setButtonType(EAutoplayButtons.PAUSE);
    setIsManuallyPaused(false);
  };

  const pauseHandler = () => {
    autoplayInstance.pause();
    setButtonType(EAutoplayButtons.PLAY);
    setIsManuallyPaused(true);
  };

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    clearTimeout(autoplayHandlerTimeout && +autoplayHandlerTimeout);
    switch (buttonType) {
      case EAutoplayButtons.PAUSE:
        pauseHandler();
        break;
      case EAutoplayButtons.PLAY :
        playHandler();
        break;
    }
  };

  const setPath = (): string => {
    switch (buttonType) {
      case EAutoplayButtons.PLAY:
        return playPath;
      case EAutoplayButtons.PAUSE:
        return pausePath;
    }
  };

  return (
  <button
    className={[
      AutoplayButtonsModuleCss.Button,
      className,
    ].join(' ')}
    onClick={onClickHandler}
    style={{
      bottom: !position ? '0' : undefined,
      left: !position ? '0' : undefined,
      ...position,
      ...style,
    }}>
    <svg
      fill="currentColor"
      height="100%"
      width="100%"
      viewBox="0 0 36 36" >
      <path d={setPath()} />
    </svg>
  </button>
  );
});

export const AutoplayButton = (props: IAutoplayButtonProps): JSX.Element => (
  <AutoplayButtons {...props} />
);
(AutoplayButton as React.FunctionComponent).displayName = 'hero-slider/autoplay-button';
