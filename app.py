import time
import zmq
from flask import Flask, render_template, request, flash
from threading import Thread


app = Flask(__name__)
app.secret_key = "manbearpig_MUDMAN888"

@app.route("/")
def homepage():
	return render_template("index.html")

@app.route("/index.html")
def home():
	return render_template("index.html")

@app.route("/hello")
def index():
	flash("what's your Name?")
	return render_template("index.html")

@app.route("/medicalstaff.html")
def medicalstaff():
	return render_template("medicalstaff.html")

@app.route("/items_in_stock.html")
def items_in_stock():
	return render_template("items_in_stock.html")

@app.route("/endotrachealtube.html")
def endotrachealtube():
	return render_template("endotrachealtube.html")

@app.route("/updateitem.html")
def updateitem():
	return render_template("updateitem.html")

@app.route("/medication_names.html")
def medication_names():
	return render_template("medication_names.html")

@app.route("/providers.html")
def providers():
	return render_template("providers.html")

@app.route("/emergency_management.html")
def emergency_management():
	return render_template("emergency_management.html")

@app.route("/asystole.html")
def asystole():
	return render_template("asystole.html")

@app.route("/allservices.html")
def allservices():
	return render_template("allservices.html")

@app.route("/updates.html")
def updates():
	return render_template("updates.html")

@app.route("/contact.html")
def contact():
	return render_template("contact.html")

@app.route("/index.js")
def indexjs():
	return render_template("index.js")

@app.route("/names1.js")
def names1():
	return render_template("names1.js")

@app.route("/names2.js")
def names2():
	return render_template("names2.js")

@app.route("/names3.js")
def names3():
	return render_template("names3.js")

@app.route("/message.js")
def message():
	return render_template("message.js")

@app.route("/scraper.js")
def scraper():
	return render_template("scraper.js")

@app.route("/app.js")
def appjs():
	return render_template("app.js")

context = zmq.Context()

@app.route("/greet", methods=['POST', 'GET'])
def greeter():
	print("Connecting to Service ... ")
	socket = context.socket(zmq.REQ)
	socket.connect("tcp://localhost:5555")

	cityName = input("Enter your city name for weather: ")
	print(f'Sending request...')
	socket.send(bytes(cityName, encoding='utf-8'))

	message = socket.recv()
	print(f"Received search resutls: {message.decode()}")
	answer = message.decode()
	
	flash("The amount $" + str(request.form['name_input']) + ", is equivalent to " + str(answer) +".")
	return render_template("index.html")

# context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5555")

@app.route("/service")
def service():
	while True:
		message = socket.recv()
		print(f"Received your request: {message.decode()}")

		# Do some 'work'
		time.sleep(1)

		# Send reply back to Client
		socket.send(bytes("(Mock-up Answer)", encoding='utf-8'))