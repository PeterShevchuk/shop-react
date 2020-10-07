import React, { useState } from "react";
import { useSelector } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import ProductItem from "../../Components/ProductItem/ProductItem";
import { seasons } from "../../Addons/cat";

import "./Shop.css";
const initialState = {
  season: [],
  category: [],
};

const Shop = () => {
  const { items } = useSelector((state) => state.data);
  const [checked, setChecked] = useState(initialState);
  const handleChange = ({ target }, cat) => {
    let newArray = checked[cat];
    checked[cat].find((i) => i === target.name) ? (newArray = newArray.filter((i) => i !== target.name)) : newArray.push(target.name);
    setChecked({ ...checked, [cat]: newArray });
  };
  const filterItems = () => {
    let newArr = [];
    checked.season.length &&
      checked.season.forEach((season) => {
        newArr = [...newArr, ...items.filter((item) => item.season.find((itemf) => itemf === season))];
      });
    return checked.season.length ? newArr : items;
  };
  return (
    <div className="container shop">
      <div className="shop__filter">
        <h2>Season</h2>
        <div className="shop__filter-checkeds">
          {seasons.map((item) => (
            <FormControlLabel key={item} control={<Checkbox color="secondary" checked={checked.season && Boolean(checked.season.find((itemS) => itemS === item))} onChange={(e) => handleChange(e, "season")} name={item} />} label={item} />
          ))}
        </div>
        {/* <h2>Catrgory</h2>
        <div className="shop__filter-checkeds">
          {category.map((item) => (
            <FormControlLabel key={item} control={<Checkbox color="secondary" checked={checked.category[item] ? checked.category[item] : false} onChange={(e) => handleChange(e, "category")} name={item} />} label={item} />
          ))}
        </div> */}
      </div>
      <ul className="shop__items product">{filterItems().length ? filterItems().map((item) => <ProductItem {...item} key={"shop" + item.date} />) : <li>Nothing found</li>}</ul>
    </div>
  );
};

export default Shop;
