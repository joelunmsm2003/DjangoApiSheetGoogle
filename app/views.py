from django.views.generic import View
from django.http import HttpResponse
from django.contrib.auth.models import Group, User
from jwt_auth.compat import json
from jwt_auth.mixins import JSONWebTokenAuthMixin
from app.models import *
import simplejson
from django.views.decorators.csrf import csrf_exempt
import xlrd
from django.shortcuts import *
from django.template import RequestContext
from django.contrib.auth import *
from django.contrib.auth.models import Group, User
from django.core import serializers
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.core import serializers
from django.core.urlresolvers import reverse
from django.db.models import Max,Count
from django.core.mail import send_mail
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db import transaction
from django.contrib.auth.hashers import *
from django.core.mail import send_mail
from django.db import connection
from django.utils.six.moves import range
from django.http import StreamingHttpResponse
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import permission_required
import gspread
from oauth2client.service_account import ServiceAccountCredentials

import xlrd
import json 
import csv
import simplejson
import xlwt
import requests
import os
from firebase import *

from datetime import datetime,timedelta

scope = ['https://spreadsheets.google.com/feeds']
credentials = ServiceAccountCredentials.from_json_keyfile_name('/var/www/credentials.json', scope)
gc = gspread.authorize(credentials)
sh = gc.open("Inventario 2016")
worksheet = sh.worksheet("Ropa")


def ValuesQuerySetToDict(vqs):
    return [item for item in vqs]

@csrf_exempt
def gamarra(request):

	f = Firebase('https://monitoreo.firebaseio.com/gamarra/codigo/')
		
	e = f.child('azx')
	e.push({id:'ddd'})
	#actualiza(3)
	return render(request, 'gamarra.html',{})

@csrf_exempt
def nuevos(request):

	cell = worksheet.findall("Nuevo")

	x = []

	data  =  dict((i.row,i.value) for i in cell)

	for i in data:

		print x.insert(i,worksheet.row_values(i))
	
	print x

	data = json.dumps(x)
	
	return HttpResponse(data, content_type="application/json")




@csrf_exempt
def listaqr(request,inicio,fin):

	x = []

	for i in range(int(inicio), int(fin)):

		print worksheet.row_values(i)
		
		x.insert(i,str(worksheet.row_values(i)[0])+','+str(worksheet.row_values(i)[1])+','+str(worksheet.row_values(i)[2])+','+str(worksheet.row_values(i)[3])+','+str(worksheet.row_values(i)[5])+','+'http://api.qrserver.com/v1/create-qr-code/?data='+str(worksheet.row_values(i)[0])+'&size=150x150')

	data = json.dumps(x)

	return HttpResponse(data, content_type="application/json")



@csrf_exempt
def qr(request,inicio,fin):

	return render(request, 'qr.html',{})


@csrf_exempt
def enventa(request,id):

	cell = worksheet.find(id)

	date =datetime.now()-timedelta(hours=5)

	fila = cell.row

	print 'fila',fila

	worksheet.update_cell(fila, 7, 'En venta')
	worksheet.update_cell(fila, 8, str(date))

	data = json.dumps('x')
	
	return HttpResponse(data, content_type="application/json")


@csrf_exempt
def alertaalmacen(request):


	cell = worksheet.findall("Almacen")

	cont = 0

	for i in cell:

		cont=cont+1

	data = json.dumps(cont)
	
	return HttpResponse(data, content_type="application/json")




@csrf_exempt
def setnuevo(request,id):

	cell = worksheet.find(id)

	date =datetime.now()-timedelta(hours=5)

	fila = cell.row

	print 'fila',fila

	worksheet.update_cell(fila, 7, 'Nuevo')
	worksheet.update_cell(fila, 8, '')

	fila = cell.row

	v = worksheet.row_values(fila)

	venta = v[1]+' '+v[2]+' '+v[3]+' '+v[4]+' '+v[5]

	data = json.dumps(venta)
	
	return HttpResponse(data, content_type="application/json")

@csrf_exempt
def ubica(request,id,ubica):

	cell = worksheet.find(id)

	date =datetime.now()-timedelta(hours=5)

	fila = cell.row

	v = worksheet.row_values(fila)

	venta = v[1]+' '+v[2]+' '+v[3]+' '+v[4]+' '+v[5]


	print 'fila',fila

	worksheet.update_cell(fila, 5, ubica)
	worksheet.update_cell(fila, 7, 'Traslado')
	worksheet.update_cell(fila, 10, str(date))

	data = json.dumps(venta)
	
	return HttpResponse(data, content_type="application/json")


