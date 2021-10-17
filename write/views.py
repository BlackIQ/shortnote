from django.shortcuts import render
from .models import *

def notes(request):
    shortnotes = Shortnote.objects.all()
    if request.method == 'POST':
        text = request.POST.get('write-input')
        Shortnote.objects.create(
            text = text,
            status = 'important'
        )
    context = {
        'shortnotes': shortnotes
    }
    return render(request, 'notes.html', context)