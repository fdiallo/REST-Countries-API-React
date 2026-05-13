import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

/**
 * Define the Country type interface
 */
interface Country {
    name: { common: string };
    population: number;
    region: string;
    capital: string[];
    flags: { svg: string };
    cca3: string;
}

/**
 * The home page makes an apit call to fetch all countries
 * Handles searching, filtering by region, and displaying all countries
 */
const Home = () => {
    //Fetch the countries data using the useFetch custom hook
    const { data: countries, loading } = useFetch<Country[]>(`https://restcountries.com/v3.1/all?fields=name,population,region,flags,capital,currencies`);

    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('');

    //Filter the countries list
    const filteredCountries = countries?.filter(c =>
        c.name.common.toLowerCase().includes(search.toLowerCase()) &&
        (region === '' || c.region === region)
    );

    if (loading) return <div className="loader">Loading countries...</div>;

    return (
        <main className="container"><br />
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search for a country..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select style={{ margin: "30px" }} onChange={(e) => setRegion(e.target.value)}>
                    <option value="">Filter by Region</option>
                    {['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
            </div>

            <div className="grid"><br /><br />
                {filteredCountries?.map(country => (
                    <Link to={`/country/${country.name.common}`} key={country.cca3} className="grid-container">
                        <img src={country.flags.svg} width={"300px"} alt={country.name.common} />
                        <div className="grid-item">
                            <h3>{country.name.common}</h3>
                            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                            <p><strong>Region:</strong> {country.region}</p>
                            <p><strong>Capital:</strong> {country.capital?.[0]}</p>
                        </div><br /><hr /><br />
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default Home;
