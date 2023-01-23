import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import LoadImg from "../../images/loader.gif";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  /*--------for auto searching while typing-----------*/
    useEffect(() => {
      if (search && auth.token) {
        getDataApi(`search?username=${search}`, auth.token)
          .then((res) => setUsers(res.data.users))
          .catch((err) => {
            dispatch({
              type: GLOBALTYPES.ALERT,
              payload: { err: err.response.data.msg },
            });
          });
      } else {
        setUsers([]);
      }
    }, [search, auth.token, dispatch]);


/*------------for manual searching(hit enter after typing)------------*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataApi(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { err: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };
  return (
    <form className="search_form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        placeholder="search.."
        autoComplete="off"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
      />

      <div className="search_icon">
        <span className="material-icons">search</span>
      </div>

      <div
        className="close_search"
        style={{ opacity: users.length === 0 ? 0 : 1 }}
        onClick={handleClose}
      >
        &times;
      </div>

      <button type="submit" style={{ display: "none" }}>
        Search
      </button>
        
      {load && <img className="loading" src={LoadImg} alt="" />}

      <div className="user">
        {
            search && users.map((user) => (
              <UserCard 
                key={user._id}
                user={user} 
                border="border" 
                handleClose={handleClose}
                />
          ))}
      </div>
    </form>
  );
};

export default Search;
