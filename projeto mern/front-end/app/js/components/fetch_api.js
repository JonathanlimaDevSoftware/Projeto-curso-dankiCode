async function  getData() {
  const url = "http://localhost:3100/";
  try {
    const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

    const json = await response.json();
    console.log(json);
    return json
  } catch (error) {
    console.error(error.message);
  }
}



export default getData;