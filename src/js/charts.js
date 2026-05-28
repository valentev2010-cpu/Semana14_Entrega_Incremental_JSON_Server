import Chart from 'chart.js/auto';
import { categorias } from './config.js';

let grafico = null;

export function renderGraficoIntereses(visitantes) {
  const canvas = document.querySelector('#graficoIntereses');
  if (!canvas) return;

  const conteo = visitantes.reduce((acumulador, visitante) => {
    acumulador[visitante.interes] = (acumulador[visitante.interes] ?? 0) + 1;
    return acumulador;
  }, {});

  const labels = Object.keys(categorias).map((clave) => categorias[clave]);
  const data = Object.keys(categorias).map((clave) => conteo[clave] ?? 0);

  if (grafico) {
    grafico.data.labels = labels;
    grafico.data.datasets[0].data = data;
    grafico.update();
    return;
  }

  grafico = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Visitantes por interes',
          data
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    }
  });
}
