from flask import Blueprint, jsonify, request
from DB.db import query, query_con_retorno
from S3Controler.Imagenes import Subir_imagenB64

from Utildades import Funciones

rutas = Blueprint('usuario_blueprint',__name__)


def AlbumInicial(imageName,imageUrl,userName):
    consulta = """INSERT INTO Semi1.Album (name, Users_idUser)
    VALUES (%s, (SELECT idUser FROM Semi1.Users WHERE userName = %s));
    """
    datos_album = ("default",userName)
    query(consulta,datos_album)
    
    consulta = """INSERT INTO Semi1.Foto (name, picture, Album_idAlbum)
    VALUES (%s, %s, (SELECT idAlbum FROM Semi1.Album WHERE name = %s 
    and Users_idUser = (SELECT idUser From Semi1.Users WHERE userName=%s )));"""
    datos_foto = (imageName,imageUrl,"default",userName)
    query(consulta,datos_foto)


@rutas.route("/check", methods=['GET'])
def f2():
    return jsonify({"status": "OK"}), 200

@rutas.route("/register", methods=['POST'])
def register():
    print(request.json)
    try:
        name=request.json['name']
        userName=request.json['userName']
        passw=request.json['password']
        imageName=request.json['imageName']
        imageContent=request.json['imageContent']
        encriptada = Funciones.encriptarMD5(passw)

        validar = "SELECT userName FROM Semi1.Users WHERE userName = %s "
        datos_validar = (userName)
        filas = query_con_retorno(validar,datos_validar)
        if len(filas)==0:

            err=Subir_imagenB64(imageName,imageContent,"Fotos_Perfil")
            if err[1]:
                return jsonify({"err": True,"message": err[0]}),404
            else:
                consulta = "INSERT INTO Semi1.Users (userName, Name, picture, passw) VALUES (%s, %s, %s, %s)"
                datos_usuario = (userName, name, err[0], encriptada)
                query(consulta,datos_usuario)
                AlbumInicial(imageName,err[0],userName)
                return jsonify({"err": False, "message": "Usuario creado exitosamente"}),200
        else:
            return jsonify({"err": True,"message": "El usuario ya existe"}),404
    except Exception as e:
        print(e)
        return jsonify({"err": True, "message": "Ha ocurrido en el endpoint del Registro: " + str(e)}),404

@rutas.route("/login", methods=['POST'])
def login():
    try:
        userName=request.json['userName']
        passw=request.json['password']
        encriptada = Funciones.encriptarMD5(passw)
        validar = "SELECT * FROM Semi1.Users WHERE userName = %s and passw = %s "
        datos_validar = (userName,encriptada)
        user = query_con_retorno(validar,datos_validar)[0]
        if len(user)==0:
            return jsonify({"err": True,"message": "Usuario o Contraseña Incorrectos"}),404
        else:
              return jsonify({
                            "err": False,
                            "messege":"Login Exitoso!!",
                            "data":{
                                        "idUser": user[0],
                                        "userName": user[1],
                                        "name": user[2],
                                        "imgPerfil": user[3],
                                        "passw": user[4]
                                    }
                            })

    except Exception as e:
        return jsonify({"err": True, "message": "Ha ocurrido en el endpoint del login: " + str(e)}),404


@rutas.route("/updateUser", methods=['PUT'])
def updateUser():
    try:
        idUser=request.json['idUser']
        name=request.json['name']
        userName=request.json['userName']
        passw=request.json['password']
        encriptada = Funciones.encriptarMD5(passw)

        validar = "SELECT * FROM Semi1.Users WHERE idUser = %s "
        datos_validar = (idUser)
        filas = query_con_retorno(validar,datos_validar)
        if len(filas)>0:
            print(filas)
            if filas[0][4]!=encriptada:
                return jsonify({"err": True,"message": "Contraseña incorrecta"}),404
            consulta = "UPDATE Semi1.Users SET userName = %s,Name = %s WHERE idUser = %s"
            datos_usuario = (userName, name, idUser)
            query(consulta,datos_usuario)
            return jsonify({"err": False,"data":{
                "idUser": filas[0][0],
                "userName": userName,
                "name": name,
                "imgPerfil": filas[0][3],
                "passw": encriptada

            } ,"message": "Usuario Actualizado exitosamente"}),200
        else:
            return jsonify({"err": True,"message": "El usuario no existe"}),404
    except Exception as e:
        return jsonify({"err": True, "message": "Ha ocurrido en el endpoint del Editar perfil: " + str(e)}),404
    
@rutas.route("/updatePerfil", methods=['PUT'])
def updatePerfil():
    try:
        idUser=request.json['idUser']
        imageName=request.json['imageName']
        imageContent=request.json['imageContent']
        passw=request.json['password']
        encriptada = Funciones.encriptarMD5(passw)

        validar = "SELECT * FROM Semi1.Users WHERE idUser = %s "
        datos_validar = (idUser)
        filas = query_con_retorno(validar,datos_validar)
        if len(filas)>0:
            print(filas)
            if filas[0][4]!=encriptada:
                return jsonify({"err": True,"message": "Contraseña incorrecta"}),404
            err=Subir_imagenB64(imageName,imageContent,"Fotos_Perfil")
            if err[1]:
                return jsonify({"err": True,"message": err[0]}),404
            else:
                consulta = "UPDATE Semi1.Users SET picture = %s  WHERE idUser = %s"
                datos_usuario = (err[0], idUser)
                query(consulta,datos_usuario)
                user = filas[0]
                consulta = """INSERT INTO Semi1.Foto (name, picture, Album_idAlbum)
                VALUES (%s, %s, (SELECT idAlbum FROM Semi1.Album WHERE name = %s 
                and Users_idUser = %s));"""
                datos_foto = (imageName,err[0],"default",idUser)
                query(consulta,datos_foto)
                return jsonify({
                            "err": False,
                            "message": "Usuario Actualizado exitosamente",
                            "data":{
                                        "idUser": user[0],
                                        "userName": user[1],
                                        "name": user[2],
                                        "imgPerfil": err[0],
                                        "passw": user[4]
                                    }}),200
        else:
            return jsonify({"err": True,"message": "El usuario no existe"}),404
    except Exception as e:
        return jsonify({"err": True, "message": "Ha ocurrido en el endpoint del Editar perfil: " + str(e)}),404
    