import os
import boto3
import base64
from dotenv import load_dotenv

load_dotenv()

def Subir_imagenB64(file_name,Image_Base64,Carpeta):
    #print(Image_Base64)
    s3 = boto3.client('s3',
            aws_access_key_id=os.getenv("S3_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("S3_SECRET_ACCESS_KEY"),
            region_name='us-east-2'
            )
    Image_Base64 = Image_Base64.split(",")
    imagen=None
    try:
        imagen = base64.b64decode(Image_Base64[1])
    except:
        imagen = base64.b64decode(Image_Base64)

    try:
        s3.put_object(Bucket='practica1-g15-imagenes', Key=Carpeta+"/"+file_name+".jpg", Body=imagen)
        url= f'https://practica1-g15-imagenes.s3.us-east-2.amazonaws.com/{Carpeta}/{file_name}'+".jpg"
        return [url, False]
    except Exception as e:
        print("error Funciones Subir_imagenB64",e)
        return["Error en funcion para subir imagen", True]

#Subir_imagenB64("prueba3","data:image/jpeg;base64,imagenbase64","Fotos_Publicadas")
