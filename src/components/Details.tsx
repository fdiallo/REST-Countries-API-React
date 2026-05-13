import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

const Details = () => {
  const { name } = useParams();
  console.log("URL Params ID: ", {name})
  const navigate = useNavigate();
  
  const { data: countryArr, loading } = useFetch<any[]>(`https://restcountries.com/v3.1/name/${name}`);
  
  if (loading || !countryArr) return <div>Loading details...</div>;
  const country = countryArr[0];

  return (
    <div className="container">
      <br />
      <button style={{display: "flex", justifyContent: "flex-start"}} onClick={() => navigate(-1)} className="btn-back">← Back</button>
      
      <div className="detail-layout"><br />
        <img src={country.flags.svg} width={"300px"} alt={country.name.common} />
        <div className="info">
          <h1>{country.name.common}</h1>
          <div className="info-columns">
            <p><strong>Native Name:</strong> {Object.values(country.name.nativeName as any)[0].common}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Sub Region:</strong> {country.subregion}</p>
          </div>
          
          <div className="borders">
            <strong>Border Countries: </strong>
            {country.borders ? country.borders.map((b: string) => (
              <Link key={b} to={`/country/${b}`} className="tag" style={{marginRight: "10px"}}>{b}</Link>
            )) : 'None'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;