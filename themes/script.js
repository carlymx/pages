// Define semantic color roles
const COLOR_ROLES = {
    BACKGROUND: 'background',
    FOREGROUND: 'foreground',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    NEUTRAL: 'neutral',
    ACCENT1: 'accent1',
    ACCENT2: 'accent2',
    ACCENT3: 'accent3'
};

// Paletas de colores para cada tema (usando roles semánticos)
const colorPalettes = {
    github: {
        light: {
            name: "GitHub Light",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#ffffff",
                [COLOR_ROLES.FOREGROUND]: "#24292f",
                [COLOR_ROLES.PRIMARY]: "#0969da",
                [COLOR_ROLES.SECONDARY]: "#656d76",
                [COLOR_ROLES.SUCCESS]: "#1a7f37",
                [COLOR_ROLES.ERROR]: "#cf222e",
                [COLOR_ROLES.WARNING]: "#9a6700",
                [COLOR_ROLES.NEUTRAL]: "#f6f8fa",
                [COLOR_ROLES.ACCENT1]: "#ddf4ff",
                [COLOR_ROLES.ACCENT2]: "#dafbe1",
                [COLOR_ROLES.ACCENT3]: "#ffebe9"
            }
        },
        dark: {
            name: "GitHub Dark",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#0d1117",
                [COLOR_ROLES.FOREGROUND]: "#c9d1d9",
                [COLOR_ROLES.PRIMARY]: "#58a6ff",
                [COLOR_ROLES.SECONDARY]: "#656d76",
                [COLOR_ROLES.SUCCESS]: "#3fb950",
                [COLOR_ROLES.ERROR]: "#f85149",
                [COLOR_ROLES.WARNING]: "#d29922",
                [COLOR_ROLES.NEUTRAL]: "#21262d",
                [COLOR_ROLES.ACCENT1]: "#1a232d",
                [COLOR_ROLES.ACCENT2]: "#238636",
                [COLOR_ROLES.ACCENT3]: "#bc8cff"
            }
        }
    },
    vscode: {
        light: {
            name: "VS Code Light",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#ffffff",
                [COLOR_ROLES.FOREGROUND]: "#333333",
                [COLOR_ROLES.PRIMARY]: "#267f99",
                [COLOR_ROLES.SECONDARY]: "#a31515",
                [COLOR_ROLES.SUCCESS]: "#008000",
                [COLOR_ROLES.ERROR]: "#e51400",
                [COLOR_ROLES.WARNING]: "#cd7700",
                [COLOR_ROLES.NEUTRAL]: "#d4d4d4",
                [COLOR_ROLES.ACCENT1]: "#0451a5",
                [COLOR_ROLES.ACCENT2]: "#006400",
                [COLOR_ROLES.ACCENT3]: "#cd3131"
            }
        },
        dark: {
            name: "VS Code Dark",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#1e1e1e",
                [COLOR_ROLES.FOREGROUND]: "#d4d4d4",
                [COLOR_ROLES.PRIMARY]: "#569cd6",
                [COLOR_ROLES.SECONDARY]: "#c586c0",
                [COLOR_ROLES.SUCCESS]: "#6a9955",
                [COLOR_ROLES.ERROR]: "#d16969",
                [COLOR_ROLES.WARNING]: "#dcdcaa",
                [COLOR_ROLES.NEUTRAL]: "#3c3c3c",
                [COLOR_ROLES.ACCENT1]: "#9cdcfe",
                [COLOR_ROLES.ACCENT2]: "#ce9178",
                [COLOR_ROLES.ACCENT3]: "#4ec9b0"
            }
        }
    },
    dracula: {
        light: {
            name: "Dracula Light (Simulated)",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#f0f0f0",
                [COLOR_ROLES.FOREGROUND]: "#44475a",
                [COLOR_ROLES.PRIMARY]: "#855fb0",
                [COLOR_ROLES.SECONDARY]: "#50fa7b",
                [COLOR_ROLES.SUCCESS]: "#50fa7b",
                [COLOR_ROLES.ERROR]: "#ff5555",
                [COLOR_ROLES.WARNING]: "#ffb86c",
                [COLOR_ROLES.NEUTRAL]: "#f8f8f2",
                [COLOR_ROLES.ACCENT1]: "#f1fa8c",
                [COLOR_ROLES.ACCENT2]: "#8be9fd",
                [COLOR_ROLES.ACCENT3]: "#ff79c6"
            }
        },
        dark: {
            name: "Dracula Dark",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#282a36",
                [COLOR_ROLES.FOREGROUND]: "#f8f8f2",
                [COLOR_ROLES.PRIMARY]: "#bd93f9",
                [COLOR_ROLES.SECONDARY]: "#50fa7b",
                [COLOR_ROLES.SUCCESS]: "#50fa7b",
                [COLOR_ROLES.ERROR]: "#ff5555",
                [COLOR_ROLES.WARNING]: "#ffb86c",
                [COLOR_ROLES.NEUTRAL]: "#44475a",
                [COLOR_ROLES.ACCENT1]: "#f1fa8c",
                [COLOR_ROLES.ACCENT2]: "#8be9fd",
                [COLOR_ROLES.ACCENT3]: "#ff79c6"
            }
        }
    },
    solarized: {
        light: {
            name: "Solarized Light",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#fdf6e3",  // Base3
                [COLOR_ROLES.FOREGROUND]: "#586e75",   // Base01
                [COLOR_ROLES.PRIMARY]: "#268bd2",      // Blue
                [COLOR_ROLES.SECONDARY]: "#d33682",    // Magenta
                [COLOR_ROLES.SUCCESS]: "#859900",      // Green
                [COLOR_ROLES.ERROR]: "#dc322f",        // Red
                [COLOR_ROLES.WARNING]: "#b58900",      // Yellow
                [COLOR_ROLES.NEUTRAL]: "#93a1a1",      // Base1
                [COLOR_ROLES.ACCENT1]: "#2aa198",      // Cyan
                [COLOR_ROLES.ACCENT2]: "#cb4b16",      // Orange
                [COLOR_ROLES.ACCENT3]: "#6c71c4"      // Violet
            }
        },
        dark: {
            name: "Solarized Dark",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#002b36",   // Base03
                [COLOR_ROLES.FOREGROUND]: "#839496",   // Base0
                [COLOR_ROLES.PRIMARY]: "#268bd2",      // Blue
                [COLOR_ROLES.SECONDARY]: "#d33682",    // Magenta
                [COLOR_ROLES.SUCCESS]: "#859900",      // Green
                [COLOR_ROLES.ERROR]: "#dc322f",        // Red
                [COLOR_ROLES.WARNING]: "#b58900",      // Yellow
                [COLOR_ROLES.NEUTRAL]: "#657b83",      // Base00
                [COLOR_ROLES.ACCENT1]: "#2aa198",      // Cyan
                [COLOR_ROLES.ACCENT2]: "#cb4b16",      // Orange
                [COLOR_ROLES.ACCENT3]: "#6c71c4"      // Violet
            }
        }
    },
    one: {
        light: {
            name: "One Light",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#fafafa",
                [COLOR_ROLES.FOREGROUND]: "#383a42",
                [COLOR_ROLES.PRIMARY]: "#4078f2",
                [COLOR_ROLES.SECONDARY]: "#a626a4",
                [COLOR_ROLES.SUCCESS]: "#50a14f",
                [COLOR_ROLES.ERROR]: "#e45649",
                [COLOR_ROLES.WARNING]: "#e0a14f",
                [COLOR_ROLES.NEUTRAL]: "#a0a1a7",
                [COLOR_ROLES.ACCENT1]: "#0184bc",
                [COLOR_ROLES.ACCENT2]: "#da8548",
                [COLOR_ROLES.ACCENT3]: "#696c77"
            }
        },
        dark: {
            name: "One Dark",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#282c34",
                [COLOR_ROLES.FOREGROUND]: "#abb2bf",
                [COLOR_ROLES.PRIMARY]: "#61afef",
                [COLOR_ROLES.SECONDARY]: "#c678dd",
                [COLOR_ROLES.SUCCESS]: "#98c379",
                [COLOR_ROLES.ERROR]: "#e06c75",
                [COLOR_ROLES.WARNING]: "#e5c07b",
                [COLOR_ROLES.NEUTRAL]: "#5c6370",
                [COLOR_ROLES.ACCENT1]: "#56b6c2",
                [COLOR_ROLES.ACCENT2]: "#d19a66",
                [COLOR_ROLES.ACCENT3]: "#be5046"
            }
        }
    },
    monokai: {
        light: {
            name: "Monokai Light (Simulated)",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#f8f8f2",
                [COLOR_ROLES.FOREGROUND]: "#272822",
                [COLOR_ROLES.PRIMARY]: "#66d9ef",
                [COLOR_ROLES.SECONDARY]: "#ae81ff",
                [COLOR_ROLES.SUCCESS]: "#a6e22e",
                [COLOR_ROLES.ERROR]: "#f92672",
                [COLOR_ROLES.WARNING]: "#fd971f",
                [COLOR_ROLES.NEUTRAL]: "#a59f85",
                [COLOR_ROLES.ACCENT1]: "#e6db74",
                [COLOR_ROLES.ACCENT2]: "#a1efe4",
                [COLOR_ROLES.ACCENT3]: "#75715e"
            }
        },
        dark: {
            name: "Monokai Dark",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#272822",
                [COLOR_ROLES.FOREGROUND]: "#f8f8f2",
                [COLOR_ROLES.PRIMARY]: "#66d9ef",
                [COLOR_ROLES.SECONDARY]: "#ae81ff",
                [COLOR_ROLES.SUCCESS]: "#a6e22e",
                [COLOR_ROLES.ERROR]: "#f92672",
                [COLOR_ROLES.WARNING]: "#fd971f",
                [COLOR_ROLES.NEUTRAL]: "#49483e",
                [COLOR_ROLES.ACCENT1]: "#e6db74",
                [COLOR_ROLES.ACCENT2]: "#a1efe4",
                [COLOR_ROLES.ACCENT3]: "#75715e"
            }
        }
    },
    material: {
        light: {
            name: "Material Light",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#ffffff",
                [COLOR_ROLES.FOREGROUND]: "#000000",
                [COLOR_ROLES.PRIMARY]: "#2196f3",
                [COLOR_ROLES.SECONDARY]: "#9c27b0",
                [COLOR_ROLES.SUCCESS]: "#4caf50",
                [COLOR_ROLES.ERROR]: "#f44336",
                [COLOR_ROLES.WARNING]: "#ff9800",
                [COLOR_ROLES.NEUTRAL]: "#e0e0e0",
                [COLOR_ROLES.ACCENT1]: "#e91e63",
                [COLOR_ROLES.ACCENT2]: "#00bcd4",
                [COLOR_ROLES.ACCENT3]: "#009688"
            }
        },
        dark: {
            name: "Material Dark",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#121212",
                [COLOR_ROLES.FOREGROUND]: "#e0e0e0",
                [COLOR_ROLES.PRIMARY]: "#2196f3",
                [COLOR_ROLES.SECONDARY]: "#9c27b0",
                [COLOR_ROLES.SUCCESS]: "#4caf50",
                [COLOR_ROLES.ERROR]: "#f44336",
                [COLOR_ROLES.WARNING]: "#ff9800",
                [COLOR_ROLES.NEUTRAL]: "#424242",
                [COLOR_ROLES.ACCENT1]: "#e91e63",
                [COLOR_ROLES.ACCENT2]: "#00bcd4",
                [COLOR_ROLES.ACCENT3]: "#009688"
            }
        }
    },
    nord_polar_night: {
        light: {
            name: "Nord Polar Night",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#2e3440", // Polar Night 0
                [COLOR_ROLES.FOREGROUND]: "#eceff4", // Snow Storm 3
                [COLOR_ROLES.PRIMARY]: "#88c0d0", // Frost 2
                [COLOR_ROLES.SECONDARY]: "#8fbcbb", // Frost 1
                [COLOR_ROLES.SUCCESS]: "#a3be8c", // Aurora 4
                [COLOR_ROLES.ERROR]: "#bf616a", // Aurora 1
                [COLOR_ROLES.WARNING]: "#ebcb8b", // Aurora 3
                [COLOR_ROLES.NEUTRAL]: "#4c566a", // Polar Night 4
                [COLOR_ROLES.ACCENT1]: "#5e81ac", // Frost 4
                [COLOR_ROLES.ACCENT2]: "#81a1c1", // Frost 3
                [COLOR_ROLES.ACCENT3]: "#b48ead" // Aurora 5
            }
        },
        dark: {
            name: "Nord Polar Night",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#2e3440", // Polar Night 0
                [COLOR_ROLES.FOREGROUND]: "#eceff4", // Snow Storm 3
                [COLOR_ROLES.PRIMARY]: "#88c0d0", // Frost 2
                [COLOR_ROLES.SECONDARY]: "#8fbcbb", // Frost 1
                [COLOR_ROLES.SUCCESS]: "#a3be8c", // Aurora 4
                [COLOR_ROLES.ERROR]: "#bf616a", // Aurora 1
                [COLOR_ROLES.WARNING]: "#ebcb8b", // Aurora 3
                [COLOR_ROLES.NEUTRAL]: "#4c566a", // Polar Night 4
                [COLOR_ROLES.ACCENT1]: "#5e81ac", // Frost 4
                [COLOR_ROLES.ACCENT2]: "#81a1c1", // Frost 3
                [COLOR_ROLES.ACCENT3]: "#b48ead" // Aurora 5
            }
        }
    },
    nord_snow_storm: {
        light: {
            name: "Nord Snow Storm",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#eceff4", // Snow Storm 3
                [COLOR_ROLES.FOREGROUND]: "#2e3440", // Polar Night 0
                [COLOR_ROLES.PRIMARY]: "#5e81ac", // Frost 4
                [COLOR_ROLES.SECONDARY]: "#81a1c1", // Frost 3
                [COLOR_ROLES.SUCCESS]: "#a3be8c", // Aurora 4
                [COLOR_ROLES.ERROR]: "#bf616a", // Aurora 1
                [COLOR_ROLES.WARNING]: "#ebcb8b", // Aurora 3
                [COLOR_ROLES.NEUTRAL]: "#d8dee9", // Snow Storm 1
                [COLOR_ROLES.ACCENT1]: "#8fbcbb", // Frost 1
                [COLOR_ROLES.ACCENT2]: "#88c0d0", // Frost 2
                [COLOR_ROLES.ACCENT3]: "#b48ead" // Aurora 5
            }
        },
        dark: {
            name: "Nord Snow Storm",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#eceff4", // Snow Storm 3
                [COLOR_ROLES.FOREGROUND]: "#2e3440", // Polar Night 0
                [COLOR_ROLES.PRIMARY]: "#5e81ac", // Frost 4
                [COLOR_ROLES.SECONDARY]: "#81a1c1", // Frost 3
                [COLOR_ROLES.SUCCESS]: "#a3be8c", // Aurora 4
                [COLOR_ROLES.ERROR]: "#bf616a", // Aurora 1
                [COLOR_ROLES.WARNING]: "#ebcb8b", // Aurora 3
                [COLOR_ROLES.NEUTRAL]: "#d8dee9", // Snow Storm 1
                [COLOR_ROLES.ACCENT1]: "#8fbcbb", // Frost 1
                [COLOR_ROLES.ACCENT2]: "#88c0d0", // Frost 2
                [COLOR_ROLES.ACCENT3]: "#b48ead" // Aurora 5
            }
        }
    },
    nord_frost: {
        light: {
            name: "Nord Frost",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#eceff4", // Snow Storm 3
                [COLOR_ROLES.FOREGROUND]: "#2e3440", // Polar Night 0
                [COLOR_ROLES.PRIMARY]: "#88c0d0", // Frost 2
                [COLOR_ROLES.SECONDARY]: "#8fbcbb", // Frost 1
                [COLOR_ROLES.SUCCESS]: "#8fbcbb", // Frost 1 (Aurora 4 alternative)
                [COLOR_ROLES.ERROR]: "#bf616a", // Aurora 1
                [COLOR_ROLES.WARNING]: "#ebcb8b", // Aurora 3
                [COLOR_ROLES.NEUTRAL]: "#d8dee9", // Snow Storm 1
                [COLOR_ROLES.ACCENT1]: "#8fbcbb", // Frost 1
                [COLOR_ROLES.ACCENT2]: "#88c0d0", // Frost 2
                [COLOR_ROLES.ACCENT3]: "#81a1c1" // Frost 3
            }
        },
        dark: {
            name: "Nord Frost",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#2e3440", // Polar Night 0
                [COLOR_ROLES.FOREGROUND]: "#eceff4", // Snow Storm 3
                [COLOR_ROLES.PRIMARY]: "#88c0d0", // Frost 2
                [COLOR_ROLES.SECONDARY]: "#8fbcbb", // Frost 1
                [COLOR_ROLES.SUCCESS]: "#8fbcbb", // Frost 1 (Aurora 4 alternative)
                [COLOR_ROLES.ERROR]: "#bf616a", // Aurora 1
                [COLOR_ROLES.WARNING]: "#ebcb8b", // Aurora 3
                [COLOR_ROLES.NEUTRAL]: "#4c566a", // Polar Night 4
                [COLOR_ROLES.ACCENT1]: "#5e81ac", // Frost 4
                [COLOR_ROLES.ACCENT2]: "#81a1c1", // Frost 3
                [COLOR_ROLES.ACCENT3]: "#88c0d0" // Frost 2
            }
        }
    },
    nord_aurora: {
        light: {
            name: "Nord Aurora",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#eceff4", // Snow Storm 3
                [COLOR_ROLES.FOREGROUND]: "#2e3440", // Polar Night 0
                [COLOR_ROLES.PRIMARY]: "#bf616a", // Aurora 1 (Red)
                [COLOR_ROLES.SECONDARY]: "#d08770", // Aurora 2 (Orange)
                [COLOR_ROLES.SUCCESS]: "#a3be8c", // Aurora 4 (Green)
                [COLOR_ROLES.ERROR]: "#bf616a", // Aurora 1 (Red)
                [COLOR_ROLES.WARNING]: "#ebcb8b", // Aurora 3 (Yellow)
                [COLOR_ROLES.NEUTRAL]: "#d8dee9", // Snow Storm 1
                [COLOR_ROLES.ACCENT1]: "#8fbcbb", // Frost 1
                [COLOR_ROLES.ACCENT2]: "#88c0d0", // Frost 2
                [COLOR_ROLES.ACCENT3]: "#b48ead" // Aurora 5 (Purple)
            }
        },
        dark: {
            name: "Nord Aurora",
            colors: {
                [COLOR_ROLES.BACKGROUND]: "#2e3440", // Polar Night 0
                [COLOR_ROLES.FOREGROUND]: "#eceff4", // Snow Storm 3
                [COLOR_ROLES.PRIMARY]: "#bf616a", // Aurora 1 (Red)
                [COLOR_ROLES.SECONDARY]: "#d08770", // Aurora 2 (Orange)
                [COLOR_ROLES.SUCCESS]: "#a3be8c", // Aurora 4 (Green)
                [COLOR_ROLES.ERROR]: "#bf616a", // Aurora 1 (Red)
                [COLOR_ROLES.WARNING]: "#ebcb8b", // Aurora 3 (Yellow)
                [COLOR_ROLES.NEUTRAL]: "#4c566a", // Polar Night 4
                [COLOR_ROLES.ACCENT1]: "#5e81ac", // Frost 4
                [COLOR_ROLES.ACCENT2]: "#81a1c1", // Frost 3
                [COLOR_ROLES.ACCENT3]: "#b48ead" // Aurora 5 (Purple)
            }
        }
    }
};

