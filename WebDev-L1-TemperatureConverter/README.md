# Temperature Converter Website · Task 3

A clean, modern, and responsive Temperature Converter built with HTML5, CSS3, and Vanilla JavaScript. Part of the Oasis Infobyte (OIBSIP) Web Development & Designing Internship.

## Project Checklist
- [x] Create project files (`index.html`, `style.css`, `script.js`)
- [x] Build centered, mobile-friendly HTML structure
- [x] Precision thermal dark theme with ambient glow
- [x] Conversion logic between Celsius, Fahrenheit, and Kelvin
- [x] Validation for empty, non-numeric, and below absolute-zero temperatures
- [x] Simultaneous multi-unit results display
- [x] Tested against all standard test cases

## Verification Test Cases
| Input | Unit | Expected Output | Status |
| :--- | :--- | :--- | :--- |
| **0** | Celsius | 32°F, 273.15 K | Passed |
| **100** | Celsius | 212°F, 373.15 K | Passed |
| **32** | Fahrenheit | 0°C, 273.15 K | Passed |
| **273.15** | Kelvin | 0°C, 32°F | Passed |
| **-300** | Celsius | Error (below absolute zero -273.15°C) | Passed |
| **-1** | Kelvin | Error (negative Kelvin not allowed) | Passed |
| *Empty* | Any | Validation Error Message | Passed |

## Running Locally

Open `index.html` in your browser:
```powershell
Start-Process .\index.html
```
Or serve via npx:
```powershell
npx -y serve .
```
