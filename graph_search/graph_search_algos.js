/**
 * @param {div} grid_cell
 * @returns index of gridcell within grid
 */
function get_grid_cell_index(grid_cell) {
  grid_container = document.getElementById("grid_container");
  return Array.prototype.indexOf.call(grid_container.children, grid_cell);
}

/**
 * Calculates the grid coordinate of gridcell
 * @param {div} grid_cell
 * @returns [x, y] coordinate on grid
 */
function get_grid_cell_coord(grid_cell) {
  index = get_grid_cell_index(grid_cell);
  return convert_index_to_coord(index);
}

/**
 * Convert grid coordinate to index
 * @param {Array} coord
 * @returns index of grid cell
 */
function convert_coord_to_index(coord) {
  return GRID_DIM * coord[1] + coord[0];
}

/**
 * Conver index to grid coordinates
 * @param {Array} index
 * @returns grid cordinate of grid cell
 */
function convert_index_to_coord(index) {
  x = index % GRID_DIM;
  y = Math.floor(index / GRID_DIM);
  return [x, y];
}

/**
 * Calculates the orthogonal and diagonal neighbors of grid cell
 * @param {div} grid_cell
 * @returns the orthogonal and diagonal neighbors of grid cell
 */
function get_neighbors_of_8_div(grid_cell) {
  coord = get_grid_cell_coord(grid_cell);
  neighbors = [];

  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (!(i == 0 && j == 0)) {
        neighbor_x = coord[0] + i;
        neighbor_y = coord[1] + j;
        new_coord = [neighbor_x, neighbor_y];
        if (is_coord_walkable(new_coord)) {
          new_div = get_div_from_coord(new_coord);
          neighbors.push(new_div);
        }
      }
    }
  }
  return neighbors;
}

/**
 * Calculates the orthogonal neighbors of grid cell
 * @param {div} grid_cell
 * @returns the orthogonal neighbors of grid cell
 */
function get_neighbors_of_4_div(grid_cell) {
  coord = get_grid_cell_coord(grid_cell);
  neighbors = [];

  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (!(Math.abs(j) == Math.abs(i))) {
        neighbor_x = coord[0] + i;
        neighbor_y = coord[1] + j;
        new_coord = [neighbor_x, neighbor_y];
        if (is_coord_walkable(new_coord)) {
          new_div = get_div_from_coord(new_coord);
          neighbors.push(new_div);
        }
      }
    }
  }
  return neighbors;
}

/**
 * Retrieves the grid cell (div) html element based on index
 * @param {int} index
 * @returns the grid cell (div) html element
 */
function get_div_from_index(index) {
  return grid_container.children[index];
}

/**
 * Retrieves the grid cell (div) html element based on grid coordinate
 * @param {[x, y]} coord
 * @returns the grid cell (div) html element
 */
function get_div_from_coord(coord) {
  index = convert_coord_to_index(coord);
  return get_div_from_index(index);
}

/**
 * Calculates whether the coordinate is walkable
 * @param {[x, y]} coord
 * @returns whether the coordinate is walkable
 */
function is_coord_walkable(coord) {
  x = coord[0];
  y = coord[1];
  if (x < 0 || y < 0 || x >= GRID_DIM || y >= GRID_DIM || is_wall(coord)) {
    return false;
  }
  return true;
}

/**
 * Determines whether the grid cell is a wall
 * @param {[x,y]} coord
 * @returns a boolean indicating whether the grid cell is a wall
 */
function is_wall(coord) {
  div = get_div_from_coord(coord);
  if (div.style.backgroundColor == "black") {
    return true;
  }
  return false;
}

/**
 * Sleeps the program for a certain time (ms)
 * @param {int} ms
 * @returns none
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @returns the list of neighbors based on user selection
 */
function get_neighbors(grid_cell) {
  var selection = get_neighbor_selection();
  switch (selection) {
    case "4":
      return get_neighbors_of_4_div(grid_cell);
    case "8":
      return get_neighbors_of_8_div(grid_cell);
  }
}

function euclidean_heuristic(current, end) {
  var current_coord = get_grid_cell_coord(current);
  var goal_coord = get_grid_cell_coord(end);
  var dist_sqr =
    Math.pow(current_coord[0] - goal_coord[0], 2) +
    Math.pow(current_coord[1] - goal_coord[1], 2);
  return Math.sqrt(dist_sqr);
}

function trace_path(came_from, start, end) {
  var current = end;
  while (current != null) {
    if (current != start && current != end) {
      current.style.backgroundColor = "blue";
    }
    current = came_from.get(current);
  }
}
