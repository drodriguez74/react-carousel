import React, { Component } from 'react'
import styled, { createGlobalStyle, css, keyframes } from 'styled-components'

import IMAGE_1 from '../assets/152495main_image_feature_616b_ys.jpg'
import IMAGE_2 from '../assets/9460194568_b8f0110e97_o.jpg'
import IMAGE_3 from '../assets/as11-40-5944.jpg'
import IMAGE_4 from '../assets/AS11-44-6549HR.jpg'
import IMAGE_5 from '../assets/AS11-44-6581HR.jpg'
import IMAGE_6 from '../assets/ksc-69p-670.jpg'

const GlobalStyle = createGlobalStyle`
    font: "open-sans", sans-serif;
    overflow: hidden;
`

const CarouselContainer = styled.div`
    max-width: 1000px;
    height: 600px;
    position: relative;
    margin: auto;
    background-color: #000;
`

const slideIn = keyframes`
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
`

const item = css`
    position: absolute;
    z-index: 0;
    animation: ${slideIn} 3s;
`;

const SlideshowItem = styled.div`
    ${item};
`

const HiddenSlideshowItem = styled.div`
    ${item};
    display: none;
`

const Picture = styled.img`
    height: 600px;
    width: 100%;
    object-fit: cover;
`
const SliderBullets = styled.div`
    position: relative;
    top: 500px;
    z-index: 1;
    text-align: center;
`
const btn = css`
    height: 50px;
    width: 50px;
    margin: 0 10px;
    background-color: #fff;
    display: inline-block;
    transition: background-color 0.6s ease;
`;

const ActiveBox = styled.span`
  ${btn};
`
const Box = styled.span`
  ${btn};
  opacity: 0.5;
`
const Direction = {
  RIGHT: 1,
  LEFT: -1
}

const TIMER_DELAY = 3000

export default class Slideshow extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0
    }

    this.apolloimages = [IMAGE_1, IMAGE_2, IMAGE_3, IMAGE_4, IMAGE_5, IMAGE_6]
  }

  componentDidMount = () => {
    this.setSlideTimer()
  }

  setSlideTimer = () => {
    this.nextSlideTimer = setInterval(() => {
      this.changeSlide(Direction.RIGHT)
    }, TIMER_DELAY)
  }

  componentWillUnmount = () => {
    clearInterval(this.nextSlideTimer)
  }

  resetInterval = () => {
    clearInterval(this.nextSlideTimer)
    this.setSlideTimer()
  }

  moveToIndex = (index) => {
    this.setState({
      activeIndex: index
    })
    this.resetInterval()
  }

  changeSlide = (direction = Direction.RIGHT) => {
    const { activeIndex } = this.state
    console.log('changeSlide called: ' + direction)
    const lastIndex = this.apolloimages
      ? this.apolloimages.length - 1
      : 0

    let newIndex = activeIndex + direction
    if (newIndex < 0) {
      newIndex = lastIndex
    } else if (newIndex > lastIndex) {
      newIndex = 0
    }
    this.setState({
      activeIndex: newIndex
    }, this.resetInterval)
  }

  render = () => {
    const { activeIndex } = this.state
    return (
      <CarouselContainer>
        <GlobalStyle />
        <div className={'slideshow-item-wrap'}>
          {this.apolloimages.map((img, index) => (
            (index === activeIndex) ? (
              <SlideshowItem key={index}>
                <Picture src={img} alt={`'image'${index}`}/>
              </SlideshowItem>) : (
              <HiddenSlideshowItem key={index}>
                <Picture src={img} alt={`'image'${index}`}/>
              </HiddenSlideshowItem>
            )
          ))}
        </div>
        <SliderBullets>
          {this.apolloimages.map((img, index) => (
            (index === activeIndex) ? (
              <ActiveBox key={index} onClick={() => this.moveToIndex(index)}></ActiveBox> ) : (
              <Box key={index} onClick={() => this.moveToIndex(index)}></Box>
            )
          ))}
        </SliderBullets>
      </CarouselContainer>
    )
  }
}
