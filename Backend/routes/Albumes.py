from flask import Blueprint, jsonify, request
from DB.db import query, query_con_retorno
from S3Controler.Imagenes import Subir_imagenB64


rutas = Blueprint('album_blueprint',__name__)

@rutas.route("/create", methods=['POST'])
def create():
    try:
        idUser=request.json['idUser']
        albumName=request.json['albumName']
        consulta = "INSERT INTO Semi1.Album (name, Users_idUser) VALUES (%s, %s)"
        datos_usuario = (albumName, idUser)
        query(consulta,datos_usuario)
        return jsonify({"err": False, "message": "Album creado exitosamente"}),200
        
    except Exception as e:
        return jsonify({"err": True, "message": "Ha ocurrido en el endpoint de editar Album: " + str(e)}),404

@rutas.route("/update", methods=['PUT'])
def update():
    try:
        idAlbum=request.json['idAlbum']
        albumName=request.json['albumName']
        consulta = "UPDATE Semi1.Album SET name = %s WHERE idAlbum = %s"
        datos_usuario = (albumName, idAlbum)
        query(consulta,datos_usuario)
        return jsonify({"err": False, "message": "Album editado exitosamente"}),200
        
    except Exception as e:
        return jsonify({"err": True, "message": "Ha ocurrido en el endpoint de editar Album: " + str(e)}),404
    
@rutas.route("/get", methods=['POST'])
def getAlbum():
    try:
        idUser=request.json['idUser']
        consulta = "SELECT * FROM Semi1.Album  WHERE Users_idUser = %s"
        datos_usuario = (idUser)
        retorno = query_con_retorno(consulta,datos_usuario)
        print(retorno)
        data = []
        for i in retorno:
            data.append({"idAlbum":i[0],"albumName":i[1]})
        return jsonify({"err": False, "message": "Albumes obtenido exitosamente", "data":data}),200
        
    except Exception as e:
        return jsonify({"err": True, "message": "Ha ocurrido en el endpoint de obtener Album: " + str(e)}),404

@rutas.route("/delete", methods=['POST'])
def deleteAlbum():
    try:
        idAlbum=request.json['idAlbum']
        consulta = "DELETE FROM Semi1.Foto  WHERE Album_idAlbum = %s"
        datos_usuario = (idAlbum)
        query(consulta,datos_usuario)
        consulta = "DELETE FROM Semi1.Album  WHERE idAlbum = %s"
        query(consulta,datos_usuario)
        return jsonify({"err": False, "message": "Album eliminado exitosamente", }),200
        
    except Exception as e:
        return jsonify({"err": True, "message": "Ha ocurrido en el endpoint de eliminar Album: " + str(e)}),404