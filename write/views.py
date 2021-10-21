from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from .models import *

def home(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        User.objects.create_user(
            username = username,
            password = password
        )
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('notes')
    context = {}
    return render(request, 'home.html', context)

@login_required(login_url='home')
def notes(request):
    shortnotes = Shortnote.objects.filter(user=request.user).order_by('-creation', '-pin')
    if request.method == 'POST':
        text = request.POST.get('text')
        status = request.POST.get('status')
        pin = request.POST.get('pin')
        Shortnote.objects.create(
            text   = text,
            status = status,
            pin    = pin,
            user   = request.user
        )
    context = {
        'shortnotes': shortnotes
    }
    return render(request, 'notes.html', context)