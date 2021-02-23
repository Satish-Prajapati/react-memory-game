import React, { useState, useEffect, useRef } from 'react';

import img1 from "../img/1.png";
import img2 from "../img/2.png";
import img3 from "../img/3.png";
import img4 from "../img/4.png";
import img5 from "../img/5.png";
import img6 from "../img/6.png";
import img7 from "../img/7.png";
import img8 from "../img/8.png";
import img9 from "../img/9.png";

const defaultImg = 'https://via.placeholder.com/261x261?text=CLICK'

function Images() {
    const imgs = [
        {
            name: 1,
            loc: img1,
            flipped: true,
            completed: true
        },
        {
            name: 2,
            loc: img2,
            flipped: true,
            completed: true
        },
        {
            name: 3,
            loc: img3,
            flipped: true,
            completed: true
        },
        {
            name: 4,
            loc: img4,
            flipped: true,
            completed: true
        },
        {
            name: 5,
            loc: img5,
            flipped: true,
            completed: true
        },
        {
            name: 6,
            loc: img6,
            flipped: true,
            completed: true
        },
        {
            name: 7,
            loc: img7,
            flipped: true,
            completed: true
        },
        {
            name: 8,
            loc: img8,
            flipped: true,
            completed: true
        },
        {
            name: 9,
            loc: img9,
            flipped: true,
            completed: true
        }
    ]

    const [finalGame, setfinalGame] = useState([])
    const [preName, setPreName] = useState()
    const [points, setPoints] = useState(0)
    const [selectedImg, setSelectedImg] = useState()
    const [hideStart, setHideStart] = useState()
    const [playerName, setPlayerName] = useState()
    const [timer, setTimer] = useState(3)

    const finalGameRef = useRef([])

    finalGameRef.current = finalGame
    
    useEffect(() => {
        let finalImages = []
        imgs.map(img => {
            finalImages.push({...img})
            finalImages.push({...img})
        })
        setfinalGame(finalImages)
    },[])
    

    const startGame = () => {
        let stopInterval = 0        
        setHideStart(1)
        const START_GAME_TIMEOUT = 1000
        const timerClock = setInterval(() => {
            setTimer(previousTime => previousTime - 1)
            stopInterval++
            if(stopInterval === 3) {
                clearInterval(timerClock)
                stopInterval = 0
                setHideStart()
                flipImageOnStart()
            }
        }, START_GAME_TIMEOUT);
    }


    const flipImageOnStart = () => {
        const hideImg = finalGameRef.current.map(img => {
            if(img) {
                img.flipped = !img.flipped
                img.completed = !img.completed
            }
            return {...img}
        })
        setfinalGame(hideImg)
    }

    const cleanSelectedImg = (previous, current) => {
        const RESET_SELECTED_IMG_TIMEOUT = 300
        setTimeout(() => {
            setfinalGame(finalGame.map((img, index) => {
                if(index === previous || index === current) {
                    img.flipped = !img.flipped
                }
                  return {...img}
              }))
        }, RESET_SELECTED_IMG_TIMEOUT)
    }

    const match = (previous, current) => {
        setfinalGame(finalGame.map((img, index) => {
            if(index === previous || index === current) {
                img.completed = !img.completed
            }
              return {...img}
          }))
    }

  const changeFlip = (ind, name, completed) => {

    const flipImg = finalGame.map((img, index) => {
        if(ind === index && !img.completed) {
            img.flipped = !img.flipped
        }
          return {...img}
      })
      setfinalGame(flipImg)

        if(!preName && !completed) {
            setPreName(name)
            setSelectedImg(ind)
        } else if(preName === name && selectedImg !== ind && !completed) {
            setPoints(points + 1)
            setPreName('')
            match(selectedImg, ind)
        } else if(preName !== name && !completed) {
            setPreName('')
            cleanSelectedImg(selectedImg, ind)
        }
  }


  const generateLevel = (level) => {
    const selectImg = (limit) => {
        let levelList = []
        let i
        for(i = 0; i < limit; i++) {
            levelList.push({...finalGame[i]})
        }
        let shuffle = levelList.sort(() => Math.random() - 0.5)
        setfinalGame(shuffle)
        startGame()
    }
    switch (+level) {
        case 1:
            selectImg(6)
          break;
        case 2:
            selectImg(12)
          break;
        case 3:
            selectImg(18)
          break;
      }
  }



  const saveUserName = (e) => {
      e.preventDefault()
      setPlayerName(e.target.elements.user.value.charAt(0).toUpperCase() + e.target.elements.user.value.slice(1))
      generateLevel(e.target.elements.level.value)
      
  }
    return (
        <div className='container'>
            <div className='text-center py-4'>
                {hideStart && <h3>Your game starts in {timer}</h3>}
                {playerName && <h3>{playerName} Your Points Is {points}</h3>}
                {!playerName && <form onSubmit={saveUserName}>
                <div className="row form-group">
                    <label className="col-12 mx-auto h3" for="exampleInputEmail1">Your Name</label>
                    <div className="col-12">
                        <div className="col-4 mx-auto">
                            <input type="text" name='user' className="form-control" placeholder="Enter Your Name" required/>
                        </div>
                    </div>
                    <div className="col-12 pt-2">
                        <div className='col-4 mx-auto'>
                            <select className="form-select py-2 pr-5" name='level' required>
                                <option value=''>Select Game Level</option>
                                <option value="1">Simple</option>
                                <option value="2">Medium</option>
                                <option value="3">Difficult</option>
                            </select>
                        </div>
                    </div>
                    <div className="mx-auto pt-2">
                        <input type="submit" className='btn btn-primary' value="Start Game"/>
                    </div>
                </div>
                </form>}
            </div>
            {playerName && <div className="row">
                {finalGame.map((img, index) => (
                    <div className="col-2 "  >
                        <img className='border img-thumbnail' onClick={() => changeFlip(index, img.name, img.completed)} key={index} src={img.flipped ? img.loc : defaultImg} alt=""/>
                    </div>
                ))}
            </div>}
        </div>
    )

    
}

export default Images
