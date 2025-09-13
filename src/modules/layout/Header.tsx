import {SvgIcon} from 'modules/common/components/SvgIcon';
import './Header.less';

export const Header = () => (
  <div class="Header">
    <div class="Header__Inner box">
      <div class="Header__Hamburger">
        <button aria-label="Menu" class="Header__HamburgerButton">
          <SvgIcon name="logo" />
        </button>
      </div>
      <a class="Header__Logo" href="/">
        <SvgIcon name="logo" />
      </a>
      <div class="Header__Menu">Menu</div>
    </div>
  </div>
);
