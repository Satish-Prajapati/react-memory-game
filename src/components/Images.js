import React, { useState, useRef } from 'react';

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

const defaultImg = 'https://via.placeholder.com/261x261/000/fff?text=</>'

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
    Simple: 6,
    Medium: 9,
    Difficult: 12
}

let imageIndex1, imageName1, gameLevel, stopInterval

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
    const [steps, setSteps] = useState(0)
    const [hideStart, setHideStart] = useState()
    const [playerName, setPlayerName] = useState()
    const [timer, setTimer] = useState(3)
    const [correctSteps, setCorrectSteps] = useState(1)

    const startGame = () => {
        stopInterval = 0    
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
        const finalGameClone = [...finalGame.current]
        const hideImg = finalGameClone.map(img => {
            if(img) {
                img.flipped = false
                img.completed = false
            }
            return {...img}
        })
        setfinalGame(hideImg)
    }

    const cleanSelectedImg = (previous, current) => {
        setTimeout(() => {
            const finalGameClone = [...finalGame.current]
            const flipBackImages = finalGameClone.map((img, index) => {
                if(index === previous || index === current) {
                    img.flipped = !img.flipped
                }
                return {...img}
            })
            setfinalGame(flipBackImages)
        }, RESET_SELECTED_IMG_TIMEOUT)
    }

    const match = (previous, current) => {
        const finalGameClone = [...finalGame.current]
        const setCompleted = finalGameClone.map((img, index) => {
            if(index === previous || index === current) {
                img.completed = !img.completed
            }
              return {...img}
        })
        setfinalGame(setCompleted)
    }

  const flipOnClick = (indexOfImage, name, completed, flipped) => {

    if (!flipped) {
        const finalGameClone = [...finalGame.current]
        const flipImg = finalGameClone.map((img, index) => {
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
            setCorrectSteps(correctSteps - 1)
            setSteps(steps + 1)
            match(imageIndex1, indexOfImage)
            imageIndex1 = 0
            imageName1 = ''
          } else if(imageName1 !== name && !completed) {
            setSteps(steps + 1)
            cleanSelectedImg(imageIndex1, indexOfImage)
            imageIndex1 = 0
            imageName1 = ''
          }
    }
  }
  
  const shuffle = (levelList) => {
    const shuffledImages = levelList.sort(() => Math.random() - 0.5)
    return shuffledImages
  }

  const selectLevelImages = (limit) => {
    const levelList = imgs.slice(0,limit)
    levelList.push(...levelList)
    const randomImages = shuffle(levelList)
    setfinalGame(randomImages)
    startGame()
}

  const generateLevel = (levelDifficulty) => {
    setCorrectSteps(level[levelDifficulty])
    gameLevel = levelDifficulty
    switch (levelDifficulty) {
        case 'Simple':
            selectLevelImages(level.Simple)
          break;
        case 'Medium':
            selectLevelImages(level.Medium)
          break;
        case 'Difficult':
            selectLevelImages(level.Difficult)
          break;
      }
  }

  const generateNewGame = () => {
    setTimer(3)
    setSteps(0)
    setCorrectSteps(level[gameLevel])
    const levelList = imgs.slice(0,level[gameLevel])
    levelList.push(...levelList)
    const randomImages = shuffle(levelList)
      const randomImagesClone = [...randomImages]
      const hideImg = randomImagesClone.map(img => {
          if(img) {
              img.flipped = true
              img.completed = true
          }
          return {...img}
      })
      setfinalGame(hideImg)
    startGame()
  }

  const changeLevel = (e) => {
      e.preventDefault()
      gameLevel = e.target.elements.level.value
      generateNewGame()
  }

  const gameReset = (e) => {
      e.preventDefault()
      generateNewGame()
  }


  const saveUserName = (e) => {
      e.preventDefault()
      const userName = e.target.elements.user.value.charAt(0).toUpperCase() + e.target.elements.user.value.slice(1)
      const  selectedLevel = e.target.elements.level.value
      setPlayerName(userName)
      generateLevel(selectedLevel)
  }
    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/react-memory-game/">MEMORY GAME</a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        </ul>
                        {playerName && <div className="form-inline my-2 my-lg-0">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="game-info mx-2">Level: {gameLevel}</li>
                                <li className="game-info mx-2">Steps: {steps}</li>
                            </ul>
                            {!hideStart && <input type="button" className="btn btn-outline-warning mx-2" onClick={gameReset} value='Reset' />}
                            <button className="btn btn-outline-danger mx-2" onClick={() => window.location.reload(false)} >New Game</button>
                        </div>}
                    </div>
                </div>
            </nav>

            <div className='container pb-5'>
                <div className='text-center py-3'>
                    {hideStart && playerName  && <h3>{playerName} Your game starts in {timer}</h3>}
                    {!playerName && <form onSubmit={saveUserName}>
                    <div className="row form-group ">
                        <label className="col-12 mx-auto h1 pt-5" for="exampleInputEmail1">Welcome To Memory Game</label>
                        <div className="col-12 pt-5">
                            <div className="col-4 mx-auto">
                                <input type="text" name='user' className="form-control" placeholder="Enter Your Name" required/>
                            </div>
                        </div>
                        <div className="col-12 pt-2">
                            <div className='col-4 mx-auto'>
                                <select className="form-select py-2 pr-5" name='level' required>
                                    <option value=''>Select Game Level</option>
                                    <option value="Simple">Simple</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Difficult">Difficult</option>
                                </select>
                            </div>
                        </div>
                        <div className="mx-auto pt-2">
                            <input type="submit" className='btn btn-outline-dark' value="Start Game"/>
                        </div>
                    </div>
                    </form>}
                </div>
                {!correctSteps && <div className="card w-50 mx-auto text-white">
                    <h5 className="card-header bg-dark">{playerName} You Game Finished!</h5>
                    <div className="card-body card-text">
                        <h5 className="card-title">Your Score Card</h5>
                        <p className="card-text">Game Level : {gameLevel}</p>
                        <p className="card-text">Total Steps : {steps}</p>
                        <p className="card-text">Accuracy : {Math.round((level[gameLevel] / steps) * 100)}%</p>

                        <form className="form-inline py-3" onSubmit={changeLevel}>
                            <div className="form-group mb-2 mx-auto">
                                <select className="form-select py-2 pr-5" name='level' required>
                                        <option value=''>Change Level</option>
                                        <option value="Simple">Simple</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Difficult">Difficult</option>
                                </select>
                                <button type="submit" className="btn btn-outline-success ml-2">Change</button>
                            </div>
                        </form>

                        <div className="text-center mx-auto">
                        <input type="button" className="btn btn-outline-warning mx-2" onClick={gameReset} value='Reset' />
                        <button className="btn btn-outline-danger mx-2" onClick={() => window.location.reload(false)} >New Game</button>
                        </div>
                        
                    
                    </div>
                </div>}
                {playerName && correctSteps > 0 && <div className={gameLevel === 'Simple' || gameLevel === 'Difficult' ? "row text-center w-75 mx-auto" : "row text-center"}>
                    {finalGame.current.map((img, index) => (
                        <div className={gameLevel === 'Simple' ? "col-3 pb-3" : "col-2 pb-3"}  >
                            <img className={img.completed ? 'img-thumbnail border-0 completed' : 'img-thumbnail border-0 uncompleted'} style={{width: '150px'}}  onClick={() => flipOnClick(index, img.name, img.completed, img.flipped)} key={index} src={img.flipped ? img.loc : defaultImg} alt=""/>
                        </div>
                    ))}
                </div>}
            </div>
            <footer className="bg-dark text-center text-lg-start fixed-bottom">
                <div className="text-center p-3 text-white">
                    © 2021 Copyright: Satish Prajapati
                </div>
            </footer>
        </>
    )

    
}

export default Images
