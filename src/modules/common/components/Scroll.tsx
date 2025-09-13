import baron from 'baron';
import 'modules/common/components/Scroll.less';
import {hasScrollbar} from 'modules/common/lib/scrollbarWidth';
import {createEffect, For, JSX, onCleanup, onMount} from 'solid-js';

export type TDirection = 'h' | 'v';

type Props = {
  children: JSX.Element;
  dirList: TDirection[];
};

type Ref<T = HTMLDivElement> = T | ((el: T) => void) | undefined;

const baronInstanceUpdate = (baronInstance: baron) => {
  baronInstance.update();
};

const baronInstanceDispose = (baronInstance: baron) => {
  baronInstance.dispose();
};

export const Scroll = ({children, dirList}: Props) => {
  let baronInstanceList: baron[] = [];

  const refMap: Record<string, Ref> = {};

  const init = (dir: TDirection) => {
    return baron({
      bar: refMap[`bar_${dir}`],
      barOnCls: `Scroll_On_${dir}`,
      direction: dir,
      impact: 'scroller',
      root: refMap.root,
      scroller: refMap.scroller,
      track: refMap[`track_${dir}`],
    });
  };

  onMount(() => {
    if (hasScrollbar) {
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
    <div class="Scroll" ref={refMap.root}>
      <div class="Scroll__Scroller" ref={refMap.scroller}>
        {children}
      </div>
      <For each={dirList}>
        {(dir) => {
          return (
            <div
              class={`Scroll__Track Scroll__Track_${dir}`}
              ref={refMap[`track_${dir}`]}
            >
              <div
                class={`Scroll__Bar Scroll__Bar_${dir}`}
                ref={refMap[`bar_${dir}`]}
              />
            </div>
          );
        }}
      </For>
    </div>
  );
};
