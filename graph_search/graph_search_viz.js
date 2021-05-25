START_SELECTION_STRING = "Selection State: Start";
END_SELECTION_STRING = "Selection State: End";
WALL_SELECTION_STRING = "Selection State: Wall";

START_CELL_COLOR = "green";
END_CELL_COLOR = "red";
WALL_CELL_COLOR = "black";

START_CELL_COLOR_RGB = "rgb(0, 128, 0)";
END_CELL_COLOR_RGB = "rgb(255, 0, 0)";

current_start = null;
current_end = null;

/**
 * Creates a n x n grid
 * @param {int} dim
 */
function create_grid(dim) {
  grid_container = document.getElementById("grid_container");
  for (var rows = 0; rows < dim; rows++) {
    for (var col = 0; col < dim; col++) {
      grid_container.appendChild(create_grid_cell());
    }
  }
  $(".grid_cell").width(960 / dim);
  $(".grid_cell").height(960 / dim);
}

/**
 * Creates and formats a gridcell
 * @returns a properly formatted gridcell
 */
function create_grid_cell() {
  var div = document.createElement("div");
  div.setAttribute("class", "grid_cell");
  div.onclick = handle_grid_cell_click;
  return div;
}

/**
 * Defines behavior based on state when gridcell is clicked
 * @param {Event} e
 */
function handle_grid_cell_click(e) {
  target = e.target;
  // Test cite
  neighbors = get_neighbors_of_8_div(target);
  for (var i = 0; i < neighbors.length; i++) {
    neighbor = neighbors[i];
    div = get_div_from_coord(neighbor);
  }

  // Test cite
  switch (get_selection_state()) {
    case START_SELECTION_STRING:
      check_cell_state(END_SELECTION_STRING, target);
      revert_grid_cell(current_start);
      target.style.backgroundColor = START_CELL_COLOR;
      current_start = target;
      break;
    case END_SELECTION_STRING:
      check_cell_state(START_SELECTION_STRING, target);
      revert_grid_cell(current_end);
      target.style.backgroundColor = END_CELL_COLOR;
      current_end = target;
      break;
    case WALL_SELECTION_STRING:
      check_cell_state(START_SELECTION_STRING, target);
      check_cell_state(END_SELECTION_STRING, target);
      if (target.style.backgroundColor == WALL_CELL_COLOR) {
        target.style.backgroundColor = "transparent";
      } else {
        target.style.backgroundColor = WALL_CELL_COLOR;
      }
      break;
  }
}

/**
 * Checks whether a gridcell already has a state and handles
 * @param {string} state
 * @param {div} grid_cell
 */
function check_cell_state(state, grid_cell) {
  if (grid_cell == null) {
    return;
  }
  if (
    state == START_SELECTION_STRING &&
    grid_cell.style.backgroundColor == START_CELL_COLOR
  ) {
    current_start = null;
  } else if (
    state == END_SELECTION_STRING &&
    grid_cell.style.backgroundColor == END_CELL_COLOR
  ) {
    current_end = null;
  }
}

/**
 * Revert the grid cell back to its original color
 * @param {div} grid_cell
 */
function revert_grid_cell(grid_cell) {
  if (grid_cell != null) {
    grid_cell.style.backgroundColor = "transparent";
  }
}

/**
 * Change selection state when S,W,E keys are pressed
 */
function init_state_keys() {
  document.addEventListener("keypress", function (e) {
    switch (e.key) {
      case "S": // Start (upper)
      case "s": // Start (lower)
        set_selection_state(START_SELECTION_STRING);
        break;
      case "E": // End (upper)
      case "e" || 69: // End (lower)
        set_selection_state(END_SELECTION_STRING);
        break;
      case "W": // Wall (upper)
      case "w": // Wall (lower)
        set_selection_state(WALL_SELECTION_STRING);
        break;
    }
  });
}

/**
 * Sets the selection state label text
 * @param {string} new_text
 */
function set_selection_state(new_text) {
  document.getElementById("selection_state").innerText = new_text;
}

/**
 * @returns selection state label text
 */
function get_selection_state() {
  return document.getElementById("selection_state").innerText;
}

/**
 * @returns (str) neighbor selection value
 */
function get_neighbor_selection() {
  var select = document.getElementById("neighbor");
  return select.options[select.selectedIndex].text;
}

function get_search_method_selection() {
  var select = document.getElementById("method");
  return select.options[select.selectedIndex].text;
}
/**
 * Triggers search algorithm when search button is clicked
 */
function init_search_button() {
  btn = document.getElementById("search_button");
  btn.onclick = function () {
    selection = get_search_method_selection();
    var algos = null;
    switch (selection) {
      case "BFS":
        algos = new BFS(current_start, current_end);
        break;
      case "DFS":
        algos = new DFS(current_start, current_end);
        break;
      case "Greedy":
        algos = new Greedy(current_start, current_end);
        break;
      case "UCS":
        algos = new UCS(current_start, current_end);
        break;
      case "A*":
        algos = new AStar(current_start, current_end);
        break;
    }
    algos.run();
  };
}
