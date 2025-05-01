from django.shortcuts import render, redirect
from .models import task
from .forms import TaskForm
from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse


# Create your views here.
def index(request):
    task_form = TaskForm()
    tasks = task.objects.all()
    return render(request, "todo/index.html",{
        'range': range(10),
        'form': task_form,
        'tasks': tasks,
    })

def add(request):
    if request.method == 'POST':
        form  = TaskForm(request.POST)
        if form.is_valid():
            new_task = form.save()
            if(new_task):
                print(f"form saved successfully")
            print(f"printing new_task: {new_task}")
            return JsonResponse({
                'success': True,
                'task': {
                    'id': new_task.id,
                    'title': new_task.title,
                    'discription': new_task.discription,
                    'date': new_task.date.strftime('%b %d, %Y, %I:%M %p')
                }
            })
        else:
            # Return form errors as JSON
            print("RESPONSE FAILED!!!!\n")
            return JsonResponse({'success': False, 'errors': form.errors}, status=400)
    
    return JsonResponse({'success': False, 'errors': 'Invalid request'}, status=400)

def delete(request):
    if request.method == 'GET':
        key = request.GET.get('id')
        tasks = task.objects.get(id = key)
        tasks.delete()

        return HttpResponseRedirect(reverse('todo:index'))