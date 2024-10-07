# Image Frame Splitter

A web tool to split images into multiple frames with customizable dimensions. Users can specify frame width, height, starting position, and offset values. The tool supports exporting all frames as a ZIP file for easy download.

@Telegram: @bavuong12, @kyotheone

## Features

- **Import images**: Upload an image file to the web tool.
- **Define frame size**: Set custom frame width and height for splitting.
- **Set starting position**: Specify the starting coordinates (X, Y) for the first frame.
- **Adjust frame offset**: Add space between frames with custom offset values for both X and Y axes.
- **Preview grid**: A grid overlay shows how the image will be split into frames.
- **Export as ZIP**: Export all frames as a ZIP file for easy download.

## Demo

You can try the live demo of this project here: [GitHub Pages link here]

## Installation

To run this project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/image-frame-splitter.git
Navigate to the project directory:

cd image-frame-splitter
Open the index.html file in your browser to use the tool.

Usage
Import Image: Click the "Import Image" button to upload your image file.
Set Frame Parameters:
Enter the frame width and height.
Optionally, set the starting position (start X, start Y) and offsets (offset X, offset Y) for frame splitting.
Preview Grid: The grid will show how the image is split based on your input.
Export: Once satisfied, click the "Export as ZIP" button to download all frames as a ZIP file.

File Structure

├── index.html         # Main HTML file

├── style.css          # CSS styles for layout

├── script.js          # Main JavaScript logic for frame splitting

├── jszip.min.js       # JSZip library to generate ZIP files

└── README.md          # Project documentation

Built With
HTML: Markup for the web interface.
CSS: Styling for the layout and responsive design.
JavaScript: Logic for frame splitting, preview, and ZIP export.
JSZip: JavaScript library for creating ZIP files in the browser.
Contributing
Contributions are welcome! If you'd like to improve this project:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.
