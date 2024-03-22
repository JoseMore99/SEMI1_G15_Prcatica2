from flask import Flask, jsonify, request
from flask_cors import CORS
from routes import Usuario,Fotos,Albumes

app= Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/", methods=['GET'])
def check():
    return jsonify({"status": "OK"}), 200

app.register_blueprint(Usuario.rutas, url_prefix="/")
app.register_blueprint(Fotos.rutas, url_prefix="/img")
app.register_blueprint(Albumes.rutas, url_prefix="/album")

if __name__=="__main__":
    app.run(host='0.0.0.0', port=3000)