// Variables
let currentTheme = 'github';
let currentMode = 'light';
let selectedColorBox = null;
let originalColors = {}; // Store original colors to enable reset

// DOM Elements
const themeButtons = document.querySelectorAll('.theme-btn');
const modeButtons = document.querySelectorAll('.mode-btn');
const paletteDisplay = document.querySelector('.palette-display');
const currentThemeTitle = document.getElementById('current-theme');
const colorPickerContainer = document.getElementById('colorPickerContainer');
const colorOptionsEl = document.getElementById('colorOptions');
const customColorPicker = document.getElementById('customColorPicker');
const applyCustomColorBtn = document.getElementById('applyCustomColor');
const resetColorBtn = document.getElementById('resetColor');
const updateThemeBtn = document.getElementById('updateThemeBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderPalette();
    setupEventListeners();
    applyThemeToInterface();
    updateMobilePreviewFromCurrentTheme();
});

// Set up event listeners
function setupEventListeners() {
    // Theme buttons
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTheme = btn.dataset.theme;
            updateDisplay();
            
            // Reapply theme to interface when theme changes
            applyThemeToInterface();
        });
    });

    // Mode buttons
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMode = btn.dataset.mode;
            updateDisplay();
            
            // Update body class for dark mode
            if (currentMode === 'dark') {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            
            // Reapply theme to interface when mode changes
            applyThemeToInterface();
        });
    });

    // Custom color picker
    applyCustomColorBtn.addEventListener('click', () => {
        if (selectedColorBox) {
            const newColor = customColorPicker.value;
            selectedColorBox.style.backgroundColor = newColor;
            
            // Update the text color for contrast
            selectedColorBox.style.color = getContrastColor(newColor);
            selectedColorBox.textContent = newColor.toUpperCase();
            selectedColorBox.dataset.hex = newColor;
            
            // Refresh the theme preview
            applyThemeToInterface();
            
            // Also update mobile preview
            updateMobilePreviewFromCurrentTheme();
        }
    });
    
    // Reset color button
    resetColorBtn.addEventListener('click', () => {
        if (selectedColorBox) {
            const originalColor = selectedColorBox.dataset.originalHex;
            selectedColorBox.style.backgroundColor = originalColor;
            
            // Update the text color for contrast
            selectedColorBox.style.color = getContrastColor(originalColor);
            selectedColorBox.textContent = originalColor.toUpperCase();
            selectedColorBox.dataset.hex = originalColor;
            
            // Refresh the theme preview
            applyThemeToInterface();
            
            // Also update mobile preview
            updateMobilePreviewFromCurrentTheme();
        }
    });

    // Click outside to close color picker
    document.addEventListener('click', (e) => {
        if (!colorPickerContainer.contains(e.target) && 
            !Array.from(document.querySelectorAll('.color-box')).includes(e.target)) {
            colorPickerContainer.classList.remove('visible');
        }
    });
    
    // Update theme button
    updateThemeBtn.addEventListener('click', updateThemeFromPalette);
}

