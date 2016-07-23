from django.shortcuts import render
from django.http import HttpResponse
from testsql.models import User
from django.http import HttpResponseRedirect
import staticvariable


# Create your views here.
def home(request):
	if (staticvariable.isLogged == False):
		return render(request,'index.html',{'name':"尚未登录"})
	else:
		return render(request,'index.html',{'name':staticvariable.now_username})

def loginbutton(request):
	if (staticvariable.isLogged == False):
		return render(request,'login.html')
	else:
		return HttpResponse("已经登录")

def logoutbutton(request):
	staticvariable.now_username = ""
	staticvariable.isLogged = False
	return HttpResponseRedirect('/')
	#return render(request,'index.html',{'name':"尚未登录"})

def modifybutton(request):
	if (staticvariable.isLogged == True):
		user = User.objects.get(username=staticvariable.now_username)
		dic = {'email':str(user.email),'address':str(user.address),'nickname':str(user.nickname)}
		return render(request,'modify.html',{'dic':dic})
	else:
		return HttpResponse("尚未登录")

def login(request):
	username = request.GET['username']
	password = request.GET['password']
	f = open('test_name.txt','w')
	f.write(username)
	f.write(password)
	#usr = User.objects.get(username=name,password=password)	
	#f.write(usr.username)
	user = User.objects.filter(username=username,password=password)
	if (len(user) > 0):
		f.write("login succeed")
		staticvariable.now_username = str(username)
		staticvariable.isLogged = True
		return HttpResponseRedirect('/')
	else:
		#f.write("login failed")
		#return render(request,'index.html',{'name':"尚未登录"})
		return HttpResponse("Wrong!")
	f.close()

def register(request):
	f = open('test_name.txt','w')
	usernamesignup = request.GET['usernamesignup']
	emailsignup = request.GET['emailsignup']
	passwordsignup = request.GET['passwordsignup']
	passwordsignup_confirm = request.GET['passwordsignup_confirm']
	if (passwordsignup == passwordsignup_confirm):
		user = User.objects.filter(username=usernamesignup)
		if (len(user) > 0):
			return HttpResponse("This name is existed")
		else:
			newuser = User(userid=1,username=usernamesignup,password=passwordsignup,nickname="nickname",email=emailsignup,credit=0,gender=1,identity=1,address="")
			newuser.save()
			f.write("Register succeed")
			#return HttpResponse("Register succeed")
	else:
		return HttpResponse("Password is not same")
	f.close()
	return HttpResponseRedirect('/')

def modify(request):
	nicknamesignup = request.GET['nicknamesignup']
	emailsignup = request.GET['emailsignup']
	addresssignup = request.GET['addresssignup']
	passwordsignup = request.GET['passwordsignup']
	passwordsignup_confirm = request.GET['passwordsignup_confirm']
	gender = request.GET['sexchoose']
	user = User.objects.get(username=staticvariable.now_username)
	user.nickname = nicknamesignup
	user.email = emailsignup
	user.password = passwordsignup
	user.address = addresssignup
	user.save()
	if (gender=="male"):
		user.gender = 1
	else:
		user.gender = 2
	return HttpResponseRedirect('/')

def cart(request):
	return render(request,'cart.html')

def orderlist(request):
	return render(request,'orderlist.html')

def favorite(request):
	return render(request,'favorite.html')
