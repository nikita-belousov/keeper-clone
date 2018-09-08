import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { connect } from 'react-redux'
import style from './MainMenu.module.scss'
import { IconButton } from '..'


const itemsData = [
  [
    {
      title: 'Notes',
      icon: 'sticky-note',
      to: '/home'
    },
    {
      title: 'Reminders',
      icon: 'bell'
    }
  ],
  [
    {
      title: 'Add tag',
      icon: 'plus'
    }
  ],
  [
    {
      title: 'Archive',
      icon: 'archive'
    },
    {
      title: 'Trash',
      icon: 'trash',
      to: '/trash'
    }
  ],
  [
    {
      title: 'Settings',
      icon: 'sliders-h'
    },
    {
      title: 'Leave feedback',
      icon: 'comment-alt'
    },
    {
      title: 'Help',
      icon: 'question'
    },
    {
      title: 'Download app',
      icon: 'mobile'
    },
    {
      title: 'Hotkeys',
      icon: 'keyboard'
    },
  ]
]


const Item = ({ title, icon, to }) =>
  <NavLink to={to || ''} className={style.menuItem}>
    <span className={style.iconWrapper}>
      <i className={`fas fa-${icon}`} />
    </span>
    {title}
  </NavLink>

let MainMenu = ({ isActive }) => {
  const className = classNames({
    [style.wrapper]: true,
    [style.isActive]: isActive
  })

  return (
    <div className={className}>
      <div className={style.menu}>
        {itemsData.map((section, i) =>
          <div key={i} className={style.menuSection}>
            {section.map((item, i) =>
              <Item key={i} {...item} />)}
          </div>)}
      </div>
    </div>
  )
}


const mapStateToProps = state => ({
  isActive: state.common.mainMenuActive
})

MainMenu = connect(mapStateToProps)(MainMenu)

export { MainMenu }