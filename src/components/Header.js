import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ theme, currentRoute, contrastColor }) => (
    <div className='u-center'>
        <div className='header'>
            <div className='header__box--logo'>
                <label className='header__label--logo' style={{ color: contrastColor }}>TALK BOT</label>
                <Link 
                    className='header__anker'  
                    to='/' 
                >
                    <img 
                        className='header__logo' 
                        src={theme == 'dark' ? '/assets/light-logo.png' : '/assets/dark-logo.png'}
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/'
                                ? 'brightness(35%)'
                                : 'brightness(110%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/'
                                ? 'brightness(35%)'
                                : 'brightness(110%)'
                        }}
                    />
                </Link>
            </div>

            <div className='header__box--img'>
                <label className='header__label' style={{ color: contrastColor }}>COLORS</label>
                <Link 
                    className='header__anker' 
                    to='/colors'
                >
                    <img 
                        className='header__img' 
                        src='/assets/colors.png' 
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/colors'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/colors'
                                ? 'brightness(10%)'
                                : 'brightness(75%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/colors'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/colors'
                                ? 'brightness(10%)'
                                : 'brightness(75%)'
                        }}
                    />
                </Link>
            </div>
        </div>
    </div>
)

export default Header