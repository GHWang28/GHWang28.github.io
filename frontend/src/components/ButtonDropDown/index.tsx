import React, { Fragment, useState, useRef } from 'react';
import { IconButton, Menu, SxProps } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';

type ComponentProps = {
  id?: string,
  children?: React.ReactNode,
  icon?: React.ReactNode,
  sx?: SxProps,
  tooltip?: string,
  title?: string,
  closeOnClick?: boolean
}

/**
 * A component for a button that will drop down a menu that is initially hidden.
 * The children should be the menu. Give tooltip a valid string to have a tooltip
 * wrapped around the button.
 */
const ButtonDropDown = ({
  id,
  children,
  icon,
  sx,
  tooltip = '',
  title,
  closeOnClick = true
}: ComponentProps) => {
  const [dropDownListingMenu, setDropDownListingMenu] = useState<HTMLButtonElement>();
  const ref = useRef<HTMLButtonElement>(null);
  const dropListingMenuFn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setDropDownListingMenu(event.currentTarget);
  };
  const hideListingMenuFn = () => {
    setDropDownListingMenu(undefined);
  };

  const iconButton = (
    <IconButton
      ref={ref}
      title={title}
      aria-label={title}
      sx={sx}
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
        'aria-labelledby': id,
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

export default ButtonDropDown;
