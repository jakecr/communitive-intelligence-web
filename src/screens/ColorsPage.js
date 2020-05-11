import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Switch from 'react-switch'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'

const ColorsPage = () => {
    const { state: color, setColorScheme, changeAccentColor, changeTheme } = useContext(PrepContext)

    const [ accentColor, setAccentColor ] = useState(localStorage.getItem('accentColor') || 'blue')
    const [ theme, setTheme ] = useState(color.theme)

    useEffect(() => {
        setColorScheme()
    }, [])

    useEffect(() => {
        setTheme(color.theme)
    }, [color.theme !== theme])

    return ( 
        <div>
            <title>Colors - Communitive Intelegence</title>
        
            <div 
                className='background' 
                style={{ backgroundColor: color.primary }}
            >
                <Header 
                    theme={color.theme}
                    currentRoute={window.location.pathname}
                    contrastColor={color.contrast}
                />

                <div 
                    className='form form--skinny' 
                    style={{ 
                        backgroundColor: color.secondary, 
                        borderTop: color.isSimple 
                            ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                            : '2px solid ' + color.tertiary, 
                        borderBottom: color.isSimple 
                            ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                            : '2px solid ' + color.tertiary 
                    }}
                >
                    <div className='u-center'>
                        <h1 
                            className='form__header' 
                            style={{ color: color.contrast }}
                        >
                            Color settings:
                        </h1>
                    </div>
                    
                    <div className='u-center'>
                        <h3 
                            className='form__header u-margin-bottom-tiny' 
                            style={{ color: '#777' }}
                        >
                            Dark mode:
                        </h3>
                        <Switch 
                            onColor={color.tertiary}
                            offColor='#a01515'
                            onChange={(value) => {
                                if(value) {
                                    setTheme('dark')
                                    changeTheme({ theme: 'dark' })
                                }else {
                                    setTheme('light')
                                    changeTheme({ theme: 'light' })
                                }
                            }} 
                            checked={theme == 'dark'} 
                        />
                    </div>

                    <div className='u-center'>
                        <h3 
                            className='form__header u-margin-bottom-tiny' 
                            style={{ color: '#777' }}
                        >
                            Accent color:
                        </h3>
                        <select 
                            className='select--small'
                            onChange={(e) => {
                                setAccentColor(e.target.value)
                                changeAccentColor({ color: e.target.value })
                            }} 
                            value={accentColor} 
                        >
                            <option value='blue'>Blue</option>
                            <option value='green'>Green</option>
                            <option value='pink'>Pink</option>
                            <option value='purple'>Purple</option>
                            <option value='red'>Red</option>
                            <option value='orange'>Orange</option>
                            <option value='teal'>Teal</option>
                        </select>
                    </div>
                </div>
            </div>

            <Footer 
                colorPrimary={color.primary}
                colorTertiary={color.tertiary}
                colorContrast={color.contrast}
                theme={color.theme}
            />
        </div>
    )
}

export default ColorsPage