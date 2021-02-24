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
import img10 from "../img/10.png";
import img11 from "../img/11.png";
import img12 from "../img/12.png";

const defaultImg = 'https://via.placeholder.com/261x261?text=CLICK'

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
    },
    {
        name: 10,
        loc: img10,
        flipped: true,
        completed: true
    },
    {
        name: 11,
        loc: img11,
        flipped: true,
        completed: true
    },
    {
        name: 12,
        loc: img12,
        flipped: true,
        completed: true
    }
]
const START_GAME_TIMEOUT = 1000
const RESET_SELECTED_IMG_TIMEOUT = 300
const level = {
    easy: 12,
    medium: 18,
    difficult: 24
}

let imageIndex1, imageName1

function useAsyncReference(value) {
    const ref = useRef(value);
    const [, forceRender] = useState(false);
  
    function updateState(newState) {
      ref.current = newState;
      forceRender(s => !s);
    }
  
    return [ref, updateState];
}

function Images() {
    const [finalGame, setfinalGame] = useAsyncReference([]);
    const [points, setPoints] = useState(0)
    const [hideStart, setHideStart] = useState()
    const [playerName, setPlayerName] = useState()
    const [timer, setTimer] = useState(3)

    const finalGameRef = useRef([])

    const startGame = () => {
        let stopInterval = 0        
        setHideStart(1)
        const timerClock = setInterval(() => {
            setTimer(previousTime => previousTime - 1)
            stopInterval++
            if(stopInterval === 3) {
                clearInterval(timerClock)
                setHideStart()
                flipImageOnStart()
            }
        }, START_GAME_TIMEOUT);
    }


    const flipImageOnStart = () => {
        const hideImg = finalGame.current.map(img => {
            if(img) {
                img.flipped = !img.flipped
                img.completed = !img.completed
            }
            return {...img}
        })
        setfinalGame(hideImg)
    }

    const cleanSelectedImg = (previous, current) => {
        setTimeout(() => {
            const flipBackImages = finalGame.current.map((img, index) => {
                if(index === previous || index === current) {
                    img.flipped = !img.flipped
                }
                  return {...img}
            })
            setfinalGame(flipBackImages)
        }, RESET_SELECTED_IMG_TIMEOUT)
    }

    const match = (previous, current) => {
        const setCompleted = finalGame.current.map((img, index) => {
            if(index === previous || index === current) {
                img.completed = !img.completed
            }
              return {...img}
        })
        setfinalGame(setCompleted)
    }

  const flipOnClick = (indexOfImage, name, completed) => {

    const flipImg = finalGame.current.map((img, index) => {
        if(indexOfImage === index && !img.completed) {
            img.flipped = !img.flipped
        }
          return {...img}
      })
      setfinalGame(flipImg)

      if(!imageName1 && !completed ) {
        imageName1 = name
        imageIndex1 = indexOfImage
      } else if(imageName1 === name && imageIndex1 !== indexOfImage && !completed) {
        setPoints(points + 1)
        match(imageIndex1, indexOfImage)
        imageIndex1 = 0
        imageName1 = ''
      } else if(imageName1 !== name && !completed) {
        cleanSelectedImg(imageIndex1, indexOfImage)
        imageIndex1 = 0
        imageName1 = ''
      } else {
        imageIndex1 = 0
        imageName1 = ''
      }
  }


  const generateLevel = (levelDifficulty) => {
    const selectImg = (limit) => {
        let finalImages = []
        imgs.map(img => {
            finalImages.push({...img})
            finalImages.push({...img})
        })
        let levelList = []
        levelList = finalImages.slice(0,limit)
        let shuffle = levelList.sort(() => Math.random() - 0.5)
        setfinalGame(shuffle)
        startGame()
    }
    switch (levelDifficulty) {
        case 'simple':
            selectImg(level.easy)
          break;
        case 'medium':
            selectImg(level.medium)
          break;
        case 'difficult':
            selectImg(level.difficult)
          break;
      }
  }



  const saveUserName = (e) => {
      e.preventDefault()
      const userName = e.target.elements.user.value.charAt(0).toUpperCase() + e.target.elements.user.value.slice(1)
      const  selectedLevel = e.target.elements.level.value
      setPlayerName(userName)
      generateLevel(selectedLevel)
      
  }

    return (
        <div className='container pb-5'>
            <div className='text-center py-4'>
                {hideStart && playerName  && <h3>{playerName} Your game starts in {timer}</h3>}
                {playerName && !hideStart && <h3>{playerName} Your Points Is {points}</h3>}
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
                                <option value="simple">Simple</option>
                                <option value="medium">Medium</option>
                                <option value="difficult">Difficult</option>
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
                {finalGame.current.map((img, index) => (
                    <div className="col-2 "  >
                        <img className='border img-thumbnail' onClick={() => flipOnClick(index, img.name, img.completed)} key={index} src={img.flipped ? img.loc : defaultImg} alt=""/>
                    </div>
                ))}
            </div>}
        </div>
    )

    
}

export default Images
