import React from "react";
import services from "../../assets/services.PNG";
import ServicesCard from "../../components/Services/ServicesCard";
import seo from "../../assets/seo.png";
import content from "../../assets/content.png";
import dataSec from "../../assets/dataSec.png";
import portfolio from "../../assets/portfolio.png";
import ui from "../../assets/ui.png";
import web from "../../assets/web.png";

function Services() {
  const ourServices = [
    {
      imgSrc: ui,
      text: "UI/Ux Design",
    },
    {
      imgSrc: web,
      text: "Web Development",
    },
    {
      imgSrc: content,
      text: "Content Development",
    },
    {
      imgSrc: portfolio,
      text: "Portfolio Creation",
    },
    {
      imgSrc: seo,
      text: "SEO-Services",
    },
    {
      imgSrc: dataSec,
      text: "Data Security Solutions",
    },
  ];

  return (
    <div className="p-5">
      <div className="w-full ">
        <img src={services} className="w-full rounded-lg" />
      </div>

      <div className="grid grid-cols-12 p-3 gap-5">
        {ourServices?.map(({ imgSrc, text }) => (
          <ServicesCard imgSrc={imgSrc} text={text} />
        ))}
      </div>
    </div>
  );
}

export default Services;
