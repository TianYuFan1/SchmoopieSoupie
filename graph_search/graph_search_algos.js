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
function get_neighbors_of_8(grid_cell) {
  coord = get_grid_cell_coord(grid_cell);
  neighbors = [];

  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (!(i == 0 && j == 0)) {
        neighbor_x = coord[0] + i;
        neighbor_y = coord[1] + j;
        new_coord = [neighbor_x, neighbor_y];
        if (is_coord_walkable(new_coord)) {
          neighbors.push([neighbor_x, neighbor_y]);
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
  if (x < 0 || y < 0 || x >= GRID_DIM || y >= GRID_DIM) {
    return false;
  }
  return true;
}
