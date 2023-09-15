$(function() {
    let baseURL = "https://pokeapi.co/api/v2";
  
    // 1.
    async function part1() {
      let data = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
      console.log(data);
    }
    part1()
  
    // 2.
    async function part2() {
      let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
      );
      pokemonData.forEach(p => console.log(p));
    }
    part2()
  
    // 3.
    async function part3() {
      let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
      );
      let speciesData = await Promise.all(
        pokemonData.map(p => $.getJSON(p.species.url))
      );
      descriptions = speciesData.map(d => {
        let descriptionObj = d.flavor_text_entries.find(
          entry => entry.language.name === "en"
        );
        return descriptionObj
          ? descriptionObj.flavor_text
          : "No description available.";
      });
      descriptions.forEach((desc, i) => {
        console.log(`${pokemonData[i].name}: ${desc}`);
      });
    }
    part3()
});