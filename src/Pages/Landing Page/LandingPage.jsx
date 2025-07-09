import React from 'react'
import HeroSection from './Components/HeroSection'
import Quotes from './Components/Quotes'
import HealingSpaceSection from './Components/HealingSpaceSection'
import VoicesOfHealing from './Components/VoiceOfHealing'
import EndingSection from './Components/EndingSection'
import LetGo from './Components/LetGo'

const LandingPage = () => {
  return (
  <>
  <HeroSection/>
  <Quotes/>
  <LetGo/>
  <HealingSpaceSection/>
  <VoicesOfHealing/>
  <EndingSection/>
  </>
  )
}

export default LandingPage
