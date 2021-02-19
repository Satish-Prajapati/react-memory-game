import React, { useState, useEffect } from 'react';

import img1 from "../img/1.png";
import img2 from "../img/2.png";
import img3 from "../img/3.png";
import img4 from "../img/4.png";
import img5 from "../img/5.png";
import img6 from "../img/6.png";

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
        }
    ]

    const [finalGame, setfinalGame] = useState([])
    const [preName, setPreName] = useState()
    const [points, setPoints] = useState(0)
    const [selectedImg, setSelectedImg] = useState()
    const [hideStart, setHideStart] = useState()
    const [playerName, setPlayerName] = useState()
    const [timer, setTimer] = useState(3)
    
    useEffect(() => {
        // const finalImages = [...imgs, ...imgs]
        let finalImages = []
        imgs.map(img => {
            finalImages.push(JSON.parse(JSON.stringify(img)))
            finalImages.push(JSON.parse(JSON.stringify(img)))
        })
        //2x Shuffling the images to make it more random
        let shuffle = finalImages.sort(() => Math.random() - 0.5).map((img) => img)
        let finalBoard = shuffle.sort(() => Math.random() - 0.5).map((img) => img)
        setfinalGame(finalBoard)
    },[])

    const startGame = () => {
        // test()
        let stopInterval = 0        
        const timerClock = setInterval(() => {
            setHideStart(1)
            setTimer(previousTime => previousTime - 1)
            stopInterval++
            if(stopInterval === 3) {
                clearInterval(timerClock)
                stopInterval = 0
                setHideStart()
            }
        }, 1000);

        setTimeout(() => {
            const hideImg = finalGame.map(img => {
                if(img) {
                    img.flipped = !img.flipped
                    img.completed = !img.completed
                }
                return {...img}
            })
            setfinalGame(hideImg)
            
        }, 3000)
    }

    const cleanSelectedImg = (previous, current) => {
        setTimeout(() => {
            setfinalGame(finalGame.map((img, index) => {
                if(index === previous || index === current) {
                    img.flipped = !img.flipped
                }
                  return {...img}
              }))
        }, 400)
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
        } else if(preName === name && selectedImg != ind && !completed) {
            setPoints(points + 1)
            setPreName('')
            match(selectedImg, ind)
        } else if(preName !== name && !completed) {
            setPreName('')
            cleanSelectedImg(selectedImg, ind)
        }

    
  }

  const saveUserName = (e) => {
      e.preventDefault()
      setPlayerName(e.target.elements.user.value.charAt(0).toUpperCase() + e.target.elements.user.value.slice(1))
      startGame()
  }

  const disableGame = {
    pointerEvents: 'none',
    opacity: '0.9'
}

    return (
        <div className='container'>
            <div className='text-center py-4'>
                {hideStart && <h3>Your game starts in {timer}</h3>}
                {playerName && <h3>{playerName} Your Points Is {points}</h3>}
                {!playerName && <form onSubmit={saveUserName}>
                <div className="row form-group">
                    <label for="exampleInputEmail1">Your Name</label>
                    <div className="row">
                        <div className="col-3 mx-auto">
                            <input type="text" name='user' className="form-control" placeholder="Enter Your Name" required/>
                        </div>
                    </div>
                    <div className='col-3 mx-auto pt-2'><input type="submit" className='btn btn-primary' value="Start Game"/></div>
                </div>
                </form>}
            </div>
            {playerName && <div className="row">
                {finalGame.map((img, index) => (
                    <div className="col-2 "  >
                        {/* style={disableGameDiv ? disableGame : ''} */}
                        <img className='border img-thumbnail {img.completed ? disableGame : ``}' onClick={() => changeFlip(index, img.name, img.completed)} key={index} src={img.flipped ? img.loc : defaultImg} alt=""/>
                    </div>
                ))}
            </div>}
        </div>
    )

    
}

export default Images
