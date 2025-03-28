import './CafeSteps.css';
import { BsSearch } from "react-icons/bs";
import { BsCupFill } from "react-icons/bs";
import { MdOutlineWeb } from "react-icons/md";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { FaLocationPin } from "react-icons/fa6";

const CafeSteps = () => {
  return (
    <section className="CafeSteps">
      <h2 className="CafeSteps-title">How It Works</h2>
      <div className="CafeSteps-list">

        <div className="CafeSteps-list1">
            <p className="CafeSteps-step-number1">01</p>
            <div className="CafeSteps-item">
                <h3 className="CafeSteps-step-title">SEARCH</h3>
                <p className="CafeSteps-description">
                    Enter the cafe name or location in the search bar to find nearby cafes.
                </p>
                <BsSearch className="CafeStep-search" />
                <BsCupFill className="CafeStep-cup" />
            </div>
        </div>

        <div className="CafeSteps-list1">
            <p className="CafeSteps-step-number2">02</p>
            <div className="CafeSteps-item">
                <h3 className="CafeSteps-step-title">DISCOVER</h3>
                <p className="CafeSteps-description">
                    Browse through a list of cafes with details like ratings, descriptions, and more.
                </p>
                <MdOutlineWeb className="CafeStep-website" />
                
            </div>
        </div>

        <div className="CafeSteps-list1">
            <p className="CafeSteps-step-number3">03</p>
            <div className="CafeSteps-item">
                <h3 className="CafeSteps-step-title">VISIT</h3>
                <p className="CafeSteps-description">
                    Get directions to your chosen cafe, along with opening hours and other essential info.
                </p>
                <HiOutlineBuildingStorefront className="CafeStep-store" />
                <FaLocationPin  className="CafeStep-pin" />
                <BsCupFill className="CafeStep-cup2" />
            </div>
        </div>

      </div>
    </section>
  );
};

export default CafeSteps;
