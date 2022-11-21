import React, { Fragment, useState } from "react";
import { IconButton, Menu } from "@mui/material";
import BootstrapTooltip from "../BootstrapTooltip";
import PropTypes from 'prop-types';

/**
 * A component for a button that will drop down a menu that is initially hidden.
 * The children should be the menu. Give tooltip a valid string to have a tooltip
 * wrapped around the button.
 */
function DropDownButton ({
  id,
  children,
  icon,
  sx,
  tooltip = '',
  title,
  name,
  closeOnClick = true
}) {
  const [dropDownListingMenu, setDropDownListingMenu] = useState(null);
  const dropListingMenuFn = (event) => {
    event.stopPropagation();
    setDropDownListingMenu(event.currentTarget);
  };
  const hideListingMenuFn = () => {
    setDropDownListingMenu(null);
  };

  const iconButton = (
    <IconButton
      name={name}
      title={title}
      aria-label={title}
      sx={sx}
      id={id}
      aria-controls={dropDownListingMenu ? 'dropdown-menu' : undefined}
      aria-haspopup="true"
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
      sx={{ ul: { border: 1, borderColor: 'text.primary', borderRadius: '8px' } }}
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

DropDownButton.propTypes = {
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

export default DropDownButton;
