
import "./MainHeader.css";

const MainHeader = (props: { children: any }) => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
