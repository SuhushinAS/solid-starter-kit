import baron from 'baron';
import 'modules/common/components/Scroll.less';
import {hasScrollbar} from 'modules/common/lib/scrollbarWidth';
import {createEffect, JSX, onCleanup, onMount, Show} from 'solid-js';

export type TDirection = 'h' | 'v';

type Props = {
  children: JSX.Element;
  isHorizontal: boolean;
  isVertical: boolean;
};

type Ref<T = HTMLDivElement> = T | ((el: T) => void) | undefined;

type DirList = {
  bar: Ref;
  dir: TDirection;
  track: Ref;
};

const baronInstanceUpdate = (baronInstance: baron) => {
  baronInstance.update();
};

const baronInstanceDispose = (baronInstance: baron) => {
  baronInstance.dispose();
};

export const Scroll = (props: Props) => {
  const {children, isHorizontal, isVertical} = props;
  let root: Ref;
  let scroller: Ref;
  let barH: Ref;
  let barV: Ref;
  let trackH: Ref;
  let trackV: Ref;
  let baronInstanceList: baron[] = [];

  const init = (props: DirList) => {
    const {bar, dir, track} = props;

    return baron({
      bar,
      barOnCls: `Scroll_On_${dir}`,
      direction: dir,
      impact: 'scroller',
      root,
      scroller,
      track,
    });
  };

  const getDirList = () => {
    const result: DirList[] = [];

    if (isHorizontal) {
      result.push({bar: barH, dir: 'h', track: trackH});
    }

    if (isVertical) {
      result.push({bar: barV, dir: 'v', track: trackV});
    }

    return result;
  };

  onMount(() => {
    if (hasScrollbar) {
      const dirList = getDirList();
      baronInstanceList = dirList.map(init);
      baronInstanceList.forEach(baronInstanceUpdate);
    }
  });

  createEffect(() => {
    baronInstanceList.forEach(baronInstanceUpdate);
  });

  onCleanup(() => {
    baronInstanceList.forEach(baronInstanceDispose);
  });

  return (
    <div class="Scroll" ref={root}>
      <div class="Scroll__Scroller" ref={scroller}>
        {children}
      </div>
      <Show when={isHorizontal}>
        <div class={`Scroll__Track Scroll__Track_h`} ref={trackH}>
          <div class={`Scroll__Bar Scroll__Bar_h`} ref={barH} />
        </div>
      </Show>
      <Show when={isVertical}>
        <div class={`Scroll__Track Scroll__Track_v`} ref={trackV}>
          <div class={`Scroll__Bar Scroll__Bar_v`} ref={barV} />
        </div>
      </Show>
    </div>
  );
};
