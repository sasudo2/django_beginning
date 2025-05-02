from django.shortcuts import render
from .models import blog
from django.http import JsonResponse

# Create your views here.
def index(request):
    blogs = blog.objects.all()
    print(blogs)
    return render(request, "blogger/index.html", {
        "blogs": blogs,
    })

def read(request, id):
    blogs = blog.objects.all()
    selected_blog = blogs.get(id = id)
    if request.method == 'GET':
        return JsonResponse({
            'title': selected_blog.title,
            'image': selected_blog.image.url,
            'author': selected_blog.author,
            'date': selected_blog.date,
            'content': selected_blog.content,
        })
    
    else:
        return render(request, "blogger/index.html", {
            "blogs": blogs,
        })
    

def delete(request, id):
    blogs = blog.objects.all()
    selected_blog = blogs.get(id = id)
    if request.method == 'DELETE':
        if(selected_blog.delete()):
            return JsonResponse({
            'success': True,
            })
        else:
            return JsonResponse({
            'success': False,
            })
    else:
        return render(request, "blogger/index.html", {
            "blogs": blogs,
        })
        