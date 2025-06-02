from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
from flask_mail import Mail, Message
import os
from datetime import datetime

app = Flask(__name__)

# Use environment variable for debug mode
app.config['DEBUG'] = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'

# Email configuration (you'll need to add your email credentials)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'  # Add your email
app.config['MAIL_PASSWORD'] = 'your-app-password'     # Add your app password

mail = Mail(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        try:
            msg = Message('New Contact Form Submission',
                        sender=email,
                        recipients=[app.config['MAIL_USERNAME']])
            msg.body = f"""
            From: {name}
            Email: {email}
            Message: {message}
            """
            mail.send(msg)
            flash('Your message has been sent successfully!', 'success')
        except Exception as e:
            flash('An error occurred. Please try again later.', 'error')
        
        return redirect(url_for('contact'))
    
    return render_template('contact.html')

@app.route('/api/skills')
def get_skills():
    skills = [
        {"name": "Python", "level": 90, "image": "pythonlogo.png"},
        {"name": "SQL", "level": 85, "image": "sqllogo.png"},
        {"name": "Machine Learning", "level": 85, "image": "mllogo.png"},
        {"name": "Power BI", "level": 85, "image": "powerbilogo.png"},
        {"name": "Tableau", "level": 80, "image": "tableaulogo.png"},
        {"name": "Deep Learning", "level": 80, "image": "Deeplearinnglogo.png"},
        {"name": "Data Analytics", "level": 90, "image": "numpylogo.jpg"},
        {"name": "Web Development", "level": 85, "image": "webdevlogo.png"}
    ]
    return jsonify(skills)

@app.route('/api/certificates')
def get_certificates():
    certificates = [
        {
            "title": "Data Analytics and Visualization Job Simulation",
            "issuer": "Accenture",
            "date": "March 2024",
            "credential_id": "y57TQZDm43GnETbNk",
            "image": "accenture.png",
            "skills": ["Project Understanding", "Data Cleaning & Modeling", "Data Visualization & Storytelling", "Client Presentation"],
            "link": "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20North%20America/hzmoNKtzvAzXsEqx8_Accenture%20North%20America_y3hTqggkY8A3WZWvm_1710582671292_completion_certificate.pdf"
        },
        {
            "title": "Deep Learning For Computer Vision",
            "issuer": "NPTEL",
            "date": "November 2022",
            "image": "nptel.png",
            "skills": ["Artificial Intelligence (AI)", "Computer Vision", "Deep Learning", "Neural Networks"],
            "link": "https://archive.nptel.ac.in/content/noc/NOC22/SEM2/Ecertificates/106/noc22-cs76/Course/NPTEL22CS76S5476160010056939.jpg"
        },
        {
            "title": "Software Engineering Virtual Experience",
            "issuer": "JPMorgan Chase",
            "date": "June 2022",
            "credential_id": "y3hTqggkY8A3WZWvm",
            "image": "jpmorgan.png",
            "skills": ["Analytical Skills", "Problem Solving"],
            "link": "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/J.P.%20Morgan/R5iK7HMxJGBgaSbvk_J.P.%20Morgan_y3hTqggkY8A3WZWvm_1655660639169_completion_certificate.pdf"
        },
        {
            "title": "Data Visualization with Power BI",
            "issuer": "Great Learning",
            "date": "March 2022",
            "image": "greatlearning.png",
            "skills": ["Data Architecture", "Microsoft Power BI", "Visual Analytics", "Data Visualization", "Components of Power BI"],
            "link": "https://www.mygreatlearning.com/certificate/SNEBEHKW"
        }
    ]
    return jsonify(certificates)

if __name__ == '__main__':
    # Use environment variable for port
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
