# Modern Portfolio Website

A modern, responsive portfolio website built with Flask, featuring a clean design, dark/light mode, and interactive elements.

## Features

- Responsive design that works on all devices
- Dark/Light mode toggle
- Interactive skills visualization
- Contact form with email functionality
- Smooth scrolling and animations
- Modern UI with Bootstrap 5
- Dynamic project showcase

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory with your email configuration:
```
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

5. Run the application:
```bash
python app.py
```

The website will be available at `http://localhost:5000`

## Customization

1. Update personal information in `templates/index.html`
2. Modify skills in `app.py` under the `/api/skills` route
3. Add your projects in the projects section
4. Customize colors and styles in `static/css/style.css`

## Technologies Used

- Python/Flask
- HTML5/CSS3
- JavaScript
- Bootstrap 5
- Font Awesome
- Chart.js

## License

MIT License 