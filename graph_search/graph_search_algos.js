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
