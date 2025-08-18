import { useEffect, useState } from 'react';
import { NavbarLaw } from './Navbar';
import { PopUp } from './popUp';
import HomeProp from './HomeProp';
import { ArticleProps } from './ArticleProps';
import { Footer } from './Footer';
import "./HomeProp.css"
export function Homepage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem('hasShownPopup');
    if (!hasShown) {
      setShowPopup(true);
      sessionStorage.setItem('hasShownPopup', 'true');
    }
  }, []);

  return (
    <div className='lawHome'>
      <NavbarLaw />
      <HomeProp />
      {showPopup && <PopUp />}
      <ArticleProps />
      <Footer />
    </div>
  );
}
