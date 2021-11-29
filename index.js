const matrix = [
  [0, 10, 15, 50],
  [10, 0, 35, 25],
  [15, 35, 0, 30],
  [20, 25, 30, 0],
];

// const matrix = [
//   [0, 5, 15, 20, 3, 8, 10, 2, 14, 20, 9, 17, 11, 6, 10], //1
//   [5, 0, 11, 1, 4, 2, 14, 12, 3, 4, 6, 18, 14, 19, 3], //2
//   [15, 11, 0, 16, 15, 3, 5, 7, 14, 18, 17, 3, 13, 9, 10], //3
//   [20, 1, 16, 0, 14, 4, 13, 4, 16, 19, 20, 13, 9, 12, 11], //4
//   [3, 4, 15, 14, 0, 15, 18, 14, 3, 5, 10, 6, 14, 10, 4], //5
//   [8, 2, 3, 4, 15, 0, 10, 11, 4, 8, 9, 11, 23, 12, 7], //6
//   [10, 14, 5, 18, 14, 10, 0, 12, 37, 11, 56, 1, 6, 9, 10], //7
//   [2, 12, 7, 4, 14, 11, 12, 0, 13, 18, 20, 21, 47, 1, 4], //8
//   [14, 3, 14, 16, 3, 4, 37, 12, 0, 9, 7, 10, 20, 45, 3], //9
//   [20, 4, 18, 19, 5, 8, 11, 18, 9, 0, 1, 7, 5, 6, 1], //10
//   [9, 6, 17, 20, 10, 9, 56, 20, 7, 1, 0, 3, 2, 5, 1], //11
//   [17, 18, 3, 13, 6, 11, 1, 21, 10, 7, 3, 0, 4, 1, 8], //12
//   [11, 14, 13, 9, 14, 23, 6, 47, 20, 5, 2, 4, 0, 3, 1], //13
//   [6, 19, 9, 12, 10, 12, 9, 1, 6, 45, 6, 1, 63, 0, 12], //14
//   [10, 3, 10, 11, 4, 7, 10, 4, 19, 3, 1, 8, 4, 1, 0],
// ]; //15

const getNodesPaths = () => {
  const distance = {};

  for (let rowIdx in matrix) {
    const row = matrix[rowIdx];
    distance[`${rowIdx}`] = {};
    for (let colIdx in row) {
      if (colIdx !== rowIdx) {
        distance[`${rowIdx}`][`${colIdx}`] = row[colIdx];
      }
    }
  }

  return distance;
};

const nodesPaths = getNodesPaths();

const getRoute = (paths, start, end, removedPaths = []) => {
  const reachedPaths = [];
  const initialAvailablePaths = Object.keys(nodesPaths[start]).filter(
    (i) => !removedPaths.includes(i)
  );

  const makeRoute = (
    sum = 0,
    order = [start],
    availablePaths = initialAvailablePaths,
    curr = start
  ) => {
    const reached = curr === end;

    if (reached) return reachedPaths.push({ sum, order });

    return availablePaths.map((nextPath) => {
      const nextAvailablePaths = availablePaths.filter(
        (path) => `${path}` !== nextPath
      );
      return makeRoute(
        sum + paths[`${curr}`][`${nextPath}`],
        [...order, nextPath],
        nextAvailablePaths,
        `${nextPath}`,
        end
      );
    });
  };

  makeRoute();
  reachedPaths.sort(({ sum: a }, { sum: b }) => (a > b ? 1 : -1));
  return reachedPaths;
};

const makeDoubleTravel = (start = "0", end = "3") => {
  const [{ order }] = getRoute(nodesPaths, start, end);
  const res = getRoute(
    nodesPaths,
    end,
    start,
    order.filter((i) => ![start, end].includes(i))
  );

  console.log(`
Equipe: TrainNGo
Comentário: Busca de Vizinho mais próximo 
Numero total de cidades: ${matrix[0].length}
Numero de cidades da rota: [${[...order, ...res?.[0]?.order].reduce(
    (acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]),
    []
  )}]
Sequencia da rota: [${[...order, "-", ...res?.[0]?.order]}]
    `);
};

makeDoubleTravel("0", `${matrix.length - 1}`);
