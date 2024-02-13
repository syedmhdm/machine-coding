import { useState } from "react";

const countries = [
  { name: "India", code: "In", cities: ["mumbai", "chennai", "kolkata"] },
  { name: "Pakistan", code: "Pak", cities: ["karachi", "lahore"] },
  { name: "Bangladesh", code: "Ban", cities: ["dhaka", "khulna", "Sylhet"] },
];

export default function Seven() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  function handleChangeCountry(e) {
    setCountry(e.target.value);
  }
  function handleChangeCity(e) {
    setCity(e.target.value);
  }

  const selectedCountry = countries.filter((el) => el.name === country);

  const cities = selectedCountry.length === 1 ? selectedCountry[0].cities : [];

  return (
    <div>
      <select value={country} onChange={handleChangeCountry}>
        {countries.map((el, i) => (
          <option key={i} value={el.name}>
            {el.name}
          </option>
        ))}
      </select>
      <select value={city} onChange={handleChangeCity}>
        {cities.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}
