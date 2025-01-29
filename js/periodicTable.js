const periodicTable = document.getElementById("periodic-table");
const searchBar = document.getElementById("search-bar");
const elementInfo = document.getElementById("element-info");
const elementName = document.getElementById("element-name");
const atomicNumber = document.getElementById("atomic-number");
const elementSymbol = document.getElementById("element-symbol");
const elementGroup = document.getElementById("element-group");

const elements = [
    { number: 1, symbol: "H", name: "Hydrogen", group: "Nonmetal" },
    { number: 2, symbol: "He", name: "Helium", group: "Noble Gas" },
    { number: 3, symbol: "Li", name: "Lithium", group: "Alkali Metal" },
    { number: 4, symbol: "Be", name: "Beryllium", group: "Alkaline Earth Metal" },
    { number: 5, symbol: "B", name: "Boron", group: "Metalloid" },
    { number: 6, symbol: "C", name: "Carbon", group: "Nonmetal" },
    { number: 7, symbol: "N", name: "Nitrogen", group: "Nonmetal" },
    { number: 8, symbol: "O", name: "Oxygen", group: "Nonmetal" },
    { number: 9, symbol: "F", name: "Fluorine", group: "Halogen" },
    { number: 10, symbol: "Ne", name: "Neon", group: "Noble Gas" },
    { number: 11, symbol: "Na", name: "Sodium", group: "Alkali Metal" },
    { number: 12, symbol: "Mg", name: "Magnesium", group: "Alkaline Earth Metal" },
    { number: 13, symbol: "Al", name: "Aluminum", group: "Post-Transition Metal" },
    { number: 14, symbol: "Si", name: "Silicon", group: "Metalloid" },
    { number: 15, symbol: "P", name: "Phosphorus", group: "Nonmetal" },
    { number: 16, symbol: "S", name: "Sulfur", group: "Nonmetal" },
    { number: 17, symbol: "Cl", name: "Chlorine", group: "Halogen" },
    { number: 18, symbol: "Ar", name: "Argon", group: "Noble Gas" },
    { number: 19, symbol: "K", name: "Potassium", group: "Alkali Metal" },
    { number: 20, symbol: "Ca", name: "Calcium", group: "Alkaline Earth Metal" },
    { number: 21, symbol: "Sc", name: "Scandium", group: "Transition Metal" },
    { number: 22, symbol: "Ti", name: "Titanium", group: "Transition Metal" },
    { number: 23, symbol: "V", name: "Vanadium", group: "Transition Metal" },
    { number: 24, symbol: "Cr", name: "Chromium", group: "Transition Metal" },
    { number: 25, symbol: "Mn", name: "Manganese", group: "Transition Metal" },
    { number: 26, symbol: "Fe", name: "Iron", group: "Transition Metal" },
    { number: 27, symbol: "Co", name: "Cobalt", group: "Transition Metal" },
    { number: 28, symbol: "Ni", name: "Nickel", group: "Transition Metal" },
    { number: 29, symbol: "Cu", name: "Copper", group: "Transition Metal" },
    { number: 30, symbol: "Zn", name: "Zinc", group: "Transition Metal" },
    { number: 31, symbol: "Ga", name: "Gallium", group: "Post-Transition Metal" },
    { number: 32, symbol: "Ge", name: "Germanium", group: "Metalloid" },
    { number: 33, symbol: "As", name: "Arsenic", group: "Metalloid" },
    { number: 34, symbol: "Se", name: "Selenium", group: "Nonmetal" },
    { number: 35, symbol: "Br", name: "Bromine", group: "Halogen" },
    { number: 36, symbol: "Kr", name: "Krypton", group: "Noble Gas" },
    { number: 37, symbol: "Rb", name: "Rubidium", group: "Alkali Metal" },
    { number: 38, symbol: "Sr", name: "Strontium", group: "Alkaline Earth Metal" },
    { number: 39, symbol: "Y", name: "Yttrium", group: "Transition Metal" },
    { number: 40, symbol: "Zr", name: "Zirconium", group: "Transition Metal" },
    { number: 41, symbol: "Nb", name: "Niobium", group: "Transition Metal" },
    { number: 42, symbol: "Mo", name: "Molybdenum", group: "Transition Metal" },
    { number: 43, symbol: "Tc", name: "Technetium", group: "Transition Metal" },
    { number: 44, symbol: "Ru", name: "Ruthenium", group: "Transition Metal" },
    { number: 45, symbol: "Rh", name: "Rhodium", group: "Transition Metal" },
    { number: 46, symbol: "Pd", name: "Palladium", group: "Transition Metal" },
    { number: 47, symbol: "Ag", name: "Silver", group: "Transition Metal" },
    { number: 48, symbol: "Cd", name: "Cadmium", group: "Transition Metal" },
    { number: 49, symbol: "In", name: "Indium", group: "Post-Transition Metal" },
    { number: 50, symbol: "Sn", name: "Tin", group: "Post-Transition Metal" },
    { number: 51, symbol: "Sb", name: "Antimony", group: "Metalloid" },
    { number: 52, symbol: "Te", name: "Tellurium", group: "Metalloid" },
    { number: 53, symbol: "I", name: "Iodine", group: "Halogen" },
    { number: 54, symbol: "Xe", name: "Xenon", group: "Noble Gas" },
    { number: 55, symbol: "Cs", name: "Cesium", group: "Alkali Metal" },
    { number: 56, symbol: "Ba", name: "Barium", group: "Alkaline Earth Metal" },
    { number: 57, symbol: "La", name: "Lanthanum", group: "Lanthanide" },
    { number: 58, symbol: "Ce", name: "Cerium", group: "Lanthanide" },
    { number: 59, symbol: "Pr", name: "Praseodymium", group: "Lanthanide" },
    { number: 60, symbol: "Nd", name: "Neodymium", group: "Lanthanide" },
    { number: 61, symbol: "Pm", name: "Promethium", group: "Lanthanide" },
    { number: 62, symbol: "Sm", name: "Samarium", group: "Lanthanide" },
    { number: 63, symbol: "Eu", name: "Europium", group: "Lanthanide" },
    { number: 64, symbol: "Gd", name: "Gadolinium", group: "Lanthanide" },
    { number: 65, symbol: "Tb", name: "Terbium", group: "Lanthanide" },
    { number: 66, symbol: "Dy", name: "Dysprosium", group: "Lanthanide" },
    { number: 67, symbol: "Ho", name: "Holmium", group: "Lanthanide" },
    { number: 68, symbol: "Er", name: "Erbium", group: "Lanthanide" },
    { number: 69, symbol: "Tm", name: "Thulium", group: "Lanthanide" },
    { number: 70, symbol: "Yb", name: "Ytterbium", group: "Lanthanide" },
    { number: 71, symbol: "Lu", name: "Lutetium", group: "Lanthanide" },
    { number: 72, symbol: "Hf", name: "Hafnium", group: "Transition Metal" },
    { number: 73, symbol: "Ta", name: "Tantalum", group: "Transition Metal" },
    { number: 74, symbol: "W", name: "Tungsten", group: "Transition Metal" },
    { number: 75, symbol: "Re", name: "Rhenium", group: "Transition Metal" },
    { number: 76, symbol: "Os", name: "Osmium", group: "Transition Metal" },
    { number: 77, symbol: "Ir", name: "Iridium", group: "Transition Metal" },
    { number: 78, symbol: "Pt", name: "Platinum", group: "Transition Metal" },
    { number: 79, symbol: "Au", name: "Gold", group: "Transition Metal" },
    { number: 80, symbol: "Hg", name: "Mercury", group: "Transition Metal" },
    { number: 81, symbol: "Tl", name: "Thallium", group: "Post-Transition Metal" },
    { number: 82, symbol: "Pb", name: "Lead", group: "Post-Transition Metal" },
    { number: 83, symbol: "Bi", name: "Bismuth", group: "Post-Transition Metal" },
    { number: 84, symbol: "Po", name: "Polonium", group: "Metalloid" },
    { number: 85, symbol: "At", name: "Astatine", group: "Halogen" },
    { number: 86, symbol: "Rn", name: "Radon", group: "Noble Gas" },
    { number: 87, symbol: "Fr", name: "Francium", group: "Alkali Metal" },
    { number: 88, symbol: "Ra", name: "Radium", group: "Alkaline Earth Metal" },
    { number: 89, symbol: "Ac", name: "Actinium", group: "Actinide" },
    { number: 90, symbol: "Th", name: "Thorium", group: "Actinide" },
    { number: 91, symbol: "Pa", name: "Protactinium", group: "Actinide" },
    { number: 92, symbol: "U", name: "Uranium", group: "Actinide" },
    { number: 93, symbol: "Np", name: "Neptunium", group: "Actinide" },
    { number: 94, symbol: "Pu", name: "Plutonium", group: "Actinide" },
    { number: 95, symbol: "Am", name: "Americium", group: "Actinide" },
    { number: 96, symbol: "Cm", name: "Curium", group: "Actinide" },
    { number: 97, symbol: "Bk", name: "Berkelium", group: "Actinide" },
    { number: 98, symbol: "Cf", name: "Californium", group: "Actinide" },
    { number: 99, symbol: "Es", name: "Einsteinium", group: "Actinide" },
    { number: 100, symbol: "Fm", name: "Fermium", group: "Actinide" },
    { number: 101, symbol: "Md", name: "Mendelevium", group: "Actinide" },
    { number: 102, symbol: "No", name: "Nobelium", group: "Actinide" },
    { number: 103, symbol: "Lr", name: "Lawrencium", group: "Actinide" },
    { number: 104, symbol: "Rf", name: "Rutherfordium", group: "Transition Metal" },
    { number: 105, symbol: "Db", name: "Dubnium", group: "Transition Metal" },
    { number: 106, symbol: "Sg", name: "Seaborgium", group: "Transition Metal" },
    { number: 107, symbol: "Bh", name: "Bohrium", group: "Transition Metal" },
    { number: 108, symbol: "Hs", name: "Hassium", group: "Transition Metal" },
    { number: 109, symbol: "Mt", name: "Meitnerium", group: "Unknown" },
    { number: 110, symbol: "Ds", name: "Darmstadtium", group: "Unknown" },
    { number: 111, symbol: "Rg", name: "Roentgenium", group: "Unknown" },
    { number: 112, symbol: "Cn", name: "Copernicium", group: "Transition Metal" },
    { number: 113, symbol: "Nh", name: "Nihonium", group: "Unknown" },
    { number: 114, symbol: "Fl", name: "Flerovium", group: "Unknown" },
    { number: 115, symbol: "Mc", name: "Moscovium", group: "Unknown" },
    { number: 116, symbol: "Lv", name: "Livermorium", group: "Unknown" },
    { number: 117, symbol: "Ts", name: "Tennessine", group: "Unknown" },
    { number: 118, symbol: "Og", name: "Oganesson", group: "Unknown" },
];

