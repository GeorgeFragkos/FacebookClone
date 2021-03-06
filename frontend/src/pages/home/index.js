import Header from "../../components/header";
import useClickOutside from "../../helpers/clickOutside";
import { useRef, useState } from "react";

export const Home = () => {
  const [visible, setVisible] = useState(true);
  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
  });

  return (
    <div>
      <Header />
      {visible && <div className="card" ref={el}></div>}
    </div>
  );
};
