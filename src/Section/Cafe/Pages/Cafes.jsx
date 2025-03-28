// import CafeCard from "../components/CafeCard";
// import cafeData from "../Data/Data";
import CafeNavbar from "../Components/LandingPage/CafeNavbar";
import CafeHero from "../Components/LandingPage/CafeHero";
import CafeFeatured from "../Components/LandingPage/CafeFeatured";
import CafeSteps from "../Components/LandingPage/CafeSteps";

const Cafes = () => {
  return (
    <div>
      <CafeNavbar />
      <CafeHero />
      <CafeFeatured />
      <CafeSteps />
      {/* <h1 className="text-2xl font-bold mt-6 text-center">Explore Cafes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {cafeData.map((cafe) => (
          <CafeCard key={cafe.id} name={cafe.name} image={cafe.image} rating={cafe.rating} />
        ))}
      </div> */}
    </div>
  );
};

export default Cafes;
