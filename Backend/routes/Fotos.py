from flask import Blueprint, jsonify, request
from DB.db import query, query_con_retorno
from S3Controler.Imagenes import Subir_imagenB64


rutas = Blueprint('foto_blueprint',__name__)

@rutas.route("/create", methods=['POST'])
def create():
    try:
        idAlbum=request.json['idAlbum']
        imageName=request.json['imageName']
        imageContent=request.json['imageContent']
        err=Subir_imagenB64(imageName,imageContent,"Fotos_Publicadas")
        if err[1]:
            return jsonify({"err": True,"message": err[0]}),404
        else:
            consulta = "INSERT INTO Semi1.Foto (name, picture, Album_idAlbum) VALUES (%s, %s, %s)"
            datos_usuario = (imageName, err[0], idAlbum)
            query(consulta,datos_usuario)
            return jsonify({"err": False, "message": "Foto subida exitosamente"}),200
        
    except Exception as e:
        return jsonify({"err": True, "message": "Ha ocurrido en el endpoint del Subir Foto: " + str(e)}),404
    
@rutas.route("/get", methods=['POST'])
def getFotos():
    try:
        idUser=request.json['idUser']
        consulta = """SELECT  F.name AS nombre_foto, F.picture AS ruta_foto, A.name AS nombre_album
                FROM Semi1.Foto AS F
                INNER JOIN Semi1.Album AS A ON F.Album_idAlbum = A.idAlbum
                INNER JOIN Semi1.Users AS U ON A.Users_idUser = U.idUser
                WHERE U.idUser = %s"""
        datos_usuario = (idUser)
        retorno = query_con_retorno(consulta,datos_usuario)
        print(retorno)
        data = []
        for i in retorno:
            data.append({"imageName":i[0],"picture":i[1],"Album":i[2]})
        return jsonify({"err": False, "message": "Fotos obtenidas exitosamente", "data":data}),200
        
    except Exception as e:
        return jsonify({"err": True, "message": "Ha ocurrido en el endpoint de obtener Fotos: " + str(e)}),404