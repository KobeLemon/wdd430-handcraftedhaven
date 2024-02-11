const fetchUserFromDatabase = async () => {
  try {
    const response = await fetch('/api/data');
    if (response.ok) {
      const jsonData = await response.json();
      handleDataFetched(jsonData); // Call a function to handle the fetched data
    } else {
      console.error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleDataFetched = (data: any) => {
  // Do something with the fetched data
  console.log('Fetched data:', data);
};

export default fetchUserFromDatabase;