// Element Positions in Standard Periodic Table
const elementPositions = {
    1: [1, 1], 2: [18, 1],
    3: [1, 2], 4: [2, 2],
    5: [13, 2], 6: [14, 2], 7: [15, 2], 8: [16, 2], 9: [17, 2], 10: [18, 2],
    11: [1, 3], 12: [2, 3],
    13: [13, 3], 14: [14, 3], 15: [15, 3], 16: [16, 3], 17: [17, 3], 18: [18, 3],
    19: [1, 4], 20: [2, 4],
    21: [3, 4], 22: [4, 4], 23: [5, 4], 24: [6, 4], 25: [7, 4], 26: [8, 4], 27: [9, 4], 28: [10, 4], 29: [11, 4], 30: [12, 4],
    31: [13, 4], 32: [14, 4], 33: [15, 4], 34: [16, 4], 35: [17, 4], 36: [18, 4],
    37: [1, 5], 38: [2, 5],
    39: [3, 5], 40: [4, 5], 41: [5, 5], 42: [6, 5], 43: [7, 5], 44: [8, 5], 45: [9, 5], 46: [10, 5], 47: [11, 5], 48: [12, 5],
    49: [13, 5], 50: [14, 5], 51: [15, 5], 52: [16, 5], 53: [17, 5], 54: [18, 5],
    55: [1, 6], 56: [2, 6],
    57: [4, 9], 58: [5, 9], 59: [6, 9], 60: [7, 9], 61: [8, 9], 62: [9, 9], 63: [10, 9], 64: [11, 9], 65: [12, 9], 66: [13, 9], 67: [14, 9], 68: [15, 9], 69: [16, 9], 70: [17, 9], 71: [18, 9],
    72: [4, 6], 73: [5, 6], 74: [6, 6], 75: [7, 6], 76: [8, 6], 77: [9, 6], 78: [10, 6], 79: [11, 6], 80: [12, 6],
    81: [13, 6], 82: [14, 6], 83: [15, 6], 84: [16, 6], 85: [17, 6], 86: [18, 6],
    87: [1, 7], 88: [2, 7],
    89: [4, 10], 90: [5, 10], 91: [6, 10], 92: [7, 10], 93: [8, 10], 94: [9, 10], 95: [10, 10], 96: [11, 10], 97: [12, 10], 98: [13, 10], 99: [14, 10], 100: [15, 10], 101: [16, 10], 102: [17, 10], 103: [18, 10],
    104: [4, 7], 105: [5, 7], 106: [6, 7], 107: [7, 7], 108: [8, 7], 109: [9, 7],
    110: [10, 7], 111: [11, 7], 112: [12, 7], 113: [13, 7], 114: [14, 7], 115: [15, 7], 116: [16, 7], 117: [17, 7], 118: [18, 7],
};


