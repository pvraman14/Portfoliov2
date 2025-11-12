import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import { Aera, Coditas } from "./Experience";
import './Tabs.scss';

const companyData = [
  {
    company: "Aera Technolgy",
    description: <Aera/>,
    logo: "../src/assets/logo_aera.svg",
  },
  {
    company: "Coditas",
    description: <Coditas/>,
    logo: "../src/assets/coditas_logo.webp",
  },
];

const contentVariants = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: "0", opacity: 1 },
  exit: { y: "100%", opacity: 0 },
};

const imgVariants = {
  initial: { scale: 0.1 },
  animate: { scale: 1 },
  exit: { scale: 0.1 },
};

export default function Tab() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="experience-wrapper">
      <motion.h2
        className="experience-main-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Experience
      </motion.h2>

      <AnimatePresence mode="wait">
        <motion.div className="tab__container" key={activeTab}>

          <div className="tab__header">
            {companyData.map((item, index) => (
              <div
                className={`${index === activeTab && "active"} tab__button`}
                key={item.company}
                onClick={() => setActiveTab(index)}>
                {item.company}
              </div>
            ))}
          </div>
          <div className="tab__content">
            <div className="logo__container">
              <motion.img
                src={companyData[activeTab].logo}
                alt=""
                initial="initial"
                animate="animate"
                exit="exit"
                variants={imgVariants}
                transition={{ duration: 0.5 }}
                className="logo"
                sizes="100px"
              />
            </div>
            <motion.div
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}>
              {companyData[activeTab].description}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}