from flask import Flask, render_template, request, redirect, flash, send_file, url_for, send_from_directory, jsonify
import io
import base64
import os

app = Flask(__name__)
app.secret_key = "abc"
APP_ROOT = os.path.dirname(os.path.abspath(__file__))


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/upload", methods=["POST"])
def upload():
    if request.method == "GET":
        return render_template("index.html")
    if request.method == "POST":
        target = os.path.join(APP_ROOT, "static")
        if not os.path.isdir(target):
            os.mkdir(target)
        if not request.files['file']:
            flash('Please select a image!!')
            return redirect("/")
        file = request.files['file']
        filename = file.filename
        destination = os.path.join(target, filename)
        file.save(destination)
        return render_template("index.html", filename=filename)


@app.route("/adjust")
def adjust():
    return render_template("adjust.html")


@app.route("/rotate")
def rotate():
    return render_template("rotate.html")


@app.route("/filters")
def filters():
    return render_template("filters.html")


if __name__ == "__main__":
    app.run()