document.addEventListener("DOMContentLoaded", renderTable);

document.addEventListener("DOMContentLoaded", () => {
    renderTable();
    searchBar.addEventListener("input", handleSearch);
});

function renderTable() {
    periodicTable.innerHTML = ""; // Clear table
    elements.forEach((element, index) => {
        const el = document.createElement("div");
        el.classList.add("element", groupToClassName(element.group));
        el.style.gridColumnStart = elementPositions[element.number][0];
        el.style.gridRowStart = elementPositions[element.number][1];
        el.textContent = element.symbol;

        el.addEventListener("click", () => {
            displayElementInfo(element);
            highlightElement(el, element.group);
        });

        periodicTable.appendChild(el);
    });
}

function displayElementInfo(element) {
    elementInfo.classList.remove("hidden");
    elementName.textContent = element.name;
    atomicNumber.textContent = element.number;
    elementSymbol.textContent = element.symbol;
    elementGroup.textContent = element.group;
}

function highlightElement(selectedElement, group) {
    document.querySelectorAll(".element").forEach(el => {
        el.classList.remove("highlighted", "group-highlighted");
    });

    selectedElement.classList.add("highlighted");
    document.querySelectorAll(`.${groupToClassName(group)}`).forEach(el => {
        el.classList.add("group-highlighted");
    });
}

function handleSearch() {
    const query = searchBar.value.toLowerCase();
    document.querySelectorAll(".element").forEach((el, index) => {
        const element = elements[index];
        if (
            element.name.toLowerCase().includes(query) && query.length > 2 ||
            element.symbol.toLowerCase().includes(query) && query.length <= 2 ||
            element.number.toString().localeCompare(query) == 0
        ) {
            el.classList.remove("hidden");
        } else {
            el.classList.add("hidden");
        }
    });
}

function groupToClassName(group) {
    return group.toLowerCase().replace(/\s+/g, "-");
}
