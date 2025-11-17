import Banner from "../Banner/Banner"
import Brands from "../Brands/Brands"
import FAQSection from "../FAQ section/FAQSection"
import FeaturesSection from "../Features section/FeaturesSection"
import HowItWorks from "../How it works/HowItWorks"
import OurServices from "../Our services/OurServices"
import Reviews from "../Reviews.jsx/Reviews"

const Home = () => {
  return (
    <div className="space-y-10 p-6">
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <Brands></Brands>
      <FeaturesSection></FeaturesSection>
      <Reviews></Reviews>
      <FAQSection></FAQSection>
    </div>
  )
}

export default Home
