import styled from 'styled-components';
import SearchResult from './components/SearchResults/SearchResult';
import { useEffect, useState } from 'react';

export const BASE_URL= "http://localhost:9000";

const App = () => {

  const [data, setData] = useState(null);
  const [filterdata, setFilterData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");


  const [loding,setLoding] = useState(false);
  const [error, setError] = useState(null);

  

  useEffect( ()=>{
    const fetchFoodData = async () => {
      setLoding(true)
      try{
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilterData(json)
        setLoding(false)
     
      }
      catch(error) {
        setError("Unable to Fetch the data");
      }
    };
    fetchFoodData();
  }, [])


  const serachFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    if(searchValue === ""){
      setFilterData("null");
    }

    const filter = data?.filter((food) => 
    food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterData(filter);
  }
 
  const filterFood = (type) => {
    if(type === "all"){
      setFilterData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) => 
    food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterData(filter);
    setSelectedBtn(type);

  }

  const filterBtn = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ]


  if(error) return <div>{error}</div>
  if(loding) return <div> Loding... </div>



  return (
    <>
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>

        <div className="search">
          <input  onChange={serachFood}  placeholder="Search Food..." />
        </div>
      </TopContainer>
      <FilterContainer>
      {
        filterBtn.map((value)=>
        (<Button key={value.name} onClick = {()=> filterFood(value.type)}>
        {value.name}
        </Button>
        ))
      }
      
      </FilterContainer>
    
    </Container>
    <SearchResult data = {filterdata}/> 
    </>
    
  )
}

export default App

export const Container = styled.div`
    /* background-color: #323334; */
    max-width: 1200px;
    margin: 0 auto;
`;

const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      /* width: 280px; */
      height: 40px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid red ;
      padding: 0 10px;
      background-color: transparent;
      color: white;
      &::placeholder {
        color: white;
      }
    }
  }

`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background-color: #ff4343;
  color: white;
  border-radius: 5px;
  border: none;
  padding: 6px 12px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;



