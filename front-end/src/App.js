import { useEffect, useState } from "react";

function App() {
  const [cats, setCats] = useState([]);
  const [sortedCats, setSortedCats] = useState([]);
  const [activeSort, setActiveSort] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/cats`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setCats(actualData.cats);
        setSortedCats(actualData.cats);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setCats([]);
        setSortedCats([]);
      })
      .finally(() => {
        setLoading(false);
      });
   }, []);

   const handleNone = () => {
    setActiveSort(1)
    setSortedCats([...cats]);
  }
  const handleMuchCute = () => {
    setActiveSort(2)  // change  button styling
    const newSorted = [...cats].sort((a, b) =>  a.cutenessLevel - b.cutenessLevel);
    setSortedCats(newSorted);
  }
  const handleNotCute = () => {
    setActiveSort(3)
    const newSorted = [...cats].sort((a, b) =>  b.cutenessLevel - a.cutenessLevel);
    setSortedCats(newSorted);
  }
  const getSortBtnClass = (btnNo) => (activeSort === btnNo) ? "btn btn-outline-primary active" : "btn btn-outline-primary";
  return (
    <>
      <div className="container-fluid text-center">
        <div className="row content">
          <div className="col-sm-2">
          </div>
          <div className="col-sm-8">

          <nav className="navbar navbar-light bg-light">
            <div className="btn-group navbar-btn-group" role="group">
              <button type="button" className="btn" disabled>Sorting</button>
              <button type="button" className={getSortBtnClass(1)} onClick={handleNone}>None</button>
              <button type="button" className={getSortBtnClass(2)} onClick={handleMuchCute}>Much Cute</button>
              <button type="button" className={getSortBtnClass(3)} onClick={handleNotCute}>Not Cute</button>
            </div>
          </nav>


          {loading && <div>A moment please...</div>}
          {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
          )}


            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {sortedCats &&
              sortedCats.map(({ name, image }, i) => (
                <div className="col"  key={"col-"+i}>
                  <div className="card">
                    <img src={"/images/"+image} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{name}</h5>
                      
                    </div>
                  </div>
              </div>
                
              ))}
              

            </div>

          </div>
          <div className="col-sm-2">
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
