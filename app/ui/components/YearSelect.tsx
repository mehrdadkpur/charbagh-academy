const YearSelect = () => {
  const startYear = 1340;
  const endYear = 1403;
  
  const years = [];
  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }

  return (
    <>
      {years.map((year) => (
        <option key={year} value={year}> {year} </option>
      ))
    }
    </>
  );
};

export default YearSelect;
