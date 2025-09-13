import {createSignal, onMount, Show} from 'solid-js';
import './SvgIcon.less';

type Props = {
  name: string;
};

type TImport = {
  default: TIcon;
};

type TIcon = {
  symbol: string;
  viewBox: string;
};

export const SvgIcon = ({name}: Props) => {
  const [icon, setIcon] = createSignal<TIcon>();

  const onImport = (icon: TImport) => {
    const {symbol, viewBox} = icon.default;
    setIcon({symbol, viewBox});
  };

  const onError = () => {
    console.warn(`${name} is not found`);
  };

  onMount(() => {
    if (name) {
      import(
        /* webpackChunkName: "icon" */
        `icons/${name}.svg`
      )
        .then(onImport)
        .catch(onError);
    } else {
      console.warn(`${name} is not correct`);
    }
  });

  return (
    <Show when={icon()} fallback={null}>
      {(icon) => (
        <svg class="SvgIcon" viewBox={icon().viewBox}>
          <use href={icon().symbol} />
        </svg>
      )}
    </Show>
  );
};
