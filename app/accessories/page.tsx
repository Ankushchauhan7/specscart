import React from "react";
import BrandScrollSection from "../Components/appple";
import BrandIntroSection from "../Components/appple";
import ActicsEdgeSection from "../Components/Acticsedge";
import InnovationSection from "../Components/Innovationsection";
import BrandSwitcher from "../Components/Brandshowcase ";

const page = () => {
  return (
    <div>
      <BrandIntroSection videoSrc="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" />
      <ActicsEdgeSection glassesImageSrc="/frame.png" />
      <InnovationSection
        introSrc="/intro.png"
        lensSrc="/lens.png"
        frameSrc="/framefe.png"
        designSrc="/design.png"
      />
       <BrandSwitcher/>
    </div>
  );
};

export default page;
