import React, { Fragment, useState, useRef } from 'react';
import { IconButton, Menu } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import PropTypes from 'prop-types';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useSelector } from 'react-redux';

/**
 * A component for a button that will drop down a menu that is initially hidden.
 * The children should be the menu. Give tooltip a valid string to have a tooltip
 * wrapped around the button.
 */
function ButtonDropDown ({
  id,
  children,
  icon,
  sx,
  tooltip = '',
  title,
  name,
  closeOnClick = true
}) {
  const themeMode = useSelector(state => state.themeMode);
  const [dropDownListingMenu, setDropDownListingMenu] = useState(null);
  const ref = useRef(null);
  const dropListingMenuFn = (event) => {
    event.stopPropagation();
    setDropDownListingMenu(event.currentTarget);
    disableBodyScroll(ref.current);
  };
  const hideListingMenuFn = () => {
    setDropDownListingMenu(null);
    enableBodyScroll(ref.current);
  };

  const iconButton = (
    <IconButton
      ref={ref}
      name={name}
      title={title}
      aria-label={title}
      sx={{
        ...sx,
        border: `2px solid ${((themeMode) === 'dark') ? 'whitesmoke' : 'black'}`
      }}
      id={id}
      aria-controls={dropDownListingMenu ? 'dropdown-menu' : undefined}
      aria-haspopup='true'
      aria-expanded={dropDownListingMenu ? 'true' : undefined}
      onClick={dropListingMenuFn}
    >
      {icon}
    </IconButton>
  )

  const dropDownMenu = (
    <Menu
      disableScrollLock
      anchorEl={dropDownListingMenu}
      open={Boolean(dropDownListingMenu)}
      onClose={hideListingMenuFn}
      onClick={() => {
        if (!closeOnClick) return;
        hideListingMenuFn();
      }}
      MenuListProps={{
        'aria-labelledby': { id },
      }}
      sx={{ ul: { border: 1, borderColor: 'text.primary', borderRadius: '15px' } }}
      PaperProps={{
        sx: {
          borderRadius: '15px'
        }
      }}
    >
      {children}
    </Menu>
  )

  if (tooltip.length > 0) {
    return (
      <Fragment>
        <BootstrapTooltip arrow title={tooltip} placement='top'>
          {iconButton}
        </BootstrapTooltip>
        {dropDownMenu}
      </Fragment>
    )
  } else {
    // Return components that don't have a tooltip
    return (
      <Fragment>
        {iconButton}
        {dropDownMenu}
      </Fragment>
    )
  }
}

ButtonDropDown.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  icon: PropTypes.element,
  sx: PropTypes.object,
  tooltip: PropTypes.string,
  closeOnClick: PropTypes.bool
};

export default ButtonDropDown;
