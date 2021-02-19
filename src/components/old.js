import React, { useState, useEffect } from 'react';

import img1 from "../img/1.png";
import img2 from "../img/2.png";
import img3 from "../img/3.png";
import img4 from "../img/4.png";
import img5 from "../img/5.png";
import img6 from "../img/6.png";

function Images() {
    const imgs = [
        {
            name: 1,
            loc: img1,
            flipped: true
        },
        {
            name: 2,
            loc: img2,
            flipped: true
        },
        {
            name: 3,
            loc: img3,
            flipped: true
        },
        {
            name: 4,
            loc: img4,
            flipped: true
        },
        {
            name: 5,
            loc: img5,
            flipped: true
        },
        {
            name: 6,
            loc: img6,
            flipped: true
        }
    ]

    // console.log(imgs)

    
    // console.log(finalImages)
    const [finalGame, setfinalGame] = useState([])
    
    useEffect(() => {
        const finalImages = [...imgs, ...imgs]
        // let game1 = imgs.sort(() => Math.random() - 0.5).map((img) => img)
        // let game2 = imgs.sort(() => Math.random() - 0.5).map((img) => img)
        // game1.push(...game2)
        let finalBoard = finalImages.sort(() => Math.random() - 0.5).map((img) => img)
        // const something = finalBoard.map(img => {
        //     img.id=uuidv4()
        //     return img
        // })
        // console.log(finalBoard)
        setfinalGame(finalBoard)
        console.log(finalGame)
        // let hideImg
        // setTimeout(() => {
        //     const hideImg = finalGame.map(img => {
        //         console.log(img)
        //         img.flipped = !img.flipped
        //         return {...img}
        //     })
        //     console.log(hideImg)
        //     setfinalGame(hideImg)
        //     console.log(finalGame)
        // }, 3000)
    },[])

    const startGame = () => {
        setTimeout(() => {
            const hideImg = finalGame.map(img => {
                if(img) {
                    img.flipped = !img.flipped  
                }
                return {...img}
            })
            console.log(hideImg)
            setfinalGame(hideImg)
        }, 3000)
    }
  
  
//   console.log(finalGame)

  const defaultImg = 'https://via.placeholder.com/261x261?text=CLICK'

  const [preName, setPreName] = useState()

  const changeFlip = (ind, name) => {
      const preBoard = [...finalGame]
      console.log(name)
    //   console.log(preName)
        if(!preName) {
            setPreName(name)
            // preName = name 
            console.log(preName)
        } else if(preName === name) {
            console.log('same')
            setPreName('')
        } else if(preName !== name) {
            console.log('Diffrent')
        }
        console.log(preName)
    //   console.log(imgId)
    // setfinalGame()
    // const something2 = finalGame[ind].flipped = !flipped
    const something = finalGame.map((img, index) => {
        if(ind === index) {
            // console.log(img, index)
            img.flipped = !img.flipped
        }
          return {...img}
      })
      setfinalGame(something)

    //   console.log(something)
  }

  
//   const getName = (name) => {
    
//   }

    return (
        <div className='container'>
            {/* <img key={'1'} src={imgs.img1} alt="" srcset=""/> */}
            <button className='btn btn-primary' onClick={startGame}>Start Game</button>
            <div className="row">
                {finalGame.map((img, index) => (
                    <div className="col-2" >
                        <img className='border img-thumbnail' onClick={() => changeFlip(index, img.name)} key={index} src={img.flipped ? img.loc : defaultImg} alt=""/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Images
