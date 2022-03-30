const xLabels = [];
const yLabels = [];
const yLabels2 = [];



chartIt();

async function chartIt() {
  await getData();
  const ctx = document.getElementById('myChart').getContext('2d');
		const myChart = new Chart(ctx, {
				type: 'line',
				data: {
						labels: xLabels,
						datasets: [{
								label: 'population change Japan',
								data: yLabels,
								backgroundColor:'rgba(255, 99, 132, 0.2)',
								borderColor:'rgba(255, 99, 132, 1)',
								borderWidth: 1
						},
            {
              label: 'population change India',
              data: yLabels2,
              backgroundColor:'rgba(54, 162, 235, 0.2)',
              borderColor:'rgba(54, 162, 235, 1)',
              borderWidth: 2
          }]
				}
		});
};




async function getData() {
  const response = await fetch('Player_Stats_2.csv');
  const data = await response.text();
  //console.log(data, typeof(data));

  const rows = data.split('\n');
  //console.log(rows);

  const rowsToArray = [];
  rows.forEach((elem) => {
    rowsToArray.push(elem.split(','));
  });

  console.log('rowsToArray-',rowsToArray);

  //get all civs
  const allCivs = [];
  for (let i = 1; i < rows.length - 1; i += 1) {
    //console.log(rows[i][1]);
    let row = rows[i].split(',');
    allCivs.push(row[1]);
  };
  //console.log(allCivs);
  const set1 = new Set(allCivs);
  console.log('all game civs---', set1);


  //get all data for one special civ
  let civ = ' CIVILIZATION_JAPAN';

  let specCivArr = rowsToArray.filter((elem) => {
    return elem.includes(civ)
  });
  console.log('specCivArr-',specCivArr);


  //get chosen stats for special civ

  const chosenStatsArr = [];

  specCivArr.forEach((elem) => {
    const chosenStatsObj = {};
    chosenStatsObj.tiles = elem[2];
    chosenStatsObj.buildings = elem[3];
    chosenStatsObj.districts = elem[4];
    chosenStatsObj.population = elem[5];
    chosenStatsArr.push(chosenStatsObj);
  });

  console.log('chosenStatsArr-',chosenStatsArr);
  
  // get one special stat for a chosen civ for graph rendering
  const oneSpecialStat = {};
  oneSpecialStat[civ] = [];
  for (let i = 0; i < chosenStatsArr.length; i += 1) {
    xLabels.push(i + 1);
    yLabels.push(parseFloat(chosenStatsArr[i].population) + 1);
    let obj = {population: null};
    obj.population = chosenStatsArr[i].population;
    oneSpecialStat[civ].push(obj);
  }
  console.log('oneSpecialStat--',oneSpecialStat);


//------------------------------------------
// get data for second civ for multi graph
let civ2 = ' CIVILIZATION_INDIA';

  let specCivArr2 = rowsToArray.filter((elem) => {
    return elem.includes(civ2)
  });
  //get chosen stats for special civ

  const chosenStatsArr2 = [];

  specCivArr2.forEach((elem) => {
    const chosenStatsObj = {};
    chosenStatsObj.tiles = elem[2];
    chosenStatsObj.buildings = elem[3];
    chosenStatsObj.districts = elem[4];
    chosenStatsObj.population = elem[5];
    chosenStatsArr2.push(chosenStatsObj);
  });
  // get one special stat for a chosen civ for graph rendering
  const oneSpecialStat2 = {};
  oneSpecialStat2[civ2] = [];
  for (let i = 0; i < chosenStatsArr2.length; i += 1) {
    yLabels2.push(parseFloat(chosenStatsArr2[i].population) + 1);
    let obj = {population: null};
    obj.population = chosenStatsArr2[i].population;
    oneSpecialStat2[civ2].push(obj);
  }
}
 