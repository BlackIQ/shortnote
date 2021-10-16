from django.shortcuts import render

def notes(request):
    context = {

    }
    return render(request, 'notes.html', context)