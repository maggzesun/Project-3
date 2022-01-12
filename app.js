athletes_data_json = d3.json('Resources/athletes_data.json');
console.log(athletes_data_json);

d3.select("#selDataset").append("option").text("Combined");
d3.select("#selDataset").append("option").text("Male");
d3.select("#selDataset").append("option").text("Female");

athletes_data_json.then(function(data) {
  gdp = data.scatter_data.map(function(athlete) {
    return Number(athlete.GDP)/1000000000000;
  });

  //Gold Medal Counts for Female, Male, and Combined by Country  
  gold_medals_combined = data.scatter_data.map(function(athlete) {
    return Number(athlete.Concat_Gold_Medals);
  });

  gold_medals_female = data.scatter_data.map(function(athlete) {
    return Number(athlete.Concat_Gold_Medals_Female);
  });

  gold_medals_male = data.scatter_data.map(function(athlete) {
    return Number(athlete.Concat_Gold_Medals_Male);
  });

  //Gold Medal Counts for Female and Male by Year 
  medal_count_female = data.by_year.map(function(athlete) {
    return Number(athlete.Female_Gold_Count);
  });

  medal_count_male = data.by_year.map(function(athlete) {
    return Number(athlete.Male_Gold_Count);
  });

  year = data.by_year.map(function(athlete) {
    return athlete.Year;
  });

  //Line of Best Fit Data for Female, Male, and Combined
  lobf_combined = data.scatter_data.map(function(athlete) {
    return Number(athlete.Combined_LOBF);
  });

  female_lobf = data.scatter_data.map(function(athlete) {
    return Number(athlete.Female_LOBF);
  });

  male_lobf = data.scatter_data.map(function(athlete) {
    return Number(athlete.Male_LOBF);
  });  

  //Indexing for LOBF
  index = data.scatter_data.map(function(athlete) {
    return Number(athlete.Count) - 1;
  });


  ids = data.meta_data.map(function(athlete) {
    return athlete.ID;
  });

  sex = data.meta_data.map(function(athlete) {
    return athlete.Sex;
  });

  noc = data.meta_data.map(function(athlete) {
    return athlete.NOC;
  });

  year_athlete = data.meta_data.map(function(athlete) {
    return athlete.Year;
  });

  sport = data.meta_data.map(function(athlete) {
    return athlete.Sport;
  });

  medal = data.meta_data.map(function(athlete) {
      return athlete.Medal;
  });

  // Create custom filtering functions
  function selectFemale(person) {
    return person.Sex == 'F';
  }

  function selectMale(person) {
    return person.Sex == 'M';
  }

  // Filter for female meta_data
  let femaleAthletes = data.meta_data.filter(selectFemale);

  // Filter for male meta_data
  let maleAthletes = data.meta_data.filter(selectMale);

  //Female Data
  female_gdp = femaleAthletes.map(function(athlete) {
    return Number(athlete.GDP)/1000000000000;
  });

  female_ids = femaleAthletes.map(function(athlete) {
    return athlete.ID;
  });

  female_sex = femaleAthletes.map(function(athlete) {
    return athlete.Sex;
  });

  female_noc = femaleAthletes.map(function(athlete) {
    return athlete.NOC;
  });

  female_year = femaleAthletes.map(function(athlete) {
    return athlete.Year;
  });

  female_sport = femaleAthletes.map(function(athlete) {
    return athlete.Sport;
  });

  female_medal = femaleAthletes.map(function(athlete) {
    return athlete.Medal;
  }); 

  //Male Data
  male_gdp = maleAthletes.map(function(athlete) {
    return Number(athlete.GDP)/1000000000000;
  });

  male_ids = maleAthletes.map(function(athlete) {
    return athlete.ID;
  });

  male_sex = maleAthletes.map(function(athlete) {
    return athlete.Sex;
  });

  male_noc = maleAthletes.map(function(athlete) {
    return athlete.NOC;
  });

  male_year = maleAthletes.map(function(athlete) {
    return athlete.Year;
  });

  male_sport = maleAthletes.map(function(athlete) {
    return athlete.Sport;
  });

  male_medal = maleAthletes.map(function(athlete) {
      return athlete.Medal;
  }); 

  // Initializes the page with a default plot
  function init() {
    //Introductory text
    d3.select("#intro").text(`Intro`);
    d3.select("#observation").text(`Combined Observations:The r-value is 0.48339650721138233.`);

    //Female Bar Chart
    var ctx_female = document.getElementById('myFemaleChart');
    var myFemaleChart = new Chart(ctx_female, {
      type: 'bar',
      data: {
          labels: year,
          datasets: [
            {
              label: 'Female Gold Medals',
              data: medal_count_female,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 0.5)',
              borderWidth: 1

            }
          ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Total Gold Medals by Year'
          },
        },
        scale: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    //Male Bar Chart
    var ctx_male = document.getElementById('myMaleChart');
    var myMaleChart = new Chart(ctx_male, {
      type: 'bar',
      data: {
          labels: year,
          datasets: [
            {
              label: 'Male Gold Medals',
              data: medal_count_male,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 0.5)',
              borderWidth: 1

            }
          ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Total Gold Medals by Year'
          },
        },
        scale: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    //Scatter Plot
    var scatter_plot = {
      x: gold_medals_combined,
      y: gdp,
      mode: 'markers',
      type: 'scatter',
      marker: {
        color: 'blue'
      }
    };

    var line_of_best_fit = {
      x: index,
      y: lobf_combined,
      mode: 'line',
      type: 'scatter',
      marker: {
        color: 'orange'
      }
    };

    var final_data = [line_of_best_fit, scatter_plot];

    var layout = {
      xaxis: {
        range: [0,200]
      },
      yaxis: {
        range: [0,20]
      },
      showlegend: false
    };

    Plotly.newPlot("scatter_lobf", final_data, layout);
    
    //Stacked Bar Graph
    var ctx = document.getElementById('myjsChart');
    var myChart = new Chart(ctx, {

      type: 'bar',
      data: {
          labels: year,
          datasets: [
            {
              label: 'Male Gold Medals',
              data: medal_count_male,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
              label: 'Female Gold Medals',
              data: medal_count_female,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 0.5)',
              borderWidth: 1

            }
          ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Total Gold Medals by Year'
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            display: true
          },
          y: {
            stacked: true,
            display: false
          }
        }
      }
    });

  }

  // On change to the DOM, call getData()
  d3.selectAll("#selDataset").on("change", getData);

  function getData() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
  
    // Initialize x and y arrays

    var x = [];
    var y = [];
    var scatter_plot = [];

    if (dataset == 'Female') {
      x = gold_medals_female;
      y = gdp;

      //Demographic text
      d3.select("#intro").text(`Female Intro`);
      d3.select("#observation").text(`Female Observations:The r-value is 0.5187506971691347.`);

      //Update Scatter Plot
      scatter_plot = {
        x: x,
        y: y,
        mode: 'markers',
        type: 'scatter',
        marker: {
          color: 'blue'
        }
      };

      line_of_best_fit = {
        x: index,
        y: female_lobf,
        mode: 'lines',
        type: 'scatter',
        marker: {
          color: 'orange'
        }
      };

      final_data = [scatter_plot, line_of_best_fit];

      layout = {
        xaxis: {
          range: [0,120]
        },
        yaxis: {
          range: [0,20]
        },
        showlegend: false
      };

    }
    else if (dataset == 'Male') {
      x = gold_medals_male;
      y = gdp;

      //Demographic text
      d3.select("#intro").text(`Male Text`);
      d3.select("#observation").text(`Male Observation: The r-value is 0.36417906216757046`);

      //Update Scatter Plot
      scatter_plot = {
        x: x,
        y: y,
        mode: 'markers',
        type: 'scatter',
        marker: {
          color: 'blue'
        }
      };

      line_of_best_fit = {
        x: index,
        y: male_lobf,
        mode: 'lines',
        type: 'scatter',
        marker: {
          color: 'orange'
        }
      };

      final_data = [scatter_plot, line_of_best_fit];

      layout = {
        xaxis: {
          range: [0,150]
        },
        yaxis: {
          range: [0,20]
        },
        showlegend: false
      };
    } 
    else if (dataset == 'Combined') {
      x = gold_medals_combined;
      y = gdp;

      //Demographic text
      d3.select("#intro").text(`Combined Text`);
      d3.select("#observation").text(`Combined Observation`);

      //Update Scatter Plot
      scatter_plot = {
        x: x,
        y: y,
        mode: 'markers',
        type: 'scatter',
        marker: {
          color: 'blue'
        }
      };

      line_of_best_fit = {
        x: [0,200],
        y: [0.28495488079576,9.40284963519176],
        type: 'scatter',
        mode: 'lines'
      };
  
      final_data = [scatter_plot, line_of_best_fit];

      layout = {
        xaxis: {
          range: [0,200]
        },
        yaxis: {
          range: [0,20]
        },
        showlegend: false
      };
    } 

  // Call functions to update the charts
    updateScatterPlotly(final_data, layout);
  }

// Update the bar plot's values
  function updateScatterPlotly(new_plot, layout) {
    Plotly.newPlot("scatter_lobf", new_plot, layout);
  }
  
  init();

});