// Update the display when theme/mode changes
function updateDisplay() {
    const themeName = colorPalettes[currentTheme][currentMode].name;
    currentThemeTitle.textContent = themeName;
    renderPalette();
    
    // Apply theme colors to the interface
    applyThemeToInterface();
    
    // Also update the mobile preview with the new theme
    updateMobilePreviewFromCurrentTheme();
}

// Update mobile preview based on current theme without customizations
function updateMobilePreviewFromCurrentTheme() {
    const themeColors = colorPalettes[currentTheme][currentMode].colors;
    
    // Use semantic colors directly
    const backgroundColor = themeColors[COLOR_ROLES.BACKGROUND] || (currentMode === 'light' ? '#ffffff' : '#1a1a1a');
    const foregroundColor = themeColors[COLOR_ROLES.FOREGROUND] || (currentMode === 'light' ? '#000000' : '#f0f0f0');
    const primaryColor = themeColors[COLOR_ROLES.PRIMARY] || (currentMode === 'light' ? '#0969da' : '#58a6ff');
    const secondaryColor = themeColors[COLOR_ROLES.SECONDARY] || primaryColor;
    
    // Update mobile preview with theme colors
    updateMobilePreview(backgroundColor, foregroundColor, primaryColor, secondaryColor);
}

// Apply theme colors to the WebArena interface itself
function applyThemeToInterface() {
    const themeColors = colorPalettes[currentTheme][currentMode].colors;
    
    // Get semantic colors directly
    const backgroundColor = themeColors[COLOR_ROLES.BACKGROUND] || (currentMode === 'light' ? '#ffffff' : '#1a1a1a');
    const foregroundColor = themeColors[COLOR_ROLES.FOREGROUND] || (currentMode === 'light' ? '#000000' : '#f0f0f0');
    const primaryColor = themeColors[COLOR_ROLES.PRIMARY] || (currentMode === 'light' ? '#0969da' : '#58a6ff');
    
    // Apply colors to the body and interface elements
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = foregroundColor;
    
    // Update header
    const header = document.querySelector('header');
    if (header) {
        header.style.backgroundColor = backgroundColor;
        header.style.color = foregroundColor;
    }
    
    // Update selectors with transparency
    const themeSelector = document.querySelector('.theme-selector');
    const modeSelector = document.querySelector('.mode-selector');
    const paletteDisplay = document.querySelector('.palette-display');
    
    if (themeSelector) {
        themeSelector.style.backgroundColor = hexToRgba(adjustColorLightness(backgroundColor, currentMode === 'dark' ? 0.1 : -0.05), 0.7);
    }
    if (modeSelector) {
        modeSelector.style.backgroundColor = hexToRgba(adjustColorLightness(backgroundColor, currentMode === 'dark' ? 0.1 : -0.05), 0.7);
    }
    if (paletteDisplay) {
        paletteDisplay.style.backgroundColor = hexToRgba(adjustColorLightness(backgroundColor, currentMode === 'dark' ? 0.1 : -0.05), 0.7);
    }
    
    // Update button states
    document.querySelectorAll('.theme-btn, .mode-btn').forEach(btn => {
        btn.style.backgroundColor = backgroundColor;
        btn.style.color = foregroundColor;
        btn.style.borderColor = adjustColorLightness(foregroundColor, currentMode === 'dark' ? -0.3 : 0.3);
    });
    
    // Update active button
    document.querySelectorAll('.theme-btn.active, .mode-btn.active').forEach(btn => {
        btn.style.backgroundColor = primaryColor;
        btn.style.color = getContrastColor(primaryColor);
        btn.style.borderColor = primaryColor;
    });
    
    // Update color picker container
    const colorPickerContainer = document.getElementById('colorPickerContainer');
    if (colorPickerContainer) {
        colorPickerContainer.style.backgroundColor = adjustColorLightness(backgroundColor, currentMode === 'dark' ? 0.1 : -0.05);
        colorPickerContainer.style.borderColor = adjustColorLightness(foregroundColor, currentMode === 'dark' ? -0.3 : 0.3);
    }
}

