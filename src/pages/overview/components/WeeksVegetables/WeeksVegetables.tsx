import { useContext, useEffect, useState } from "react";
import env from "react-dotenv";
import "./WeeksVegetables.css";
import CardVegetables from "../Card_Vege/CardVegetables";
import CardAdd from "../Card_Vege/CardAdd";
import { useHttpClient } from "../../../../shared/hooks/http-hook";
import { AuthContext } from "../../../../shared/context/auth-context";

const WeeksVegetables = (props: {
  showForm: boolean,
  myClick: () => void
}) => 
{
  const auth = useContext(AuthContext);
  const [vegetables, setvegetables] = useState([]);

  const { isLoading, sendRequest } = useHttpClient();
  const [value, setValue] = useState<boolean>(props.showForm);

  useEffect(() => {
    setValue(props.showForm)
    const fetchVegetables = async () => {
      try {
        const responseData = await sendRequest(
          "" + env.apiURL + "/api/panier/week/",
          "GET",
          null,
          {
            "Content-Type" : "application/json",
            Authorization: "Bearer " + auth.token
          }
        );
        setvegetables(responseData.vegetables);
      } catch (err) {}
    };
    fetchVegetables();
  }, [sendRequest,props.showForm]);

  return (
    <div className="weeks">
      <div className="">
        <h1 className="weeks__header__title">Week's vegetables</h1>
        <h3 className="weeks__header__date">as of 25 May 2019, 09:41 PM</h3>
      </div>
      <div className="weeks__vegetables">
        {vegetables.length <= 0 && !isLoading ? (
          <p>No vegetables found.</p>
        ) : null}
        {!isLoading &&
          vegetables.map((vegetable: {
            _id: any,
            name: string,
            imageUrl: string
          }) => (
            <CardVegetables
              key={vegetable._id}
              name={vegetable.name}
              image={vegetable.imageUrl}
              
            />
          ))}
         <CardAdd myClick={props.myClick} />
      </div>
    </div>
  );
};

export default WeeksVegetables;
