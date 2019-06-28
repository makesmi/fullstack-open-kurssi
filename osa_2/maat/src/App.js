import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Country = ({ country }) => {

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} height="100"/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [selection, setSelection] = useState({
    searchText: '',
    selectedCountry: undefined
  })

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all') 
      .then(response => setCountries(response.data))
  }, [])

  const changeSearchText = event => setSelection({
      searchText: event.target.value,
      selectedCountry: undefined
  })

  const selectCountry = country => () => setSelection({
      searchText: selection.searchText,
      selectedCountry: country
  })

  const visibleCountries = 
        selection.selectedCountry ? 
        [selection.selectedCountry] 
        : countries.filter(country => country.name.toLowerCase().indexOf(selection.searchText) > -1)

  return (
    <div>
      <div>
        <label htmlFor='searchInput'>find countries </label>
        <input value={selection.searchText} onChange={changeSearchText} id="searchInput" />
      </div>

      {
        visibleCountries.length > 10 ?
            <div>Too many matches, specify another filter</div>
        : visibleCountries.length === 1 ?
            <Country country={visibleCountries[0]}/>
        : 
            visibleCountries.map(country => 
              <div key={country.numericCode}>
                 {country.name}
                 <button onClick={selectCountry(country)}>show</button>
              </div>)
      }
    </div>
  )
}

export default App;