// Helper function to adjust color lightness
function adjustColorLightness(hexColor, factor) {
    // Convert hex to RGB
    let r = parseInt(hexColor.substr(1, 2), 16);
    let g = parseInt(hexColor.substr(3, 2), 16);
    let b = parseInt(hexColor.substr(5, 2), 16);
    
    // Convert RGB to HSL and adjust lightness
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    l = Math.min(1, Math.max(0, l + factor));
    
    // Convert HSL back to RGB
    let r2, g2, b2;
    if (s === 0) {
        r2 = g2 = b2 = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        r2 = hue2rgb(p, q, h + 1/3);
        g2 = hue2rgb(p, q, h);
        b2 = hue2rgb(p, q, h - 1/3);
    }
    
    // Convert back to hex
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
}

// Render the color palette
function renderPalette() {
    const palette = colorPalettes[currentTheme][currentMode].colors;
    const colorPaletteEl = document.querySelector('.color-palette');
    
    colorPaletteEl.innerHTML = '';
    
    // Store original colors for reset functionality
    originalColors = {};
    
    // Convert object to array of {role, hex} pairs
    const colorEntries = Object.entries(palette).map(([role, hex]) => ({ role, hex }));
    
    colorEntries.forEach(color => {
        // Create container for color box and label
        const colorContainer = document.createElement('div');
        colorContainer.className = 'color-container';
        
        // Create label for the color
        const colorLabel = document.createElement('div');
        colorLabel.className = 'color-label';
        colorLabel.textContent = getColorRoleDisplay(color.role);
        colorLabel.title = `Este color se usará como: ${getColorRoleDisplay(color.role)}`;
        
        // Create color box
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color.hex;
        
        // Determine text color based on background for contrast
        colorBox.style.color = getContrastColor(color.hex);
        
        // Only show hex code in the color box
        colorBox.textContent = color.hex.toUpperCase();
        colorBox.dataset.hex = color.hex;
        colorBox.dataset.originalHex = color.hex; // Store original hex for reset
        colorBox.dataset.role = color.role; // Store role for reference
        
        // Add to originalColors object
        originalColors[color.role] = color.hex;
        
        colorBox.addEventListener('click', (e) => {
            // Remove selected class from all boxes
            document.querySelectorAll('.color-box').forEach(box => {
                box.classList.remove('selected');
            });
            
            // Add selected class to clicked box
            e.currentTarget.classList.add('selected');
            
            // Show color picker options
            showColorPicker(e.currentTarget);
        });
        
        // Append label and box to container
        colorContainer.appendChild(colorLabel);
        colorContainer.appendChild(colorBox);
        colorPaletteEl.appendChild(colorContainer);
    });
}

