import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import queryString from "query-string";

import ProductItem from "../../Components/ProductItem/ProductItem";
import { seasons, sex } from "../../Addons/cat";

import "./Shop.css";

const initialState = {
  season: [],
  sex: [],
};
const Shop = () => {
  const { items } = useSelector((state) => state.data);
  const [checked, setChecked] = useState(initialState);
  const history = useHistory();
  const location = useLocation();
  const handleChange = async ({ target }, cat) => {
    let newArray = checked[cat];
    checked[cat].find((i) => i === target.name) ? (newArray = newArray.filter((i) => i !== target.name)) : newArray.push(target.name);
    let allArray = { ...checked, [cat]: newArray };
    setChecked(allArray);
    const searchString =
      (allArray.season.length || allArray.sex.length) &&
      `?${Object.keys(allArray)
        .map((nameKey) => (allArray[nameKey].length ? nameKey + "=" + allArray[nameKey].map((item) => item) : null))
        .join("&")}`;
    history.push({ ...location, search: searchString });
  };

  const filterItems = () => {
    let newArr = [];
    let newArrSex = [];
    checked.season && checked.season.length && checked.season.forEach((season) => (!newArr.length ? (newArr = items.filter((item) => item.season.find((itemf) => itemf === season))) : (newArr = [...new Set([...newArr, ...items.filter((item) => item.season.find((itemf) => itemf === season))])])));
    checked.sex && checked.sex.length && checked.sex.forEach((sexItem) => (newArrSex = [...new Set([...newArrSex, ...(newArr.length ? newArr : items).filter((item) => item.sex === sex.indexOf(sexItem))])]));
    return (checked.season && checked.season.length) || (checked.sex && checked.sex.length) ? (newArrSex.length ? newArrSex : newArr) : items;
  };

  useEffect(() => {
    let parse = queryString.parse(location.search);
    if (Object.keys(parse).length) {
      const test = { ...initialState };
      Object.keys(parse).forEach((item) => parse[item] && (test[item] = parse[item].split(",")));
      setChecked(test);
    }
  }, [location.search]);
  return (
    <div className="container shop">
      <div className="shop__filter">
        <h2>Season</h2>
        <div className="shop__filter-checkeds">
          {seasons.map((item) => (
            <FormControlLabel key={item} control={<Checkbox color="secondary" checked={checked.season && Boolean(checked.season.find((itemS) => itemS === item))} onChange={(e) => handleChange(e, "season")} name={item} />} label={item} />
          ))}
        </div>
        <h2>Sex</h2>
        <div className="shop__filter-checkeds">
          {sex.map((item) => (
            <FormControlLabel key={item} control={<Checkbox color="secondary" checked={checked.sex && Boolean(checked.sex.find((itemS) => itemS === item))} onChange={(e) => handleChange(e, "sex")} name={item} />} label={item} />
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
