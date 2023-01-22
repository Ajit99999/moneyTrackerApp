import "./Shimmer.css";
const Shimmer = () => {
  return (
    <>
    { Array(2).fill("").map((ele,index)=>
    {
        return(
            <div className="shimmer" key={index}>
            <li> Transaction name </li>
            <li> Transaction amount </li>
            <button className="btn">Delete</button>
          </div>
        )
    })  }
      
    </>
  );
};

export default Shimmer;