@csrf_exempt
def vendido(request,id):

	cell = worksheet.find(id)

	date =datetime.now()-timedelta(hours=5)

	fila = cell.row

	v = worksheet.row_values(fila)

	venta = v[1]+' '+v[2]+' '+v[3]+' '+v[4]+' '+v[5]+' '+v[6]+' '+v[7]

	

	'''
	
	os.environ['numero']='988353108'
	os.environ['mensaje']=venta
	os.system('./pushbullet.sh')
	'''
	'''
	os.environ['numero']='980729169'
	os.environ['mensaje']=venta
	os.system('./sms.sh')
	'''

	e = worksheet.cell(fila, 11).value

	#if e != 'Complete':

	#print 'Enviando SMS...........'

	'''
	os.environ['numero']='51980729169'
	os.environ['mensaje']=str(venta)
	os.system('./sms.sh')
	'''
	worksheet.update_cell(fila, 7, 'Vendido')
	worksheet.update_cell(fila, 9, str(date))
	worksheet.update_cell(fila, 11,'Complete')

	
	data = json.dumps(v[1]+' '+v[2]+' '+v[3]+' '+v[4]+' '+v[5])
	
	return HttpResponse(data, content_type="application/json")

@csrf_exempt
def vendidogrupo(request):

	print 'POST..',json.loads(request.body)

	x = json.loads(request.body)

	'''
	f = open('/var/www/html/error.html', 'a')
	f.write(x)
	f.close()
	'''
	

	data = json.dumps('x')
	
	return HttpResponse(data, content_type="application/json")


@csrf_exempt
def torre(request,id):

	cell = worksheet.find(id)

	date =datetime.now()-timedelta(hours=5)

	fila = cell.row

	print 'fila',fila

	worksheet.update_cell(fila, 5, 'torre')
	worksheet.update_cell(fila, 10, str(date))

	data = json.dumps('x')
	
	return HttpResponse(data, content_type="application/json")


@csrf_exempt
def centro(request,id):

	cell = worksheet.find(id)

	date =datetime.now()-timedelta(hours=5)

	fila = cell.row

	print 'fila',fila

	worksheet.update_cell(fila, 5, 'centro')
	worksheet.update_cell(fila, 10, str(date))

	data = json.dumps('x')
	
	return HttpResponse(data, content_type="application/json")



@csrf_exempt
def actualiza(id_excel):

	sh = gc.open("Inventario 2016")

	worksheet = sh.worksheet("Ropa")

	id = worksheet.row_values(id_excel)[0]

	print 'id',id
	modelo = worksheet.row_values(id_excel)[1]
	talla = worksheet.row_values(id_excel)[2]
	color = worksheet.row_values(id_excel)[3]
	ubicacion = worksheet.row_values(id_excel)[4]
	precio = worksheet.row_values(id_excel)[5]
	estado = worksheet.row_values(id_excel)[6]

	f = Firebase('https://monitoreo.firebaseio.com/gamarra/codigo/'+str(id))
		
	result = f.push({'id':id,'modelo':modelo,'color':color,'talla':talla,'precio':precio,'ubicacion':ubicacion,'precio':precio,'estado':estado})

	return HttpResponse(data, content_type="application/json")

@csrf_exempt
def uploadbase(request):

	print request.FILES['process_file']

	filex = request.FILES['process_file']

	Excel(file=filex).save()

	id_excel = Excel.objects.all().values('id').order_by('-id')[0]['id']

	archivo = Excel.objects.get(id=id_excel).file

	ruta = '/var/www/html/'+str(archivo)

	book = xlrd.open_workbook(ruta)

	sh = book.sheet_by_index(0)

	a1={}

	for rx in range(sh.nrows):

		if rx > 0:

			for col in range(sh.ncols):

				a1[col] = str(sh.row(rx)[col]).replace('number:','').replace('text:','').replace("u'","").replace('"','').replace('.0','').replace("'","")

				f = Firebase('https://monitoreo.firebaseio.com/gamarra/')
		
			result = f.push({'id':a1[0],'modelo':a1[1],'color':a1[2],'talla':a1[3],'precio':a1[4],'ubicacion':a1[5]})

			print a1

			print '......'

			'''
			a1[col] = str(sh.row(rx)[col])

			a1[col] = a1[col].split(':')

			a1[col]= a1[col][1][0:150]

			'''

	data_dict = ValuesQuerySetToDict('url')
	
	data = json.dumps(data_dict)


	return HttpResponse(data, content_type="application/json")





@csrf_exempt
def lista(request):


	f = Firebase('https://monitoreo.firebaseio.com/eventos/')

	result = f.push({'ya':'uuu'})

	print 'Result',result

	data_dict = ValuesQuerySetToDict('url')
	
	data = json.dumps(data_dict)

	return HttpResponse(data, content_type="application/json")


def ValuesQuerySetToDict(vqs):
    return [item for item in vqs]
