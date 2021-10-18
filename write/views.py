from django.shortcuts import render
from .models import *

def notes(request):
    shortnotes = Shortnote.objects.all().order_by('-creation')
    if request.method == 'POST':
        text = request.POST.get('text')
        status = request.POST.get('status')
        Shortnote.objects.create(
            text = text,
            status = status
        )
        if  request.POST.get('text'):
            Shortnote.objects.delete()
    context = {
        'shortnotes': shortnotes
    }
    return render(request, 'notes.html', context)