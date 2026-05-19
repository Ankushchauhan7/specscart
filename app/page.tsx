import Image from "next/image";
import Footer from "./Components/Footer";
import BrandShowcase from "./Components/Brandshowcase ";
import TomArcherCard from "./Components/Tomarchercard";
import BrandImageScroll from "./Components/Tomarchercard";
import QualityAssured from "./Components/Qualityassured";
import Header from "./Components/Header";
import CollectionsCarousel from "./Components/Collectionscarousel";
import JuicyEdit from "./Components/Juicyedit";
import HeroBanner from "./Components/Herobanner";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroBanner
        videoSrc="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
        posterSrc="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1600&q=85"
        brandName="TOM ARCHER"
        tagline="Premium, The Inexpensive Way"
      />
      <JuicyEdit />
      <section
        className="w-full bg-white text-center px-6"
        style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
      >
        <div className="max-w-3xl mx-auto py-12">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide text-gray-900 leading-tight mb-5">
            Elevate your look.
            <br />
            Define your legacy.
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Rhoncus in quis faucibus
            suspendisse id velit odio sed. Nulla euismod purus proin sit lorem
            mauris ultrices amet risus. Vel leo tincidunt in in nec. Tristique
            pulvinar senectus a ultrices pharetra nibh natoque enim.
          </p>
        </div>
      </section>
      <BrandImageScroll
        name="TOM ARCHER"
        image="/scroll.png"
        script={false}
        ctaButtons={["Shop Glasses", "Shop Sunglasses"]}
        accentColor="#1DBFAD"
      />
      <QualityAssured />

      <CollectionsCarousel
        title="COLLECTIONS"
        accentColor="#1DBFAD"
        collections={[
          {
            name: "CONTOUR",
            image: "/slide.png",
            tag: "New",
            href: "/shop/contour",
          },
          { name: "ARC", image: "/slide.png", href: "/shop/arc" },
          {
            name: "VAPOR",
            image: "/slide.png",
            tag: "Hot",
            href: "/shop/vapor",
          },
        ]}
      />
      <section
        className="w-full bg-white text-center px-6 py-12"
        style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
      >
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] text-gray-900 mb-5">
          Other Brands
        </h2>

        <p className="text-sm text-gray-500 leading-relaxed max-w-lg mx-auto">
          Lorem ipsum dolor sit amet consectetur. Rhoncus in quis faucibus
          suspendisse id velit odio sed. Nulla euismod purus proin sit lorem
          mauris ultrices amet risus. Vel leo tincidunt in in nec. Tristique
          pulvinar senectus a ultrices pharetra nibh natoque enim.
        </p>
      </section>
      <BrandShowcase />
      <Footer />
    </div>
  );
}