// Helper function to get display name for color role
function getColorRoleDisplay(role) {
    switch(role) {
        case COLOR_ROLES.BACKGROUND:
            return 'Fondo';
        case COLOR_ROLES.FOREGROUND:
            return 'Texto';
        case COLOR_ROLES.PRIMARY:
            return 'Primario';
        case COLOR_ROLES.SECONDARY:
            return 'Secundario';
        case COLOR_ROLES.SUCCESS:
            return 'Éxito';
        case COLOR_ROLES.WARNING:
            return 'Advertencia';
        case COLOR_ROLES.ERROR:
            return 'Error';
        case COLOR_ROLES.NEUTRAL:
            return 'Neutro';
        case COLOR_ROLES.ACCENT1:
            return 'Acento 1';
        case COLOR_ROLES.ACCENT2:
            return 'Acento 2';
        case COLOR_ROLES.ACCENT3:
            return 'Acento 3';
        default:
            return 'Personalizado';
    }
}

// Helper function to get semantic role name
function getColorRoleName(role) {
    switch(role) {
        case COLOR_ROLES.BACKGROUND:
            return 'Background';
        case COLOR_ROLES.FOREGROUND:
            return 'Foreground';
        case COLOR_ROLES.PRIMARY:
            return 'Primary';
        case COLOR_ROLES.SECONDARY:
            return 'Secondary';
        case COLOR_ROLES.SUCCESS:
            return 'Success';
        case COLOR_ROLES.WARNING:
            return 'Warning';
        case COLOR_ROLES.ERROR:
            return 'Error';
        case COLOR_ROLES.NEUTRAL:
            return 'Neutral';
        case COLOR_ROLES.ACCENT1:
            return 'Accent 1';
        case COLOR_ROLES.ACCENT2:
            return 'Accent 2';
        case COLOR_ROLES.ACCENT3:
            return 'Accent 3';
        default:
            return 'Custom';
    }
}

// Show color picker options when a color box is clicked
function showColorPicker(colorBox) {
    selectedColorBox = colorBox;
    colorPickerContainer.classList.add('visible');
    
    // Render color options
    renderColorOptions();
}

// Render color options based on the current theme
function renderColorOptions() {
    const palette = colorPalettes[currentTheme][currentMode].colors;
    colorOptionsEl.innerHTML = '';
    
    // Convert object to array of {role, hex} pairs
    const colorEntries = Object.entries(palette).map(([role, hex]) => ({ role, hex }));
    
    colorEntries.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = color.hex;
        colorOption.dataset.hex = color.hex;
        
        colorOption.addEventListener('click', (e) => {
            const newColor = e.currentTarget.dataset.hex;
            selectedColorBox.style.backgroundColor = newColor;
            
            // Update the text color for contrast
            selectedColorBox.style.color = getContrastColor(newColor);
            selectedColorBox.textContent = newColor.toUpperCase();
            selectedColorBox.dataset.hex = newColor;
            
            // Update the selected option
            document.querySelectorAll('.color-option').forEach(option => {
                option.classList.remove('selected');
            });
            e.currentTarget.classList.add('selected');
            
            // Refresh the theme preview
            applyThemeToInterface();
            
            // Also update mobile preview
            updateMobilePreviewFromCurrentTheme();
        });
        
        colorOptionsEl.appendChild(colorOption);
    });
}

// Get contrast color (black or white) based on background color
function getContrastColor(hexColor) {
    // Convert hex to RGB
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black for light backgrounds, white for dark backgrounds
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Get color name by hex value
function getColorNameByHex(hex) {
    const palette = colorPalettes[currentTheme][currentMode].colors;
    for (const [role, colorHex] of Object.entries(palette)) {
        if (colorHex.toLowerCase() === hex.toLowerCase()) {
            return getColorRoleName(role);
        }
    }
    return 'Custom';
}

// Update the theme based on current color selections in the palette
function updateThemeFromPalette() {
    try {
        const colorContainers = document.querySelectorAll('.color-container');
        if (colorContainers.length === 0) {
            return;
        }

        // Create a map of color roles to their values
        const colorMap = {};
        
        colorContainers.forEach(container => {
            const colorBox = container.querySelector('.color-box');
            const colorLabel = container.querySelector('.color-label');
            
            if (colorBox && colorLabel) {
                const role = colorLabel.textContent.toLowerCase();
                const colorValue = colorBox.dataset.hex;
                
                // Map display names back to semantic roles
                if (role.includes('fondo') || role.includes('background')) {
                    colorMap[COLOR_ROLES.BACKGROUND] = colorValue;
                } else if (role.includes('texto') || role.includes('foreground')) {
                    colorMap[COLOR_ROLES.FOREGROUND] = colorValue;
                } else if (role.includes('primario') || role.includes('primary')) {
                    colorMap[COLOR_ROLES.PRIMARY] = colorValue;
                } else if (role.includes('secundario') || role.includes('secondary')) {
                    colorMap[COLOR_ROLES.SECONDARY] = colorValue;
                } else if (role.includes('éxito') || role.includes('success')) {
                    colorMap[COLOR_ROLES.SUCCESS] = colorValue;
                } else if (role.includes('advertencia') || role.includes('warning')) {
                    colorMap[COLOR_ROLES.WARNING] = colorValue;
                } else if (role.includes('error')) {
                    colorMap[COLOR_ROLES.ERROR] = colorValue;
                } else if (role.includes('neutro') || role.includes('neutral')) {
                    colorMap[COLOR_ROLES.NEUTRAL] = colorValue;
                } else if (role.includes('acento 1') || role.includes('accent 1')) {
                    colorMap[COLOR_ROLES.ACCENT1] = colorValue;
                } else if (role.includes('acento 2') || role.includes('accent 2')) {
                    colorMap[COLOR_ROLES.ACCENT2] = colorValue;
                } else if (role.includes('acento 3') || role.includes('accent 3')) {
                    colorMap[COLOR_ROLES.ACCENT3] = colorValue;
                }
            }
        });
        
        // Use colors based on their semantic roles, with fallbacks
        const backgroundColor = colorMap[COLOR_ROLES.BACKGROUND] || '#ffffff';
        const foregroundColor = colorMap[COLOR_ROLES.FOREGROUND] || '#000000';
        const primaryColor = colorMap[COLOR_ROLES.PRIMARY] || '#0969da';
        const secondaryColor = colorMap[COLOR_ROLES.SECONDARY] || '#6c757d';
        
        // Aplicar los colores a la interfaz
        document.body.style.backgroundColor = backgroundColor;
        document.body.style.color = foregroundColor;

        // Actualizar encabezado
        const header = document.querySelector('header');
        if (header) {
            header.style.backgroundColor = backgroundColor;
            header.style.color = foregroundColor;
        }

        // Actualizar selectores con transparencia
        const themeSelector = document.querySelector('.theme-selector');
        const modeSelector = document.querySelector('.mode-selector');
        const paletteDisplay = document.querySelector('.palette-display');

        if (themeSelector) {
            themeSelector.style.backgroundColor = hexToRgba(backgroundColor, 0.7);
            themeSelector.style.color = foregroundColor;
        }
        if (modeSelector) {
            modeSelector.style.backgroundColor = hexToRgba(backgroundColor, 0.7);
            modeSelector.style.color = foregroundColor;
        }
        if (paletteDisplay) {
            paletteDisplay.style.backgroundColor = hexToRgba(backgroundColor, 0.7);
            paletteDisplay.style.color = foregroundColor;
        }

        // Actualizar estados de botones
        document.querySelectorAll('.theme-btn, .mode-btn').forEach(btn => {
            btn.style.backgroundColor = backgroundColor;
            btn.style.color = foregroundColor;
            btn.style.borderColor = primaryColor;
        });

        // Actualizar botones activos con el color primario
        document.querySelectorAll('.theme-btn.active, .mode-btn.active').forEach(btn => {
            btn.style.backgroundColor = primaryColor;
            btn.style.color = getContrastColor(primaryColor);
            btn.style.borderColor = primaryColor;
        });

        // Actualizar contenedor del selector de color
        const colorPickerContainer = document.getElementById('colorPickerContainer');
        if (colorPickerContainer) {
            colorPickerContainer.style.backgroundColor = backgroundColor;
            colorPickerContainer.style.color = foregroundColor;
        }
        
        // Actualizar el botón de actualización del tema
        const updateThemeBtn = document.getElementById('updateThemeBtn');
        if (updateThemeBtn) {
            updateThemeBtn.style.backgroundColor = primaryColor;
            updateThemeBtn.style.color = getContrastColor(primaryColor);
        }
        
        // Actualizar la previsualización móvil
        updateMobilePreview(backgroundColor, foregroundColor, primaryColor, secondaryColor);
        
    } catch (error) {
        console.error("Error actualizando el tema:", error);
    }
}

// Actualizar la previsualización móvil según los colores del tema
function updateMobilePreview(backgroundColor, foregroundColor, accentColor, secondaryColor) {
    // Actualizar el fondo de las pantallas móviles
    const mobileScreens = document.querySelectorAll('.mobile-screen');
    mobileScreens.forEach(screen => {
        screen.style.backgroundColor = backgroundColor;
        screen.style.borderColor = adjustColorLightness(foregroundColor, 0.3);
    });
    
    // Actualizar contenido de las pantallas
    const mobileContents = document.querySelectorAll('.mobile-content');
    mobileContents.forEach(content => {
        content.style.color = foregroundColor;
    });
    
    // Actualizar encabezados
    const mobileHeaders = document.querySelectorAll('.mobile-content h3');
    mobileHeaders.forEach(header => {
        header.style.color = foregroundColor;
    });
    
    // Actualizar inputs
    const mobileInputs = document.querySelectorAll('.mobile-input');
    mobileInputs.forEach(input => {
        input.style.backgroundColor = adjustColorLightness(backgroundColor, -0.1);
        input.style.color = foregroundColor;
        input.style.borderColor = adjustColorLightness(foregroundColor, 0.3);
    });
    
    // Actualizar botones principales
    const primaryBtns = document.querySelectorAll('.primary-btn');
    primaryBtns.forEach(btn => {
        btn.style.backgroundColor = accentColor;
        btn.style.color = getContrastColor(accentColor);
        btn.style.borderColor = accentColor;
    });
    
    // Actualizar botones secundarios
    const secondaryBtns = document.querySelectorAll('.secondary-btn');
    secondaryBtns.forEach(btn => {
        btn.style.color = accentColor;
        btn.style.borderColor = accentColor;
        btn.style.backgroundColor = 'transparent';
    });
    
    // Asegurar que los botones secundarios tengan bordes visibles
    secondaryBtns.forEach(btn => {
        btn.style.border = `1px solid ${accentColor}`;
    });
    
    // Actualizar texto
    const mobileTexts = document.querySelectorAll('.mobile-text');
    mobileTexts.forEach(text => {
        text.style.color = adjustColorLightness(foregroundColor, 0.3);
    });
    
    // Actualizar opciones de ajustes
    const settingOptions = document.querySelectorAll('.setting-option');
    settingOptions.forEach(option => {
        option.style.borderBottomColor = adjustColorLightness(foregroundColor, 0.1);
        option.style.color = foregroundColor;
    });
    
    // Actualizar selects
    const mobileSelects = document.querySelectorAll('.mobile-select');
    mobileSelects.forEach(select => {
        select.style.backgroundColor = adjustColorLightness(backgroundColor, -0.1);
        select.style.color = foregroundColor;
        select.style.borderColor = adjustColorLightness(foregroundColor, 0.3);
    });
    
    // Actualizar barras de progreso
    const progressContainers = document.querySelectorAll('.progress-container');
    progressContainers.forEach(container => {
        container.style.backgroundColor = adjustColorLightness(foregroundColor, 0.3);
    });
    
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        bar.style.backgroundColor = accentColor;
    });
    
    // Actualizar checkboxes
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        // Cambiar el aspecto visual del checkbox
        checkbox.style.accentColor = accentColor;
    });
    
    // Actualizar radios
    const radios = document.querySelectorAll('.radio-group input[type="radio"]');
    radios.forEach(radio => {
        radio.style.accentColor = accentColor;
    });
    
    // Actualizar toggles
    const toggleLabels = document.querySelectorAll('.toggle-switch label');
    toggleLabels.forEach(label => {
        label.style.backgroundColor = adjustColorLightness(foregroundColor, 0.3);
    });
    
    // Actualizar toggles activados - aplicando estilo directamente a los elementos específicos
    const checkedToggles = document.querySelectorAll('.toggle-switch input:checked + label');
    checkedToggles.forEach(label => {
        label.style.backgroundColor = accentColor;
    });
    
    // Actualizar labels de checkboxes y radios
    const checkboxLabels = document.querySelectorAll('.checkbox-group label, .radio-group label');
    checkboxLabels.forEach(label => {
        label.style.color = foregroundColor;
    });
}

// Helper function to convert hex color to rgba with transparency
function hexToRgba(hex, alpha) {
    // Convert hex to RGB
    let r = parseInt(hex.substr(1, 2), 16);
    let g = parseInt(hex.substr(3, 2), 16);
    let b = parseInt(hex.substr(5, 2), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Helper function to determine if a color is dark
function isDarkColor(hexColor) {
    // Convert hex to RGB
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if dark, false if light
    return luminance < 0.5;
}